let myLeads=[]
const ulEl=document.getElementById("ul-el");
const inputEl=document.getElementById("input-el");
const inputBtn= document.getElementById("input-btn");
const  delEl=document.getElementById("del-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn=document.getElementById("tab-btn");
 
if(leadsFromLocalStorage){
     myLeads=leadsFromLocalStorage;
          render(myLeads);// refactor: we can pass an arg myleads when we have multiple lead arrays
}

tabBtn.addEventListener("click",function(){ 
    chrome.tabs.query({active: true , currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    })

})

inputBtn.addEventListener("click",function(){ 
    myLeads.push(inputEl.value);
    inputEl.value="";
//localStorage.getitem("myname")
localStorage.setItem("myLeads", JSON.stringify(myLeads));
   render(myLeads);
})

   function render(leads) {
    let listItems="";
    for(i=0;i<leads.length;i++){
        listItems+= ` 
        <li>
            <a target= '_blank' href='${leads[i]}'>
               ${leads[i]}
            </a>
        </li>        
        `
// template strings 'back tick'
}
ulEl.innerHTML= listItems;//DOM MANIPULATION COSTS SO USE ONCE THAN 3
}
delEl.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);
})

