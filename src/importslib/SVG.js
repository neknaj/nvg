function init() {
    return true;
}

const val = {
    Text: (_,args)=>{ // text,x,y,size
        const elm = document.createElementNS('http://www.w3.org/2000/svg','text');
        elm.appendChild(document.createTextNode(args[0]))
        elm.setAttribute("x",args[1]);
        elm.setAttribute("y",args[2]);
        elm.setAttribute("font-size",args[3]);
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
        elm.setAttribute("fill",args[1]);
        elm.setAttribute("stroke-width",args[2]);
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


export {init as init,val as val};