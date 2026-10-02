

let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}


function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `;
  }
  
  ulEl.innerHTML = listItems;
}


inputBtn.addEventListener("click", function () {
  const val = inputEl.value.trim(); 
  if (val) {
    myLeads.push(val);
    inputEl.value = "";
    
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});


tabBtn.addEventListener("click", function () {
  
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs[0]) {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    }
  });
});


deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});