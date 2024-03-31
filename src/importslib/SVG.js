function init() {
    return true;
}

const val = {
    Text: (_,args)=>{ // text,x,y,size,color
        const elm = document.createElementNS('http://www.w3.org/2000/svg','text');
        elm.appendChild(document.createTextNode(args[0]))
        elm.setAttribute("x",args[1]);
        elm.setAttribute("y",args[2]);
        elm.setAttribute("font-size",args[3]);
        elm.setAttribute("fill",args[4]);
        return elm;
    },
}


export {init as init,val as val};