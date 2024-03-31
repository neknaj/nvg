function init() {
    return true;
}

const val = {
    E: Math.E,
    sin: (_,args)=>{return Math.sin(...args)},
    cos: (_,args)=>{return Math.cos(...args)},
}


export {init as init,val as val};