function init() {
    return true;
}

const val = {
    print: (_,args)=>{console.log(...args);return args[0];},
}


export {init as init,val as val};