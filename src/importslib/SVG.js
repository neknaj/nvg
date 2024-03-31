function init() {
    return true;
}

const val = {
    Text: (_,args)=>{ // text,x,y,size,h_anchor,v_anchor
        const elm = document.createElementNS('http://www.w3.org/2000/svg','text');
        elm.appendChild(document.createTextNode(args[0]??""));
        elm.setAttribute("x",args[1]??0);
        elm.setAttribute("y",args[2]??0);
        elm.setAttribute("font-size",args[3]??100);
        elm.setAttribute("text-anchor",args[4]??"start");
        elm.setAttribute("dominant-baseline",args[5]??"text-top");
        return elm;
    },
    LFText: (_,args)=>{ // text,x,y,size,h_anchor,v_anchor,line_space
        const gelm = document.createElementNS('http://www.w3.org/2000/svg','g');
        for (let t in args[0].split("\n")) {
            const elm = document.createElementNS('http://www.w3.org/2000/svg','text');
            elm.appendChild(document.createTextNode(args[0].split("\n")[t]));
            elm.setAttribute("x",args[1]??0);
            elm.setAttribute("y",(args[2]??0)+t*((args[3]??100)+(args[6]??((args[3]??100)*0.2))));
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


export {init as init,val as val};