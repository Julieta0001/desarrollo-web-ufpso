
document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const taskCount = document.getElementById('task-count');

  
  function updateTaskCount() {
    const tasks = taskList.getElementsByTagName('li');
    taskCount.textContent = `Tareas pendientes: ${tasks.length}`;
  }

 
  function deleteTask(event) {
    const task = event.target.closest('li');
    task.remove();
    updateTaskCount();
  }

  
  function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
      const taskItem = document.createElement('li');

      const taskContent = document.createElement('span');
      taskContent.textContent = taskText;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', deleteTask);

      taskItem.appendChild(taskContent);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);

      taskInput.value = ' ';
      updateTaskCount();
    }
  }


  taskForm.addEventListener('submit', addTask);
});