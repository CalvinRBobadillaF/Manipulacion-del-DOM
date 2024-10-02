// Variables globales
const taskButton = document.getElementById('main-button');
const mainInput = document.getElementById('main-input');
const main = document.getElementById('main-div');
const changeBack = document.getElementById('changeBackButton');
const body = document.getElementById('body');
let tasks = [];

// Función para añadir las tareas tanto al DOM como al localStorage
function addTask() {
    const task = mainInput.value.trim();
    if (task) {
        createTaskElement(task);
        tasks.push(task);
        updateLocalStorage(); // Actualizamos el localStorage
    } else {
        alert('Please enter a task');
    }
    mainInput.value = ''; // Limpiamos el input
}

// Función para crear los elementos de una tarea
function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    const taskElement = document.createElement('p');
    const otherFDiv = document.createElement('div');
    const deleteP = document.createElement('p');
    const editP = document.createElement('p');

    deleteP.textContent = 'delete';
    editP.textContent = 'edit';

    otherFDiv.classList = 'other-functions';
    taskElement.textContent = task;
    taskDiv.classList = 'task-section';
    taskElement.classList = 'main-task';
    deleteP.classList.add('delete');
    editP.classList.add('edit');

    // Añadimos cada uno a su respectivo contenedor padre
    main.append(taskDiv);
    taskDiv.append(taskElement);
    taskDiv.append(otherFDiv);
    otherFDiv.append(deleteP);
    otherFDiv.append(editP);
}

// Función para actualizar el localStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar las tareas del localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks && savedTasks.length > 0) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(createTaskElement); // Crea el DOM para cada tarea almacenada
    }
}

// Función para eliminar tareas
function deleteTask(event) {
    const taskDiv = event.target.closest('.task-section');
    const taskText = taskDiv.querySelector('.main-task').textContent;

    // Buscar el índice correcto y eliminar la tarea
    const index = tasks.indexOf(taskText);
    if (index > -1) {
        tasks.splice(index, 1); // Elimina la tarea del array
        updateLocalStorage(); // Actualiza el localStorage
    }

    taskDiv.remove(); // Elimina el div del DOM
}

// Función para editar tareas
function editTask(event) {
    const taskDiv = event.target.closest('.task-section');
    const taskElement = taskDiv.querySelector('.main-task');
    const oldTask = taskElement.textContent;
    const newTask = prompt('Ingresa el nuevo texto:', oldTask);

    if (newTask === null || newTask.trim() === '') {
        alert('Please enter a valid task.');
        return;
    }

    const index = tasks.indexOf(oldTask);
    if (index > -1) {
        tasks[index] = newTask; // Actualiza la tarea en el array
        updateLocalStorage(); // Actualiza el localStorage
    }
    taskElement.textContent = newTask; // Actualiza el texto en el DOM
}

// Eventos para eliminar y editar tareas
main.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        deleteTask(event);
    } else if (event.target.classList.contains('edit')) {
        editTask(event);
    }
});

// Evento para agregar tareas
taskButton.addEventListener('click', addTask);

// Evento para cambiar el fondo
changeBack.addEventListener('click', function () {
    body.classList.toggle('dark');
    main.classList.toggle('darkDiv');

    const theme = body.classList.contains('dark') ? "dark" : "light"
    localStorage.setItem('theme', theme);
});

const currentTheme = localStorage.getItem("theme")
if (currentTheme === "dark") {
    body.classList.add("dark");
    main.classList.add("darkDiv");

} else {
    body.classList.remove("dark");
    main.classList.remove("darkDiv");
}

// Cargar las tareas cuando la página se carga
loadTasks();