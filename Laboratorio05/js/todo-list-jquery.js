function addNewTodo() {
  let newTodo = $('#new-todo').val();
  $('#new-todo').val('');

  newTodo = newTodo.trim();
  if (newTodo.length === 0) return;

  newTodo = ' ' + newTodo;

  let todoEl = $($('#todo-el').html());
  $('.form-check-label', todoEl).append(newTodo);

  $('#todo-list').append(todoEl);
}

function markTodos(check) {
  $('#todo-list > div > label > input').prop('checked', check);
}

function deleteTodos() {
  $('#todo-list').empty();
}

function init() {
  $('#todo-submit').click(addNewTodo);
  $('#todo-clear-all').click(() => {
    markTodos(false);
  });
  $('#todo-mark-all').click(() => {
    markTodos(true);
  });
  $('#todo-delete-all').click(deleteTodos);
}

$(document).ready(() => {
  init();
});
