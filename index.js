const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

// update the empty span message dynamicallly
// to get updated message, select the span, count the LI and print the message
function updateMessage() {
  // li's are children of ul
  const tasksLength = tasks.children.length;
  messageSpan.textContent = `You have ${tasksLength} pending tasks`;
}
updateMessage();

// add tasks

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //   // class Add, name - task, its value which we enter
  //   console.log(addForm.task.value);

  //   Add a new task
  // remove white space of the value we enter
  const value = addForm.task.value.trim();
  if (value.length) {
    console.log(value);
    tasks.innerHTML += `<li>
                            <span>${value}</span>
                            <i class="bi bi-trash delete"></i>
                        </li>`;
    addForm.reset();
    // if we are adding tasks then only update the updated li list
    updateMessage();
  }
});

// remove tasks

tasks.addEventListener("click", (event) => {
  //   // event is the entire event, event.target is target element
  //   console.log(event.target);
  // target delete class
  if (event.target.classList.contains("delete")) {
    // console.log(event.target);
    event.target.parentElement.remove();
    // if we are removing tasks then only update the updated li list
    updateMessage();
  }
});

// clear all the tasks

clearAll.addEventListener("click", (event) => {
  console.log(event);
  //remove all the tasks, select all the li's first remove all li's
  const taskItems = tasks.querySelectorAll("li");
  taskItems.forEach((task) => {
    task.remove();
  });
  // if we are removing tasks then only update the updated li list
  updateMessage();
});

// searching something maching and clear

// fucntion which compares user input to all available li items
function filterTask(term) {
  //   console.log(term);
  //   console.log(tasks.children);
  // convert html collection into array
  // console.log(Array.from(tasks.children));
  // filter out all elemnets that doesnt include the term
  Array.from(tasks.children)
    .filter((task) => {
      // does the opposite of selection
      // create a list of all items that doesnt include our input term
      return !task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      // remove the element that doest match using hide class
      task.classList.add("hide");
    });

  // if the words are matching remove the hide
  Array.from(tasks.children)
    .filter((task) => {
      // create a list of all items that doesnt include our input term
      return task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      // remove the element that doest match using hide class
      task.classList.remove("hide");
    });
}

searchForm.addEventListener("keyup", (event) => {
  //   console.log(event.target.value);
  //   console.log(searchForm.task.value);
  // take what ever user inputs and trim white spaces
  const term = searchForm.task.value.trim().toLowerCase();
  filterTask(term);
});

// reset form
searchForm.addEventListener("click", (event) => {
  if (event.target.classList.contains("reset")) {
    // removes what ever we write in  search box
    searchForm.reset();
    // updates the form or resets the form with an empty term value that keeps all available list items
    const term = searchForm.task.value.trim();
    filterTask(term);
  }
});
