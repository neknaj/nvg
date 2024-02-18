const evalBW = (program)=>{window.electron.evalBW(program,null)}
window.electron.on("projectFilePathChanged", async (path,name)=>{
    ProjectInfo.path = path;
    ProjectInfo.name = name;
    console.log(path,name,"Selected!",new Date());
    let data = await window.electron.readFile(ProjectInfo.path);
    updateEditorData(data);
    window.electron.getFolder(".");
});
window.electron.on("projectFileUpdate", async (arg)=>{
    console.log(arg,"Changed!",new Date());
    let data = await window.electron.readFile(ProjectInfo.path);
    updateEditorData(data);
    window.electron.getFolder(".");
});
window.electron.on("resultBW", async (object)=>{
    console.log("result",object);
});

window.electron.on("FolderData", async (_path,result)=>{
    console.log(_path,result);
    switch (_path) {
        case ".":
            ExportsExplorer(result);
        break;
    }
});

window.electron.on("videoComposed", async (filename)=>{
    console.log("video Composed",filename)
    window.electron.getFolder(".");
    if (document.querySelector("#autoopenself").checked) {
        window.electron.openPathSelf(filename);
    }
    if (document.querySelector("#autoopendefault").checked) {
        window.electron.openPathDefault(filename);
    }
});