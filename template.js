


    const listElement = document.querySelector("#list");
    const languageSelect  = document.querySelector("#language-tags")
    const templateWorker = new Worker("./templateWorker.js")
    
    const config = new Proxy({
        listItems: JSON.parse(sessionStorage.getItem("listItems")) || [],
        languageTag: localStorage.getItem("lang") || "pt-BR", 
    },{
        set: function(target, property, value, receiver){
            if(property === "listItems" || property === "languageTag"){
                Reflect.set(...arguments);
                render();
                return true;
            }
            return false;
        }
    })


    languageSelect.value = config.languageTag;
    languageSelect.addEventListener("change", changelanguage=>{
        const lang = languageSelect.value;
        localStorage.setItem("lang", lang);
        config.languageTag = lang;
    })
    
    function setList(list){
        sessionStorage.setItem("listItems", JSON.stringify(list));
        config.listItems = list;
    }

    function render(){
        const configParams = JSON.parse(JSON.stringify(config));
        templateWorker.postMessage(configParams);
        templateWorker.onmessage = function({data}){
            listElement.innerHTML = data;
        }
    }

    (function start(){
        render();
    }())

    export{setList};