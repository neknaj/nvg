function init() {
    return true;
}

const val = {
    Number: (_,args)=>{return Number(...args)},
    String: (_,args)=>{return String(...args)},
    Array: (_,args)=>{return Array(...args)},
    ArrayFrom: (_,args)=>{return Array.from(...args)},
    ObjectKeys: (_,args)=>{return Object.keys(...args)},
}


export {init as init,val as val};