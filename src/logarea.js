{
    let log = (obj,elm,type="log",defaultopen=false)=>{
        let pelm = document.createElement("p");
        pelm.classList.add("jsonviewer");
        pelm.classList.add(type);
        pelm.appendChild(json_child(obj,defaultopen));
        elm.appendChild(pelm);
    }
    debug = {};
    debug.print = (...x)=>{
        if (x.length=1) {
            console.log(x[0]);
            log(JSON.stringify(x[0],null,2),document.getElementById("logarea"),"log",false);
        }
        else if (x.length>1) {
            console.log(...x);
            log(JSON.stringify(x,null,2),document.getElementById("logarea"),"log",false);
        }
    }
    debug.info = (...x)=>{
        if (x.length=1) {
            console.info(x[0]);
            log(JSON.stringify(x[0],null,2),document.getElementById("logarea"),"info",false);
        }
        else if (x.length>1) {
            console.info(...x);
            log(JSON.stringify(x,null,2),document.getElementById("logarea"),"info",false);
        }
    }
    debug.warn = (...x)=>{
        console.log(x)
        if (x.length=1) {
            console.warn(x[0]);
            log(JSON.stringify(x[0],null,2),document.getElementById("logarea"),"warn",true);
        }
        else if (x.length>1) {
            console.warn(...x);
            log(JSON.stringify(x,null,2),document.getElementById("logarea"),"warn",true);
        }
    }
    debug.error = (...x)=>{
        if (x.length=1) {
            console.error(x[0]);
            log(JSON.stringify(x[0],null,2),document.getElementById("logarea"),"error",true);
        }
        else if (x.length>1) {
            console.error(...x);
            log(JSON.stringify(x,null,2),document.getElementById("logarea"),"error",true);
        }
    }
}