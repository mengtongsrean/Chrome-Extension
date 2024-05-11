// variables declaration
let mySaves = [];
let inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
let ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
// get data from localStorage and render it out
const localStorageLeads = JSON.parse(localStorage.getItem("mySaves"));

if (localStorageLeads) {
    mySaves = localStorageLeads;
    render(mySaves);
}

// function to render the list of items
function render(saves) {
    // given ListItem to empty string for storing li tag of item
    let listItem = "";
    for (let i = 0; i < saves.length; i++) {
        listItem += `
            <li>
                <a href='${saves[i]}' target='_blank'>
                    ${saves[i]}
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
        // then push inputEl value to mySaves array
        mySaves.push(inputEl.value);
        localStorage.setItem("mySaves", JSON.stringify(mySaves));
    }
    render(mySaves);
    // set input field to empty string
    inputEl.value = "";
});

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    mySaves = [];
    render(mySaves);
});

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        mySaves.push(tabs[0].url)
        localStorage.setItem("mySaves", JSON.stringify(mySaves))
        render(mySaves)
    })
})
