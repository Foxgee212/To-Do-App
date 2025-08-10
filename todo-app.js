const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const darkToggle = document.getElementById("dark-toggle");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo;
    li.appendChild(span);

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const newTask = prompt("Edit task:", todos[index]);
      if (newTask !== null && newTask.trim() !== "") {
        todos[index] = newTask.trim();
        saveTodos();
        renderTodos();
      }
    };
    li.appendChild(editBtn);

    // Delete Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const newTodo = input.value.trim();
  if (newTodo !== "") {
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    input.value = "";
  }
};

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
};

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

renderTodos();
