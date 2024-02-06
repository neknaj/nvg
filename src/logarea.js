{
    let consoleinfo = console.info;
    let log_info = (obj,elm,defaultopen=false)=>{
        let pelm = document.createElement("p");
        pelm.classList.add("jsonviewer");
        pelm.classList.add("info");
        pelm.appendChild(json_child(obj,defaultopen));
        elm.appendChild(pelm);
    }
    console.info = (...x)=>{
        consoleinfo(...x);
        for (let i of x) {
            log_info(i,document.getElementById("logarea"),false);
        }
    }
    let consoleerror = console.error;
    let log_error = (obj,elm,defaultopen=false)=>{
        let pelm = document.createElement("p");
        pelm.classList.add("jsonviewer");
        pelm.classList.add("error");
        pelm.appendChild(json_child(obj,defaultopen));
        elm.appendChild(pelm);
    }
    console.error = (...x)=>{
        consoleerror(...x);
        for (let i of x) {
            log_error(i,document.getElementById("logarea"),false);
        }
    }
    let consolewarn = console.warn;
    let log_warn = (obj,elm,defaultopen=false)=>{
        let pelm = document.createElement("p");
        pelm.classList.add("jsonviewer");
        pelm.classList.add("warn");
        pelm.appendChild(json_child(obj,defaultopen));
        elm.appendChild(pelm);
    }
    console.warn = (...x)=>{
        consolewarn(...x);
        for (let i of x) {
            log_warn(i,document.getElementById("logarea"),false);
        }
    }
    let consolelog = console.log;
    let log_log = (obj,elm,defaultopen=false)=>{
        let pelm = document.createElement("p");
        pelm.classList.add("jsonviewer");
        pelm.classList.add("log");
        pelm.appendChild(json_child(obj,defaultopen));
        elm.appendChild(pelm);
    }
    console.log = (...x)=>{
        consolelog(...x);
        for (let i of x) {
            log_log(i,document.getElementById("logarea"),false);
        }
    }
}