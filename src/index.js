window.electron.on("projectFilePathChanged", async (arg)=>{
    ProjecInfo.path = arg.path
    console.log(arg,"Selected!",new Date())
    let data = await window.electron.readFile(ProjecInfo.path);
    updateEditorData(data);
});
window.electron.on("projectFileUpdate", async (arg)=>{
    console.log(arg,"Changed!",new Date())
    let data = await window.electron.readFile(ProjecInfo.path);
    updateEditorData(data);
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