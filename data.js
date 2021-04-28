import * as $ from "./template.js"; 


    /*    const searchInput = document.querySelector("#search")
    
        searchInput.addEventListener("keyup", (event)=>{
            if(event && event.keyCode === 13){
               const searchQuery = searchInput.value;
               fetch(`http://api.github.com/search/repositories?q=${searchQuery}`)
               .then(response => response.json())
               .then(response => response.items)
               .then($.setList);
            }
        })*/
        const searchInput = document.querySelector("#search")
    
        searchInput.addEventListener("keyup", search);
        
        export default async function search (event){
            if(event && event.keyCode === 13){
               const searchQuery = searchInput.value;
               let response = await fetch(`http://api.github.com/search/repositories?q=${searchQuery}`)
               response = await response.json();
               $.setList(response.items);
            }
        }