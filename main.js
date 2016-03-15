$(document).ready(function() {
  var selecteditem = [];
  var selected = 0;
  var total = 0;
  var order = {};
  var orderItems = [];

  $('#total').html('<p>Total</p>');


  $.ajax({
    url: 'https://galvanize-eats-api.herokuapp.com/menu',
    type: 'GET',
    dataType: 'json', // added data type
    success: function(menuitem) {

      for (var i = 0; i < menuitem.menu.length; i++) {
        if (menuitem.menu[i].type == 'burger') {
          $('#burgers').append('<tr data-price="'+menuitem.menu[i].price+'"id="'+menuitem.menu[i].name+'"><td>'+menuitem.menu[i].name+'</td><td>'+menuitem.menu[i].price+'</td></tr>');
        } else if (menuitem.menu[i].type == 'pizza') {
          $('#pizzas').append('<tr data-price="'+menuitem.menu[i].price+'"id="'+menuitem.menu[i].name+'"><td>'+menuitem.menu[i].name+'</td><td>'+menuitem.menu[i].price+'</td></tr>');
        }
      }
    }
  });

  $('tbody').on('click', 'tr', function(event) {
    selected = 0;
    selecteditem.length = 0;
    event.preventDefault();
    $('th').css('background-color', 'white');
    $('tr').css('background-color', 'white');
    $(this).css('background-color', 'grey');

    if (isNaN($(this).data('price'))==false) {
      selected += ($(this).data('price'));
      selecteditem.push($(this).attr('id'));
    }

  })

  $('#additem').on('click', function(event) {

    if ($('#quantity').val() > 0 && selected != 0) {
      total += parseFloat(selected * $('#quantity').val())
      $('#orderlist').append('<p>'+$('#quantity').val()+' '+selecteditem+' '+selected+'</p>');
      $('#total').html('<p>Total ' + total.toFixed(2) + '</p>');
      orderItems.push($('#quantity').val()+' '+selecteditem+' '+selected);
    }
    order.item = orderItems;
    order.total = total.toFixed(2);

  })


  $('#deliverit').on('click', function(event) {
    var phonenum = $('#phone').val();
    var addressval = $('#address').val();

    if ( !phonenum.match(/^\(\d{3}\) ?\d{3}( |-)?\d{4}|^\d{3}( |-)?\d{3}( |-)?\d{4}$/) ) {
      window.alert("Phone Number Required");

    }else if ( !addressval.match(/\d{1,3}.?\d{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}/) ) {
      window.alert("Address Required");
    }else{
      order.number = phonenum;
      order.address = addressval;

      $.ajax({
        url: 'https://galvanize-eats-api.herokuapp.com/orders',
        type: 'POST',
        data: order,
        dataType: 'json', // added data type
        success: function(sent) {
          console.log(sent);
        }

      });

    }
  })
})
