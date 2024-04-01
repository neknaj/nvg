function init() {
    return true;
}


const val = {
    Load(_,args) {
        switch (args[1]) {
            case "image":
                NVGPromiselist.push(new Promise((resolve,reject) => {
                    const image = document.createElement("img");
                    image.onload = () => {
                        NVGStrage[args[0]] = image;
                        resolve(args[0]);
                    }
                    image.onerror = (e)=>{reject(e);}
                    image.src = `${ProjectInfo.dir}/resource/${args[0]}`;
                }));
            break;
            case "video":
                NVGPromiselist.push(new Promise((resolve,reject) => {
                    const video = document.createElement("video");
                    video.onloadeddata = () => {
                        NVGStrage[args[0]] = video;
                        resolve(args[0]);
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
    getValue(_,args) {
        console.warn(NVGStrage[args[0]])
        return NVGStrage[args[0]];
    },
}

export {init as init,val as val};