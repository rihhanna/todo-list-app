// DOM Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToDOM(task));
});

// Add task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = { text: taskText, completed: false };
    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    taskInput.value = "";
  }
});

// Add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.className = `task-item ${task.completed ? "completed" : ""}`;
  li.innerHTML = `
    <span>${task.text}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Toggle completed
  li.querySelector("span").addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // Delete task
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update localStorage when tasks change
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}