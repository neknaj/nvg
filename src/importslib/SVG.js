function init() {
    return true;
}


const val = {
    Text: (_,args)=>{ // text,x,y,size,h_anchor,v_anchor
        const elm = document.createElementNS('http://www.w3.org/2000/svg','text');
        elm.appendChild(document.createTextNode((args[0]??"").toString()));
        elm.setAttribute("x",args[1]??0);
        elm.setAttribute("y",args[2]??0);
        elm.setAttribute("font-size",args[3]??100);
        elm.setAttribute("text-anchor",args[4]??"start");
        elm.setAttribute("dominant-baseline",args[5]??"text-top");
        return elm;
    },
    LFText: (_,args)=>{ // text,x,y,size,h_anchor,v_anchor,line_space
        const gelm = document.createElementNS('http://www.w3.org/2000/svg','g');
        for (let t in (args[0]??"").toString().split("\n")) {
            const elm = document.createElementNS('http://www.w3.org/2000/svg','text');
            elm.appendChild(document.createTextNode((args[0]??"").toString().split("\n")[t]));
            elm.setAttribute("x",args[1]??0);
            elm.setAttribute("y",(args[2]??0)+t*((args[3]??100)+(args[6]??((args[3]??100)*0.5))));
            elm.setAttribute("font-size",args[3]??100);
            elm.setAttribute("text-anchor",args[4]??"start");
            elm.setAttribute("dominant-baseline",args[5]??"text-top");
            gelm.appendChild(elm);
        }
        return gelm;
    },
    AddText: (_,args)=>{ // elm,text
        const elm = args[0];
        elm.appendChild(document.createTextNode(args[1]));
        return elm;
    },
    TSpan: (_,args)=>{ // text
        const elm = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        elm.appendChild(document.createTextNode(args[0]));
        return elm;
    },
    Image: async(_,args)=>{ // image,x,y,scale
        const elm = document.createElementNS('http://www.w3.org/2000/svg','image');
        elm.setAttribute("href",await getImageFrame(args[0]));
        elm.setAttribute("x",args[1]??0);
        elm.setAttribute("y",args[2]??0);
        elm.setAttribute("width",args[0].width*(args[3].x??1));
        elm.setAttribute("height",args[0].height*(args[3].y??1));
        return elm;
    },
    Video: async(_,args)=>{ // video,x,y,scale,frame
        const elm = document.createElementNS('http://www.w3.org/2000/svg','image');
        elm.setAttribute("href",await getVideoFrame(args[0],args[4]));
        elm.setAttribute("x",args[1]??0);
        elm.setAttribute("y",args[2]??0);
        elm.setAttribute("width",args[0].videoWidth*(args[3].x??1));
        elm.setAttribute("height",args[0].videoHeight*(args[3].y??1));
        return elm;
    },
    Rect: (_,args)=>{ // x,y,width,height
        const elm = document.createElementNS('http://www.w3.org/2000/svg','rect');
        elm.setAttribute("x",args[0]);
        elm.setAttribute("y",args[1]);
        elm.setAttribute("width",args[2]);
        elm.setAttribute("height",args[3]);
        return elm;
    },
    Group: (_,args)=>{ //
        const elm = document.createElementNS('http://www.w3.org/2000/svg','g');
        return elm;
    },
    Add: (_,args)=>{ // elm,...objs
        const elm = args[0];
        for (let i of args.slice(1)) {
            elm.appendChild(i);
        }
        return elm;
    },
    Fill: (_,args)=>{ // elm,color
        const elm = args[0];
        elm.setAttribute("fill",args[1]);
        return elm;
    },
    Stroke: (_,args)=>{ // elm,color,width
        const elm = args[0];
        elm.setAttribute("stroke",args[1]);
        elm.setAttribute("stroke-width",args[2]);
        return elm;
    },
    Font: (_,args)=>{ // elm,font-family
        const elm = args[0];
        elm.setAttribute("font-family",args.slice(1).join(","));
        return elm;
    },
    addAttr: (_,args)=>{ // elm,name,val
        const elm = args[0];
        elm.setAttribute(args[1],args[2]);
        return elm;
    },
    Elm: (_,args)=>{ // type
        const elm = document.createElementNS('http://www.w3.org/2000/svg',args[0]);
        return elm;
    },
}

async function getImageFrame(image) {
    const canvas = document.createElement("canvas");
    const canvasctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    canvasctx.drawImage(image,0,0);
    return canvas.toDataURL("image/png");
}
function getVideoFrame(video,frame) {
    const canvas = document.createElement("canvas");
    const canvasctx = canvas.getContext("2d");
    video.currentTime = frame;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvasctx.drawImage(video,0,0);
    return canvas.toDataURL("image/png");
}


export {init as init,val as val};