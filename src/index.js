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

function updateEditorData(data) {
    editor.setValue(data);
    SetWindowTitle();
    let sel = editor.getSelection();
    let range = sel.getRange();
    range.setStart(0,0);
    range.setEnd(0,0);
    sel.setSelectionRange(range);
}