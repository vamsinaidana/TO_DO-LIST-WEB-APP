 let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function formatDateTime(dt) {
    if (!dt) return '';
    const date = new Date(dt);
    return date.toLocaleString();
  }

  function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';

    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = 'todo-item ' + (todo.completed ? 'completed' : '');

      li.innerHTML = `
        <div class="todo-top">
          <span onclick="toggleTodo(${index})" style="cursor:pointer;">${todo.text}</span>
          <button class="btn-delete" onclick="deleteTodo(${index})">&times;</button>
        </div>
        <div class="todo-date">${formatDateTime(todo.datetime)}</div>
      `;

      list.appendChild(li);
    });
  }

  function addTodo() {
    const input = document.getElementById('todoInput');
    const dateTimeInput = document.getElementById('todoDateTime');

    const text = input.value.trim();
    const datetime = dateTimeInput.value;

    if (text === '') return;

    todos.push({ text, datetime, completed: false });

    input.value = '';
    dateTimeInput.value = '';

    saveTodos();
    renderTodos();
  }

  function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }

  renderTodos();