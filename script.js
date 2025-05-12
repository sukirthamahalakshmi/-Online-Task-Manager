const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDate = document.getElementById('due-date');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const task = {
        text: taskInput.value,
        date: dueDate.value,
        completed: false
    };

    // Save task to local storage
    addTask(task);
    saveTaskToLocalStorage(task);
    
    // Reset input fields
    taskInput.value = '';
    dueDate.value = '';
});

function addTask(task) {
    const li = document.createElement('li');
    li.classList.add('task');
    
    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (Due: ${task.date})`;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteTask(li, task);
    });

    li.appendChild(taskText);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function deleteTask(li, task) {
    taskList.removeChild(li);
    removeTaskFromLocalStorage(task);
}

function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t.text !== task.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTask(task));
}
