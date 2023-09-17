const { app, Menu, BrowserWindow , ipcMain, dialog} = require('electron');
const path = require('path');
const fs = require("fs")



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


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    // Create the browser window.

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, './src/index.html'));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    mainWindow.setMenuBarVisibility(false);


    ipcMain.handle('file-open', async (event) => {
        // ファイルを選択
        const paths = dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '開く',  // 確認ボタンのラベル
            filters: [
                { name: 'Neknaj Video Project File', extensions: ['nvpf'] },
            ],
            properties:[
                'openFile',         // ファイルの選択を許可
                'createDirectory',  // ディレクトリの作成を許可 (macOS)
            ]
        }
    );

    // キャンセルで閉じた場合
    if( paths === undefined ){
        return({status: undefined});
    }

    // ファイルの内容を返却
    try {
        const path = paths[0];
        const buff = fs.readFileSync(path);

        return({
            status: true,
            path: path,
            text: buff.toString()
        });
    }
    catch(error) {
        return({status:false, message:error.message});
    }
});

};