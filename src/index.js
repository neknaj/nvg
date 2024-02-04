window.electron.on("projectFilePathChanged", (arg)=>{
    ProjecInfo.path = arg.path
    console.log(arg,"Selected!",new Date())
    SetWindowTitle();
});
window.electron.on("projectFileUpdate", (arg)=>{
    console.log(arg,"Changed!",new Date())
});