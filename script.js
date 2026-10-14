const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');
const progressText = document.getElementById('progress-text');
const progressBarFill = document.getElementById('progress-bar-fill');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="task-left">
                <div class="checkbox" onclick="toggleTask(${index})">
                    ${task.completed ? '✓' : ''}
                </div>
                <div class="task-info">
                    <span class="task-title">${task.text}</span>
                    <span class="task-time">⏱️ ${task.time} min</span>
                </div>
      </div>
      <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
    `;

    taskList.appendChild(li);
});

updateProgress();
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = taskInput.value.trim();
    const time = timeInput.value.trim();

    if (text && time) {
        tasks.push ({
            text: text,
            time: Number(time),
            completed: false
        });

        taskInput.value = '';
        timeInput.value = '';

        renderTasks();
    }
});

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}


function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    if (totalTasks === 0) {
        progressText.innerText = '0/0 tarefas concluídas';
        progressBarFill.style.width = '0%';
        return;
    }

    const percentage = (completedTasks / totalTasks) * 100;

    progressText.innerText = `${completedTasks}/${totalTasks} tarefas concluídas`;
    progressBarFill.style.width = `${percentage}%`;
}