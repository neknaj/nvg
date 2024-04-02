function init() {
    return true;
}


const val = {
    mono2stereo: (_,args)=>{
        const [inputbuffer,bias] = args;
        const l = bias?.[0]??1
        const r = bias?.[1]??1
        const length = inputbuffer.length;
        const outputbuffer = new AudioBuffer({
            numberOfChannels: 2,
            length: length,
            sampleRate: audioCtx.sampleRate,
        });
        const output1 = outputbuffer.getChannelData(0);
        const output2 = outputbuffer.getChannelData(1);
        const input = inputbuffer.getChannelData(0);
        for (let i = 0; i < length; i++) {
            output1[i] += input[i]*r;
            output2[i] += input[i]*l;
        }
        return outputbuffer;
    },
    volume: (_,args)=>{
        const [inputbuffer,volume] = args;
        const length = inputbuffer.length;
        const outputbuffer = new AudioBuffer({
            numberOfChannels: inputbuffer.numberOfChannels,
            length: length,
            sampleRate: audioCtx.sampleRate,
        });
        for (let c=0;c<inputbuffer.numberOfChannels;c++) {
            const output = outputbuffer.getChannelData(c);
            const input = inputbuffer.getChannelData(c);
            for (let i = 0; i < length; i++) {
                output[i] += input[i]*volume;
            }
        }
        return outputbuffer;
    },
    biasedVolume: (_,args)=>{
        const [inputbuffer,bias] = args;
        const length = inputbuffer.length;
        const outputbuffer = new AudioBuffer({
            numberOfChannels: inputbuffer.numberOfChannels,
            length: length,
            sampleRate: audioCtx.sampleRate,
        });
        for (let c=0;c<inputbuffer.numberOfChannels;c++) {
            const output = outputbuffer.getChannelData(c);
            const input = inputbuffer.getChannelData(c);
            const volume = bias[c]??1;
            for (let i = 0; i < length; i++) {
                output[i] += input[i]*volume;
            }
        }
        return outputbuffer;
    },
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