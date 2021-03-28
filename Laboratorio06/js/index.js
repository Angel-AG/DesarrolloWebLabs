function checkItem(item) {
  $(item).children('p').toggleClass('line-through');
}

function deleteItem(item) {
  $(item).remove();
}

function addShopItem() {
  let newItem = $('#newText').val();
  $('#newText').val('');

  newItem = newItem.trim();
  if (newItem.length === 0) return;

  let shopEl = $($('#shop-el').html());
  $('p', shopEl).text(newItem);

  $('#shop-list').append(shopEl);
}

function init() {
  $('#shop-add').click(addShopItem);
  $('#shop-list').on('click', 'button.btn-success', (e) => {
    checkItem($(e.target).parent());
  });
  $('#shop-list').on('click', 'button.btn-danger', (e) => {
    deleteItem($(e.target).parent());
  });
}

$(document).ready(() => {
  init();
});
