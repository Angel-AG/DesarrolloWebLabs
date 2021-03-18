function createTodoElement(todoEl) {
  const inputNode = document.createElement('input');
  inputNode.className = 'form-check-input';
  inputNode.setAttribute('type', 'checkbox');

  const labelNode = document.createElement('label');
  labelNode.className = 'form-check-label';
  labelNode.appendChild(inputNode);
  labelNode.appendChild(document.createTextNode(' ' + todoEl));

  const divNode = document.createElement('div');
  divNode.className = 'form-check';
  divNode.appendChild(labelNode);

  return divNode;
}

function addNewTodo() {
  let newTodo = document.getElementById('new-todo').value;
  document.getElementById('new-todo').value = '';

  newTodo = newTodo.trim();
  if (newTodo.length === 0) return;

  const todoList = document.getElementById('todo-list');
  todoList.appendChild(createTodoElement(newTodo));
}

function markTodos(check) {
  const todoList = document.getElementById('todo-list');

  if (todoList.childElementCount === 0) return;

  const inputList = todoList.getElementsByTagName('input');
  for (let i = 0; i < inputList.length; i++) {
    inputList[i].checked = check;
  }
}

function deleteTodos() {
  const todoList = document.getElementById('todo-list');

  if (todoList.childElementCount === 0) return;

  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
}

function init() {
  document.getElementById('todo-submit').addEventListener('click', addNewTodo);
  document.getElementById('todo-clear-all').addEventListener('click', () => {
    markTodos(false);
  });
  document.getElementById('todo-mark-all').addEventListener('click', () => {
    markTodos(true);
  });
  document.getElementById('todo-delete-all').addEventListener('click', deleteTodos);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
