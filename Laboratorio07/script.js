let temas = ['Perros', 'Gatos', 'Hamsters', 'Peces', 'Cuervos'];

function generateTemas() {
  $('#animal-buttons').empty();

  $.each(temas, (idx, val) => {
    let botonTema = $($('#boton-tema').html());
    $(botonTema).text(val);

    $(botonTema).appendTo('#animal-buttons');
  });
}

function addTema() {
  let newItem = $('#animal-input').val();
  $('#animal-input').val('');

  newItem = newItem.trim();
  if (newItem.length === 0) return;

  temas.push(newItem);
  generateTemas();
}

function retrieveGifs(text) {
  let params = {
    api_key: '1PNM0iY61W4HYlh34TkoHT6uKOlFKQjQ',
    q: text,
    limit: 10,
  };
  let api = 'https://api.giphy.com/v1/gifs/search';
  $.get(api, params, (res) => {
    $('#animals').empty();

    $.each(res.data, (idx, val) => {
      let gifElement = $($('#gif-item').html());
      $('h3', gifElement).text(`Rating: ${val.rating}`);
      $('img', gifElement).attr('src', val.images.fixed_height_still.url);
      $('img', gifElement).attr('data-no-move', val.images.fixed_height_still.url);
      $('img', gifElement).attr('data-move', val.images.fixed_height.url);
      $('img', gifElement).attr('data-status', 'still');

      $(gifElement).appendTo('#animals');
    });
  });
}

function updateGif(gif) {
  if ($(gif).attr('data-status') === 'still') {
    $(gif).attr('data-status', 'move');
    $(gif).attr('src', $(gif).data('move'));
  } else {
    $(gif).attr('data-status', 'still');
    $(gif).attr('src', $(gif).data('no-move'));
  }
}

function init() {
  generateTemas(temas);

  $('#animal-buttons').on('click', 'button', (e) => {
    retrieveGifs($(e.target).text());
  });

  $('#animals').on('click', 'img', (e) => {
    updateGif($(e.target));
  });

  $('#add-animal').click(addTema);
}

$(document).ready(init);
