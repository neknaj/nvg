function init() {
    return true;
}

const val = {
    print: (_,args)=>{return console.log(...args)},
}


export {init as init,val as val};