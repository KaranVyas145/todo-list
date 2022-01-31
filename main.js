// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clearAll=document.getElementById('clearAll');

// Event lisetners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckEdit);


filterOption.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
clearAll.addEventListener("click",clearLocal);

// Functions

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // Checking ig todo input is empty
  if (todoInput.value != 0) {
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Add todo to localStorage
    saveLocalTodos(todoInput.value);

    // Checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    // Append to list
    todoList.appendChild(todoDiv);

    //   Clear todoInput value
    todoInput.value = "";
  }
}

function deleteCheckEdit(event) {
  const item = event.target;

  // Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation

    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    // todo.remove();
  }

  // Check todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  //Edit todo
  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    todoInput.value = todo.innerText;
    // saveLocalTodos(todo);
    todo.remove();
    removeLocalTodos(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    if (todo.innerText == undefined) {
    } else {
      switch (e.target.value) {
        case "all":
          todo.setAttribute("style", "display:flex");
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.setAttribute("style", "display:flex");
          } else {
            todo.setAttribute("style", "display:none");
          }
          break;
        case "uncompleted":
          if (todo.classList.contains("completed")) {
            todo.setAttribute("style", "display:none");
          } else {
            todo.setAttribute("style", "display:flex");
          }
          break;
      }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  // Check if there is already data in localStorage
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  // Check if there is already data in localStorage
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    // Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  // Check if there is already data in localStorage
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editLocalTodo(oldValue, newValue, todo) {
  let todos;
  // Check if there is already data in localStorage
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todoIndex = oldValue;
    todos[todos.indexOf(todoIndex)] = newValue;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function clearLocal(){
  if(localStorage.getItem("todos")!=null){
    window.localStorage.removeItem("todos");
  }
}