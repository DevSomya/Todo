//SELECTORS AREA

const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const formSubmit = document.querySelector("input");
// const todoFilter = document.querySelector(".todo-filter");
const todoCount = document.querySelector(".item-count");
const allItem = document.getElementById("all-filter");
const activeItem = document.getElementById("active-filter");
const completedItem = document.getElementById("completed-filter");
//EVENT LISTENERS AREA
document.addEventListener("DOMContentLoaded", getTodoItems);
todoList.addEventListener("click", todoItemHandler);
// todoFilter.addEventListener("click", filterTodoHandler);
allItem.addEventListener("click", allItemHandler);
activeItem.addEventListener("click", activeItemHandler);
completedItem.addEventListener("click", completedItemHandler);

//FUNCTIONS AREA
formSubmit.onkeydown = (e) => {
  //Doing the check if Enter Key is pressed or not
  if (e.keyCode === 13) {
    e.preventDefault();

    //Creating DIV Element to hold Todo Items
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //Creating Radio Butonns to select items
    const markCompleteRadioButton = document.createElement("button");
    markCompleteRadioButton.innerHTML =
      '<i class="fa-solid fa-check"></i>';
    markCompleteRadioButton.classList.add("complete-button");
    todoDiv.appendChild(markCompleteRadioButton);

    //Creating LI element for each Item
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.textContent = todoInput.value;
    todoDiv.appendChild(todoItem);

    saveTodoToLocalStorage(todoInput.value);

    //Creating Delete Button
    const markDeleteButton = document.createElement("button");
    markDeleteButton.innerHTML = '<i class="fa-light fa-x"></i>';
    markDeleteButton.classList.add("delete-button");
    todoDiv.appendChild(markDeleteButton);

    todoList.appendChild(todoDiv);

    //clearing the text

    todoInput.value = "";
  }
};

//Delete Function

function todoItemHandler(e) {
  const item = e.target;
  //DELETE Handler
  if (item.classList.value === "delete-button") {
    const todo = item.parentElement;
    todo.remove();
    removeTodoItem(todo);
  }

  //COMPLETED Handler
  if (item.classList.value === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed-task");
  }
}

// function filterTodoHandler(e) {
//   const todos = todoList.childNodes;
//   todos.forEach((item) => {
//     switch (e.target.value) {
//       case "All": {
//         item.style.display = "flex";
//         break;
//       }
//       case "Active": {
//         if (!item.classList.contains("completed-task")) {
//           item.style.display = "flex";
//         } else {
//           item.style.display = "none";
//         }
//         break;
//       }
//       case "Completed": {
//         if (item.classList.contains("completed-task")) {
//           item.style.display = "flex";
//         } else {
//           item.style.display = "none";
//         }
//         break;
//       }
//     }
//   });
// }

//LOCAL STORAGE

function checkLocalStorage() {
  let items;
  if (localStorage.getItem("todos") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("todos"));
  }
  return items;
}

function saveTodoToLocalStorage(todo) {
  let todos = checkLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("todoLength", todos.length);
  let todoSize = localStorage.getItem("todoLength");
  todoCount.textContent = `${todoSize} items`;
}

function getTodoItems() {
  const todos = checkLocalStorage();
  todos.forEach((item) => {
    //Creating DIV Element to hold Todo Items
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //Creating Radio Butonns to select items
    const markCompleteRadioButton = document.createElement("button");
    markCompleteRadioButton.innerHTML =
      '<i class="fa-solid fa-check"></i>';
    markCompleteRadioButton.classList.add("complete-button");
    todoDiv.appendChild(markCompleteRadioButton);

    //Creating LI element for each Item
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.textContent = item;
    todoDiv.appendChild(todoItem);

    //Creating Delete Button
    const markDeleteButton = document.createElement("button");
    markDeleteButton.innerHTML = '<i class="fa-light fa-x"></i>';
    markDeleteButton.classList.add("delete-button");
    todoDiv.appendChild(markDeleteButton);

    todoList.appendChild(todoDiv);
    let todoSize = localStorage.getItem("todoLength");
    todoCount.textContent = `${todoSize} items`;
  });
}

function removeTodoItem(todoItem) {
  const todos = checkLocalStorage();
  let itemToDelete = todoItem.children[1].innerText;

  todos.splice(todos.indexOf(itemToDelete), 1);
  todoCount.textContent = `${todos.length} items`;
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("todoLength", todos.length);
  let todoSize = localStorage.getItem("todoLength");
  todoCount.textContent = `${todoSize} items`;
}

function allItemHandler() {
  const todos = todoList.childNodes;
  todos.forEach((item) => {
    item.style.display = "flex";
  });
}

function activeItemHandler() {
  const todos = todoList.childNodes;
  todos.forEach((item) => {
    if (!item.classList.contains("completed-task")) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function completedItemHandler() {
  const todos = todoList.childNodes;
  todos.forEach((item) => {
    if (item.classList.contains("completed-task")) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
