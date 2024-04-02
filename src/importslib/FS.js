function init() {
    return true;
}


const val = {
    Load: async(_,args)=>{
        switch (args[1]) {
            case "image":
                return await (new Promise((resolve,reject) => {
                    const image = document.createElement("img");
                    image.onload = () => {
                        resolve(image);
                    }
                    image.onerror = (e)=>{reject(e);}
                    image.src = `${ProjectInfo.dir}/resource/${args[0]}`;
                }));
            break;
            case "video":
                return await (new Promise((resolve,reject) => {
                    const video = document.createElement("video");
                    video.onloadeddata = () => {
                        resolve(video);
                    }
                    video.onerror = (e)=>{reject(e);}
                    video.src = `${ProjectInfo.dir}/resource/${args[0]}`;
                }));
            break;
            default:
                console.warn("please set the type of file")
            break;
        }
        return;
    },
    getValue: (_,args)=>{
        console.warn(NVGStrage[args[0]])
        return NVGStrage[args[0]];
    },
}

export {init as init,val as val};