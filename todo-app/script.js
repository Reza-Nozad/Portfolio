const form = document.querySelector('.todo-form'); 
const input = document.querySelector('.todo-input'); 
const todoList = document.querySelector('.todo-list'); 
const todoInfo = document.querySelector('.todo-info'); 

let todos = []; 

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const taskText = input.value.trim(); 

    if (taskText === '') return; 

    const newTask = {
        id: Date.now(), 
        text: taskText,
        completed: false 
    };

    todos.push(newTask); 
    input.value = ''; 

    renderTodos(); 
});

function renderTodos() {
    todoList.innerHTML = ''; 

    todos.forEach(task => {
        
        const li = document.createElement('li');
        li.dataset.id = task.id; 

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        li.append(checkbox, span, deleteButton);
        todoList.appendChild(li); 
    });

    todoInfo.textContent = `${todos.filter(task => !task.completed).length} offene Aufgaben`;
}

function toggleTaskCompletion(taskId) {
    const task = todos.find(task => task.id === taskId);
    task.completed = !task.completed; 
    renderTodos(); 
}

function deleteTask(taskId) {
    todos = todos.filter(task => task.id !== taskId); 
    renderTodos(); 
}

