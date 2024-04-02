function init() {
    return true;
}


const val = {
    Get: async(_,args)=>{
        return await getAudioBuffer(args[0]);
    },
}

async function getAudioBuffer(audioElement) {
    return await new Promise((resolve,reject)=>{
        console.log(audioElement)
        console.log(audioElement.duration)
        console.log(2, audioElement.duration * audioCtx.sampleRate, audioCtx.sampleRate)
        const offlineContext = new OfflineAudioContext(2, audioElement.duration * audioCtx.sampleRate, audioCtx.sampleRate);
        const offlineSource = offlineContext.createBufferSource();
        offlineSource.buffer = audioCtx.createMediaElementSource(audioElement).buffer;
        offlineSource.connect(offlineContext.destination);
        offlineSource.start(0);
        offlineContext.startRendering().then(function(renderedBuffer) {
            console.log(renderedBuffer)
            console.log(renderedBuffer.getChannelData(0))
            console.log(renderedBuffer.getChannelData(1))
            resolve(renderedBuffer);
        }).catch(err => reject(err));
    })
}

export {init as init,val as val};