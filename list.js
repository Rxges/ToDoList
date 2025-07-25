
var listCounter = 0; //unused
document.querySelector("#addButton").addEventListener("click", function () {
    document.querySelector("#list-container").insertAdjacentHTML("beforeend", "<li class=" + listCounter + "><input type='checkbox' class='checkbox'><input type='text' class='text'>" + 
    "</li>");
    listCounter++;
    if(removing) {
        removeX();
        deleteItem();
    }
})


var removing = false;
function removeButton() {
    removing = false;
    document.querySelector(".removeButton").addEventListener("click", function () {
        document.querySelector("#remove").textContent = "Cancel";
        document.querySelector("#remove").classList.remove("removeButton");
        document.querySelector("#remove").classList.add("cancelButton");
        deleteItem();
        cancelButton();
    })
}
removeButton();

function cancelButton() {
    removing = true;
    document.querySelector(".cancelButton").addEventListener("click", function () {
        document.querySelector("#remove").textContent = "Remove Task";
        document.querySelector("#remove").classList.remove("cancelButton");
        document.querySelector("#remove").classList.add("removeButton");
        removeX();
        removeButton();
    })
}




function crossOffItem() {
    var checkboxes = document.querySelectorAll(".checkbox");
    for(var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            document.querySelectorAll(".text")[i].classList.add("strikethrough");
        }
        else {
            document.querySelectorAll(".text")[i].classList.remove("strikethrough");
        }
    }
}
setInterval(crossOffItem, 100);



function deleteItem() {
    var listArr = document.querySelectorAll("li");
    var buttonCounter = 0;
    for(var i = 0; i < listArr.length; i++) {
        listArr[i].insertAdjacentHTML("beforeend", "<button class='xButton " + buttonCounter + "'>X</button>");
        buttonCounter++;
    }

    var xButtonArr = document.querySelectorAll(".xButton");
    for(var i = 0; i < xButtonArr.length; i++) {
        xButtonArr[i].addEventListener("click", function (event) { //problem
            var listNum = event.target.classList[1];    // set as buttonCounter value for clicked button
            listArr[listNum].remove(); 
        })
    }
}

function removeX() {
    var xButtonArr = document.querySelectorAll(".xButton");
    for(var i = 0; i < xButtonArr.length; i++) {
        xButtonArr[i].remove();
    }
}






function saveList() {
    var listObject = document.querySelectorAll(".text");
    var listObjectText = [];
    for(var i = 0; i<listObject.length; i++) {
        listObjectText.push(listObject[i].value);
    }
    localStorage.setItem("userInput", JSON.stringify(listObjectText));
}
window.addEventListener("beforeunload", saveList); // runs the function saveList() before the web page closes
//setInterval(saveList, 100);

function setSavedLists() {
    var savedItem = JSON.parse(localStorage.getItem("userInput"));

    if(savedItem && savedItem.length > 0) {
        document.querySelector("#list-container").innerHTML = "";
        for(var i = 0; i <savedItem.length; i++) {
            document.querySelector("#list-container").insertAdjacentHTML("beforeend", "<li class=" + i + "><input type='checkbox' class='checkbox'><input type='text' class='text' value=" + savedItem[i] + 
                "></li>");
            listCounter++;
        }
    }
}
document.addEventListener('DOMContentLoaded', function() { // runs when the page loads
    setSavedLists();
});
//setSavedLists();

