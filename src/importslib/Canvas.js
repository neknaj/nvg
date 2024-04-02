function init() {
    return true;
}

const val = {
    Image: (_,args)=>{ // image,href,x,y,scale
        const [image,x,y,scale] = args;
        const canvas = document.createElement("canvas");
        const canvasctx = canvas.getContext("2d");
        canvas.width = Project.scope.size.width;
        canvas.height = Project.scope.size.height;
        canvasctx.scale(scale.x,scale.y);
        canvasctx.drawImage(image,x,y,image.width*scale.x,image.height*scale.y);
        return canvas;
    },
    Video: (_,args)=>{ // video,href,x,y,scale,frame
        const [video,x,y,scale,frame] = args;
        const canvas = document.createElement("canvas");
        const canvasctx = canvas.getContext("2d");
        video.currentTime = args[4];
        canvas.width = Project.scope.size.width;
        canvas.height = Project.scope.size.height;
        canvasctx.scale(args[3].x,args[3].y);
        canvasctx.drawImage(video,args[1],args[2],video.videoWidth*args[3].x,video.videoHeight*args[3].y);
        return canvas;
    },
}

function getVideoFrame(name,frame) {
    const canvas = document.createElement("canvas");
    const canvasctx = canvas.getContext("2d");
    const video = NVGStrage[name];
    console.log(name,frame)
    if (video==null) {console.warn("load the video in init")}
    video.currentTime = frame;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvasctx.drawImage(video,0,0);
    return canvas.toDataURL("image/png");
}


export {init as init,val as val};