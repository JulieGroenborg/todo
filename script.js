const localList = JSON.parse(localStorage.getItem("tasks"));
console.log(localList);

let allItems = [];
if (localList !== null) {
  allItems = localList;
  showList();
}

//I forhold til template/clone
// create clone
// let clone = document
//   .querySelector("template#create_list")
//   .content.cloneNode(true);

document.querySelector("#add_btn").addEventListener("click", showAdd);

let countMore = 0;
function showAdd() {
  if (countMore === 0) {
    countMore = 1;
    document.querySelector("#create_list").classList.remove("hide");
    document.querySelector("#item").value = "";
    document.querySelector("#quan").value = "";
    document.querySelector("#item").focus();
  } else if (countMore === 1) {
    countMore = 0;
    document.querySelector("#create_list").classList.add("hide");
  }
}
document.querySelector("#submit").addEventListener("click", udskriverOpgave);

function udskriverOpgave(evt) {
  document.querySelector("#create_list").classList.add("hide");
  let itemInputValue = document.querySelector("#item").value;
  let quanInputValue = document.querySelector("#quan").value;

  const temp = {};
  temp.text = itemInputValue;
  temp.quan = quanInputValue;
  temp.done = false;
  temp.id = crypto.randomUUID();
  evt.preventDefault();

  allItems.push(temp);
  console.log("allItems", allItems);
  showList();
  countMore = 0;
}

function showList() {
  // clear the list
  document.querySelector("#show_list").innerHTML = "";
  document.querySelector("#done_list").innerHTML = "";
  allItems.forEach((todoElement) => {
    console.log(todoElement);
    let clone2 = document
      .querySelector("template#the_written")
      .content.cloneNode(true);
    clone2.querySelector(".itemP").textContent = todoElement.text;
    clone2.querySelector(".quanP").textContent = todoElement.quan;
    clone2.querySelector("#check").checked = todoElement.done;
    clone2.querySelector(".container").dataset.id = todoElement.id;

    clone2.querySelector(".container").addEventListener("click", deleteNow);

    if (todoElement.done) {
      document.querySelector("#done_list").prepend(clone2);
    } else {
      document.querySelector("#show_list").prepend(clone2);
    }

    function checkFunktion(evt) {
      evt.preventDefault();
      console.log(evt.target);
      todoElement.done = !todoElement.done;
      showList();
    }

    function deleteNow(evt) {
      // console.log("target", evt.target);
      // console.log("current-target", evt.currentTarget);
      const theTarget = evt.target;
      if (theTarget.getAttribute("id") === "delete") {
        console.log(
          allItems.findIndex((elem) => elem.id === evt.currentTarget.dataset.id)
        );
        const index = allItems.findIndex(
          (elem) => elem.id === evt.currentTarget.dataset.id
        );
        allItems.splice(index, 1);
      } else if (theTarget.getAttribute("id") === "check") {
        checkFunktion(evt);
      }
      showList();
      count = 0;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(allItems));
}

document.querySelector("#clear").addEventListener("click", clearListen);
function clearListen() {
  if (confirm("Er du sikker på, at du vil slette den eksisterende liste?")) {
    localStorage.clear();
    location.reload();
  } else {
  }
}

let count = 0;
document.querySelector("#delete_btn").addEventListener("click", showTrash);
function showTrash() {
  if (count === 0) {
    count = 1;
    document.querySelectorAll("#delete").forEach((element) => {
      element.classList.remove("hide");
    });
  } else if (count === 1) {
    count = 0;
    document.querySelectorAll("#delete").forEach((element) => {
      element.classList.add("hide");
    });
  }
}
