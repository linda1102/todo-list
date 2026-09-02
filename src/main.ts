const input = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const list = document.getElementById("todo-list") as HTMLUListElement;
const clearAllBtn = document.getElementById("clear-all") as HTMLButtonElement;

interface TodoItem {
  text: string;
  done: boolean;
}
// LOAD DATA DARI LOCALSTORAGE SAAT AWAL
let todos: TodoItem[] = JSON.parse(localStorage.getItem("todos") || "[]");

// Simpan ke localStorage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    // ANIMASI MASUK
    setTimeout(() => {
      li.classList.add("show");
    }, 10);

    li.innerHTML = `
      <input type="checkbox" class="check" ${item.done ? "checked" : ""}>
      
      <span class="item-text" style="text-decoration: ${
        item.done ? "line-through" : "none"
      };">
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
      saveToLocalStorage();
      renderTodos();
    });

    // edit
    li.querySelector(".edit-btn")?.addEventListener("click", () => {
      const newName = prompt("Ubah nama:", item.text);
      if (newName && newName.trim() !== "") {
        todos[index].text = newName.trim();
        saveToLocalStorage();
        renderTodos();
      }
    });

    // delete
    li.querySelector(".delete-btn")?.addEventListener("click", () => {
      if (confirm("Yakin ingin menghapus tugas ini?")) {
        // ANIMASI KELUAR
        li.classList.add("hide");
        setTimeout(() => {
          todos.splice(index, 1);
          saveToLocalStorage();
          renderTodos();
        }, 300);
      }
    });

    list.appendChild(li);
  });
}

// TAMBAH TODO
function addTodo() {
  const text = input.value.trim();
  if (text === "") return alert("Masukkan tugas dulu!");

  todos.push({ text, done: false });
  saveToLocalStorage();
  input.value = "";
  renderTodos();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// HAPUS SEMUA + KONFIRMASI
clearAllBtn.addEventListener("click", () => {
  if (todos.length === 0) return alert("Tidak ada tugas!");
  if (confirm("Hapus semua tugas?")) {
    list.innerHTML = "";
    todos = [];
    saveToLocalStorage();
  }
});

renderTodos();
