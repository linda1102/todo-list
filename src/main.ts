const input = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const list = document.getElementById("todo-list") as HTMLUListElement;
const clearAllBtn = document.getElementById("clear-all") as HTMLButtonElement;

interface TodoItem {
  text: string;
  done: boolean;
}

// data
let todos: TodoItem[] = [];

// render ulang semua list
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <input type="checkbox" class="check" ${item.done ? "checked" : ""}>
      
      <span class="item-text" style="text-decoration: ${item.done ? "line-through" : "none"};">
        ${item.text}
      </span>
      
      <span class="status-tag ${item.done ? "done" : "not-done"}">
        ${item.done ? "Selesai" : "Belum"}
      </span>

      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Hapus</button>
      </div>
    `;

    // checkbox event
    li.querySelector(".check")?.addEventListener("change", () => {
      todos[index].done = !todos[index].done;
      renderTodos();
    });

    // edit event
    li.querySelector(".edit-btn")?.addEventListener("click", () => {
      const newName = prompt("Ubah nama:", item.text);
      if (newName && newName.trim() !== "") {
        todos[index].text = newName.trim();
        renderTodos();
      }
    });

    // delete event
    li.querySelector(".delete-btn")?.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
    });

    list.appendChild(li);
  });
}

// menambah todo
function addTodo() {
  const text = input.value.trim();
  if (text === "") return alert("Masukkan tugas dulu!");

  todos.push({ text, done: false });
  input.value = "";
  renderTodos();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

clearAllBtn.addEventListener("click", () => {
  list.innerHTML = "";
  todos = [];
});

const colors = [
  "#ffe1e1", // pink soft
  "#e1e8ff", // blue soft
  "#e7ffe1", // green soft
  "#fff4d6", // yellow soft
  "#f3e1ff"  // purple soft
];
