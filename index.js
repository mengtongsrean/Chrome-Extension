// variables declaration
let myLeads = [];
let inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
let ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
// get data from localStorage and render it out
const localStorageLeads = JSON.parse(localStorage.getItem("myLeads"));

if (localStorageLeads) {
    myLeads = localStorageLeads;
    render(myLeads);
}

// function to render the list of items
function render(leads) {
    // given ListItem to empty string for storing li tag of item
    let listItem = "";
    for (let i = 0; i < leads.length; i++) {
        listItem += `
            <li>
                <a href='${leads[i]}' target='_blank'>
                    ${leads[i]}
                </a>
            </li>
        `;
        console.log(listItem);
    }
    ulEl.innerHTML = listItem;
}

inputBtn.addEventListener("click", function () {
    // check if input field is not empty
    if (inputEl.value !== "") {
        // then push inputEl value to myLeads array
        myLeads.push(inputEl.value);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
    }
    render(myLeads);
    // set input field to empty string
    inputEl.value = "";
});

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})
