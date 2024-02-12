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

window.electron.on("frameCacheSaved", async (frame)=>{
    TLcache[frame] = "fs";
});


window.electron.on("requestedFrameCache", async (frame,data)=>{
    momentCache[frame] = new ImageData(new Uint8ClampedArray(data),1920,1080);
    momentCacheReq = momentCacheReq.filter((x)=>{x!==frame});
});

requestFrameCache = (f)=>{
    let flag = true;
    for (let i=f+momentCacheSize2;i<f+momentCacheSize;i++) {
        if (i>lastObjFrame) {break;}
        if (!momentCacheReq.includes(i)&&(!momentCache.hasOwnProperty(i))) {
            window.electron.requestFrameCache(i);
            momentCacheReq.push(i);
            flag = false;
        }
    }
    if (flag) {
        for (let i=f;i<f+momentCacheSize2;i++) {
            if (i>lastObjFrame) {break;}
            if (!momentCacheReq.includes(i)&&(!momentCache.hasOwnProperty(i))) {
                window.electron.requestFrameCache(i);
                momentCacheReq.push(i);
                flag = false;
            }
        }
    }
    let mck = Object.keys(momentCache);
    for (let i of mck) {
        if (i<f) {
            delete momentCache[i];
        }
    }
}
setFrameCache = (frame,data)=>{
    window.electron.saveFrameCache(frame,data.data);
}

async function getCache(f) {
    const startTime = performance.now();
    let data = await window.electron.readFrameCache(f);
    const endTime = performance.now();
    console.log(endTime-startTime);
    return data;
}