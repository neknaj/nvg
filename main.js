if (process.env.NODE_ENV=="debug") {console.log("Start in debug mode")};

const { app, Menu, BrowserWindow , ipcMain, dialog, shell, MessageChannelMain} = require('electron');
const path = require('path');
const fs = require("fs");
const url = require("url");
const {exec} = require("child_process");

function sleep(time) {new Promise(resolve=>setTimeout(resolve,time))}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


let beforedata = null;
let filewatcher = {close:()=>{}};
let BWidcounter = 0;
let fileName = null;
let folderPath = null;


function paddingStr(num,len) {
    return (Array(len).join("0")+num).slice(-len);
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        show: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        titleBarOverlay: {
            color: "#2b373d",
            symbolColor: "#7996b4",
            height: 27,
        },
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload_index.js'),
            devTools: app.isPackaged?false:true,
        },
        icon: path.join(__dirname, './src/nvg.ico'),
    });
    // Create the browser window.
    
    
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        return { action: 'allow', overrideBrowserWindowOptions: {
            autoHideMenuBar: true,
        } };
    });


    mainWindow.loadURL(url.format({slashes: true,protocol: "file:",pathname:path.join(__dirname,"./src/index.html"),query:{}}));
    mainWindow.setMenuBarVisibility(false);

    if (process.env.NODE_ENV=="debug") {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.once("ready-to-show",()=>{
        mainWindow.show();
    })
    mainWindow.on("closed",()=>{
        app.quit();
    })

    
    ipcMain.handle('readFile',async (event,path)=>{
        const buff = fs.readFileSync(path,"utf8");
        beforedata = buff;
        return buff
    });

    ipcMain.handle('openFile',async (event)=>{
        // ファイルを選択
        const paths = dialog.showOpenDialogSync(mainWindow, {
                filters: [
                    { name: 'Neknaj Video Project File', extensions: ['nvpf'] },
                ],
                properties:[
                    'openFile',         // ファイルの選択を許可
                    'createDirectory',  // ディレクトリの作成を許可 (macOS)
                ]
            });
    
        // キャンセルで閉じた場合
        if( paths === undefined ){
            return({status: undefined});
        }
        beforedata = null;
        // ファイルの内容を返却
        try {
            const _path = paths[0].replace(/\\/g,"/");
            mainWindow.webContents.send("projectFilePathChanged",{path:_path});
            fileName = path.parse(_path).name;
            folderPath = path.join(path.dirname(_path),fileName);
            fs.mkdir(path.join(folderPath,"frames"),{recursive:true},(err)=>{if(err){console.warn(err)}});
            fs.mkdir(path.join(folderPath,"resource"),{recursive:true},(err)=>{if(err){console.warn(err)}});
            filewatcher.close();
            filewatcher = fs.watch(path,(ev,fn)=>{
                console.log("fs",ev, _path);
                const buff = fs.readFileSync(_path,"utf8");
                if (buff!=beforedata) {
                    mainWindow.webContents.send("projectFileUpdate",{path:_path})
                }
            });
        }
        catch(error) {
            return({status:false, message:error.message});
        }
    });

    ipcMain.handle('saveAs',async (event,data)=>{
        // ファイルを選択
        const paths = dialog.showSaveDialogSync(mainWindow, {
                filters: [
                    { name: 'Neknaj Video Project File', extensions: ['nvpf'] },
                ],
                properties:[
                    'createDirectory',  // ディレクトリの作成を許可 (macOS)
                ]
            });
    
        // キャンセルで閉じた場合
        if( paths === undefined ){
            return({status: undefined});
        }
        beforedata = null;
        try {
            const _path = paths.replace(/\\/g,"/");
            fs.writeFile(path_,data,(err)=>{console.log("done",err)});
            fileName = path.parse(_path).name;
            folderPath = path.join(path.dirname(_path),fileName);
            fs.mkdir(path.join(folderPath,"frames"),{recursive:true},(err)=>{if(err){console.warn(err)}});
            fs.mkdir(path.join(folderPath,"resource"),{recursive:true},(err)=>{if(err){console.warn(err)}});
            mainWindow.webContents.send("projectFilePathChanged",{path:_path});
        }
        catch(error) {
            return({status:false, message:error.message});
        }
    });
    ipcMain.handle('saveFile',async (event,path,data)=>{
        beforedata = data;
        fs.writeFileSync(path,data);
    });
    ipcMain.handle('exportFrame',async (event,frame,data)=>{
        if (folderPath==null) {console.warn("folder not selected");return;}
        //console.log(frame,data)
        fs.writeFileSync(path.join(folderPath,"./frames/",paddingStr(frame,6)+".png"),data);
    });
    ipcMain.on('evalBW',async (event,program,env)=>{
        BWidcounter++;
        const backgroundWindow = new BrowserWindow({
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, 'preload_background.js'),
                devTools: app.isPackaged?false:true,
            },
            icon: path.join(__dirname, './src/nvg.png'),
        });
        backgroundWindow.loadURL(url.format({slashes: true,protocol: "file:",pathname:path.join(__dirname,"./src/background.html"),query:{bwid:BWidcounter}}));
        backgroundWindow.setMenuBarVisibility(false);
        if (process.env.NODE_ENV=="debug") {
            backgroundWindow.webContents.openDevTools();
        }
        ipcMain.handleOnce("winloadBW"+BWidcounter,()=>{
            backgroundWindow.webContents.send("evalBW",program,env);
        })
        ipcMain.once("resultBW"+BWidcounter,async (event,object)=>{
            mainWindow.webContents.send("resultBW",object);
            backgroundWindow.close();
        })
        return;
    });
    ipcMain.on('composeVideo',async (event)=>{
        if (folderPath==null) {console.warn("folder not selected");return;}
        exec(`ffmpeg -framerate 30 -i ./frames/%06d.png -r 30 ${fileName}.mp4 -y`,{cwd: path.join(folderPath)}, (err, stdout, stderr) => {
            const viewWindow = new BrowserWindow({
                show: true,
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                    devTools: false,
                },
                autoHideMenuBar: true,
            });
            viewWindow.loadURL(url.format({slashes: true,protocol: "file:",pathname:path.join(folderPath,fileName+".mp4")}));
        })
    });

};