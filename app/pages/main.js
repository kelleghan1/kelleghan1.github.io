$(document).ready(function() {

  var menua = [];

  $.ajax({
    url: 'https://galvanize-eats-api.herokuapp.com/menu',
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {

      console.log(menu[0].price);
    }
  });




  $('button').on('click', function (event) {

  })


})
