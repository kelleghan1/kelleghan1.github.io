$(document).ready(function() {

  var selected = 0;


  $.ajax({
    url: 'https://galvanize-eats-api.herokuapp.com/menu',
    type: 'GET',
    dataType: 'json', // added data type
    success: function(menuitem) {


      for (var i = 0; i < menuitem.menu.length; i++) {
        if (menuitem.menu[i].type == 'burger') {
          $('#burgers').append('<tr data-price="'+menuitem.menu[i].price+'"><td>'+menuitem.menu[i].name+'</td><td>'+menuitem.menu[i].price+'</td></tr>');
        } else if (menuitem.menu[i].type == 'pizza') {
          $('#pizzas').append('<tr data-price="'+menuitem.menu[i].price+'"><td>'+menuitem.menu[i].name+'</td><td>'+menuitem.menu[i].price+'</td></tr>');
        }
      }
    }
  });

  $('tbody').on('click', 'tr', function(event) {
    selected = 0;
    event.preventDefault();
    $('th').css('background-color', 'white');
    $('tr').css('background-color', 'white');
    $(this).css('background-color', 'grey');
    selected += ($(this).data('price'));
  })

  $('#additem').on('click', function(event) {

    console.log($('#quantity').val());
    console.log(parseFloat(selected * $('#quantity').val()));

    if ($('#quantity').val != 0) {

      $('.coltwo').append('<p>Total ' + parseFloat(selected * $('#quantity').val()) + '</p>');

    }



  })
})
