const input_todoText = document.querySelector("#todoText");
const listSection = document.querySelector("#listSection");
const btn_submit = document.querySelector("#submit");
const btn_trash = document.querySelector("#trash");

window.addEventListener("load", () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todoText) => {
    createTodoElement(todoText);
  });
});

btn_submit.addEventListener("click", (e) => {
  e.preventDefault();
  const todoText = input_todoText.value;
  saveTodoToLocalStorage(todoText);
  createTodoElement(todoText);
});

function createTodoElement(todoText) {
  let newDiv = document.createElement("div");
  newDiv.classList.add(
    "bg-white",
    "bg-opacity-30",
    "min-w-fit",
    "w-fit",
    "max-w-[36rem]",
    "h-[2.2rem]",
    "rounded-2xl",
    "flex",
    "items-center",
    "justify-center",
    "py-5",
    "px-5",
    "space-x-2"
  );
  newDiv.innerHTML = `
    <div class="flex items-center justify-center">
        <span class="text-lg bg-transparent">${todoText}</span>
    </div>
    <div class="flex items-center justify-center">
        <button
            class="removeItem flex items-center justify-center"
        >
            <i class="fa fa-times"></i>
        </button>
    </div>`;

  listSection.appendChild(newDiv);

  const btn_removeItem = newDiv.querySelector(".removeItem");
  btn_removeItem.addEventListener("click", () => {
    listSection.removeChild(newDiv);
    removeTodoFromLocalStorage(todoText);
  });
}

function saveTodoToLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoFromLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => todo !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

btn_trash.addEventListener("click", () => {
  clearTodosFromLocalStorage();
  listSection.innerHTML = "";
});

function clearTodosFromLocalStorage() {
  localStorage.removeItem("todos");
}
