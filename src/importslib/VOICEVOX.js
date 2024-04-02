function init() {
    return true;
}


const val = {
    Get: async(_,args)=>{
        const [text,sequence,speakerId] = args;
        const url1 = `http://127.0.0.1:50021/audio_query?speaker=${speakerId}&text=${text}`;
        const json = await (await fetch(url1, { method: "POST",})).json();
        console.log(json)
        const url2 = `http://127.0.0.1:50021/synthesis?speaker=${speakerId}`;
        const res = await fetch(url2, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(json),
        })
        const arr = await res.arrayBuffer();
        const buf = await audioCtx.decodeAudioData(arr);
        console.log(buf)
        console.log(buf.getChannelData(0))
        return buf;
    },
}

export {init as init,val as val};