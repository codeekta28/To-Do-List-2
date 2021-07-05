console.log("This is app.js file");
let index = 0;
frontEndData = {
    'user': { 'filter': '#filterNotes', 'checkBox': 'hideCompleted', 'toDoListCount': '#listCoount', 'listInput': '#listNotes', 'submitBtn': '.btn', },
}
let UserInterface = frontEndData.user;
document.querySelector(UserInterface.submitBtn).addEventListener("click", takingUserInput);
function takingUserInput() {
    let userInputValue = document.querySelector(UserInterface.listInput).value;
    storeDataInLocalStorage(userInputValue);
    addingUserNotesOnUserInterface(userInputValue);
    document.querySelector(UserInterface.listInput).value = " ";
}
function displayUserInput() {
    const localStorageData = getDataFromLocalStorage();
    remainingToDo(localStorageData.length);
    localStorageData.forEach((data) => {
        addingUserNotesOnUserInterface(data)
    })
}
function addingUserNotesOnUserInterface(userInputValue) {
    let container = document.querySelector(".listSecondContainer");
    let input = document.querySelector(UserInterface.listInput);
    let innerDiv = document.createElement("div");
    innerDiv.innerHTML = `<div class="dynamicListContainer border border-danger  my-3 px-3 "><input type="checkbox" class="" id="">
    <label class="px-2" for="">${userInputValue}</label>
    <p class="remove" id=${index}>remove</p>
</div>`
    container.insertBefore(innerDiv, input);
    index++;
}
//  storing data in local storage
function getDataFromLocalStorage() {
    let localStorageDataArray;
    let localStorageData = localStorage.getItem("notesList");
    if (localStorageData === null) {
        localStorageDataArray = [];
    } else {
        localStorageDataArray = JSON.parse(localStorageData)
    }
    return localStorageDataArray;
}
function storeDataInLocalStorage(userInputValue) {
    let listArray = getDataFromLocalStorage();
    listArray.push(userInputValue);
    // console.log(listArray);
    let toDo = listArray.length;
    localStorage.setItem("notesList", JSON.stringify(listArray));
    // console.log(listArray);
    remainingToDo(toDo);
}
document.querySelector(".listSecondContainer").addEventListener("click", (e) => {

    if (e.target.classList.contains("remove")) {
        // console.log("removed");
        e.target.parentElement.remove();
        let index = e.target.id;
        deleteFromLocalStorage(index)
    }
})
function deleteFromLocalStorage(index) {
    // console.log(index)
    let listData = getDataFromLocalStorage();
    let toDo = listData.length - 1;
    listData.splice(index, 1);
    localStorage.setItem("notesList", JSON.stringify(listData))
    // console.log(toDo);
    remainingToDo(toDo);
}
function remainingToDo(toDo) {
    // console.log(toDo);
    document.querySelector("#listCount").innerHTML = toDo;
}
document.addEventListener("DOMContentLoaded", () => {
    displayUserInput()
})

let checkBox = document.querySelector("#hideCompleted");
console.log(checkBox);
checkBox.addEventListener("click", () => {
    if (checkBox.checked === true) {
        console.log("checked");
        document.querySelector(UserInterface.filter).removeEventListener("keyup", (e) => {
        })
    } else {
        document.querySelector(UserInterface.filter).addEventListener("keyup", (e) => {
            let searchValue = e.target.value.trim().toLowerCase();
            let storedListContainer = document.querySelector(".listSecondContainer");
            let divs = storedListContainer.querySelectorAll("div");
            divs.forEach((div) => {
                if (div.classList.contains("dynamicListContainer")) {
                    let listValue = div.children[1];
                    if (listValue.textContent.trim().toLowerCase().includes(searchValue)) {
                        listValue.parentElement.parentElement.style.display = "block";
                    } else {
                        listValue.parentElement.parentElement.style.display = "none";
                    }
                }
            })
        })
    }
})

