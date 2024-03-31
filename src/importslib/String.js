function init() {
    return true;
}

const val = {
    charAt: (_,args)=>{return args[0].charAt(...args.slice(1))},
    charCodeAt: (_,args)=>{return args[0].charCodeAt(...args.slice(1))},
    codePointAt: (_,args)=>{return args[0].codePointAt(...args.slice(1))},
    concat: (_,args)=>{return args[0].concat(...args.slice(1))},
    endsWith: (_,args)=>{return args[0].endsWith(...args.slice(1))},
    fromCharCode: (_,args)=>{return String.fromCharCode(...args)},
    fromCodePoint: (_,args)=>{return String.fromCodePoint(...args)},
    includes: (_,args)=>{return args[0].includes(...args.slice(1))},
    indexOf: (_,args)=>{return args[0].indexOf(...args.slice(1))},
    isWellFormed: (_,args)=>{return args[0].isWellFormed(...args.slice(1))},
    lastIndexOf: (_,args)=>{return args[0].lastIndexOf(...args.slice(1))},
    locateCompare: (_,args)=>{return args[0].locateCompare(...args.slice(1))},
    match: (_,args)=>{return args[0].match(...args.slice(1))},
    matchAll: (_,args)=>{return args[0].matchAll(...args.slice(1))},
    normalize: (_,args)=>{return args[0].normalize(...args.slice(1))},
    padEnd: (_,args)=>{return args[0].padEnd(...args.slice(1))},
    padStart: (_,args)=>{return args[0].padStart(...args.slice(1))},
    repeat: (_,args)=>{return args[0].repeat(...args.slice(1))},
    replace: (_,args)=>{return args[0].replace(...args.slice(1))},
    replaceAll: (_,args)=>{return args[0].replaceAll(...args.slice(1))},
    search: (_,args)=>{return args[0].search(...args.slice(1))},
    slice: (_,args)=>{return args[0].slice(...args.slice(1))},
    split: (_,args)=>{return args[0].split(...args.slice(1))},
    startsWith: (_,args)=>{return args[0].startsWith(...args.slice(1))},
    substring: (_,args)=>{return args[0].substring(...args.slice(1))},
    toLocaleLowerCase: (_,args)=>{return args[0].toLocaleLowerCase(...args.slice(1))},
    toLocaleUpperCase: (_,args)=>{return args[0].toLocaleUpperCase(...args.slice(1))},
    toLowerCase: (_,args)=>{return args[0].toLowerCase()},
    toString: (_,args)=>{return args[0].toString()},
    toUpperCase: (_,args)=>{return args[0].toUpperCase()},
    toWellFormed: (_,args)=>{return args[0].toWellFormed()},
    trim: (_,args)=>{return args[0].trim()},
    trimEnd: (_,args)=>{return args[0].trimEnd()},
    trimStart: (_,args)=>{return args[0].trimStart()},
    valueOf: (_,args)=>{return args[0].valueOf()},
}


export {init as init,val as val};