function init() {
    return true;
}

const val = {
    print: (_,args)=>{debug.print(...args);return args[0];},
    info: (_,args)=>{debug.info(...args);return args[0];},
    warn: (_,args)=>{debug.warn(...args);return args[0];},
    err: (_,args)=>{debug.error(...args);return args[0];},
}


export {init as init,val as val};