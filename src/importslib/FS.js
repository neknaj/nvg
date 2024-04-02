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
            case "video":
                return await (new Promise((resolve,reject) => {
                    const video = document.createElement("video");
                    video.oncanplaythrough = () => {
                        resolve(video);
                    }
                    video.onerror = (e)=>{reject(e);}
                    video.src = `${ProjectInfo.dir}/resource/${args[0]}`;
                }));
            case "audiobuffer":
                {
                    const res = await fetch(`${ProjectInfo.dir}/resource/${args[0]}`);
                    const arr = await res.arrayBuffer();
                    const buf = await audioCtx.decodeAudioData(arr);
                    console.log(buf)
                    console.log(buf.getChannelData(0))
                    return buf;
                }
            case "audio":
                return await (new Promise((resolve,reject) => {
                    const audio = document.createElement("audio");
                    audio.onerror = (e)=>{reject(e);}
                    audio.src = `${ProjectInfo.dir}/resource/${args[0]}`;
                    audio.oncanplaythrough = () => {
                        console.log(audio.duration)
                        resolve(audio);
                    }
                }));
            default:
                console.warn("please set the type of file")
            break;
        }
        return;
    },
}

export {init as init,val as val};