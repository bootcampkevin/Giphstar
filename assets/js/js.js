
$(document).ready(function () {

// Initial array of giphys
let giphyArray = ['The Matrix', 'The Notebook', 'Mr. Nobody', 'The Lion King'];

let rating ='';
let baseURL = 'http://api.giphy.com/v1/gifs/search?q=';
let q = ''; //obtained from buttonInfo
let apiParam = '&api_key=';
let apiKey = 'SH5Sm7xZwnUdkahuKHmC8IIrmKfiFKKD';
let limitParam = '&limit=';
let limit = 10;

// var xhr = $.get('http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key='+apiKey+'&limit=10');
// xhr.done(function(data) { console.log('success got data', data); });

// Generic function for capturing the giphy name from the data-attribute
  function grabFromGiphy() {

    $('#giphy-view').empty();
    q = ($(this).attr('data-name'));
    var queryURL = baseURL + q + apiParam + apiKey + limitParam + limit;
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .then(function (response) {
        var payload = response.data;

        // $('#giphy-view').append(JSON.stringify(response));

        for (var i = 0; i < payload.length; i++) {

          var giphyTitle = payload[i].title;
          var giphyRating = payload[i].rating;
          var giphySrc = payload[i].images.fixed_height_still.url;
          
          var giphyDiv = $('<div class="giphy-div">');

          $(giphyDiv).append('<h1>'+giphyTitle+'</h2>');
          $(giphyDiv).append('<p>'+giphyRating.toUpperCase()+'</p>');       

          var img = $('<img>');
          img.attr('src', giphySrc);
          $(giphyDiv).append(img);

          // $('#giphy-view').html(giphyDiv);
          $('#giphy-view').append(giphyDiv);

        }

      });

// * **HINT:** You should use HTML `data-*` attributes, `this` and the jQuery `.attr()` method.

}

// Function for displaying giphy data
function renderButtons() {

  // Clearing the giphy's on screen prior to adding new ones
  // (this is necessary otherwise we will have repeat buttons)
  $('#buttons-view').empty();

  // Looping through the array of giphys
  for (var i = 0; i < giphyArray.length; i++) {   
    var appendButton = $('<button>');    
    appendButton.addClass('gif');
    appendButton.attr('data-name', giphyArray[i]);
    // Provided the initial button text
    appendButton.text(giphyArray[i]);
    // Added the button to the HTML
    $('#buttons-view').append(appendButton);
  }
}

// This function handles events where one button is clicked
$('#add-giphy').on('click', function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var giphy = $('#giphy-input').val().trim();
  $('#giphy-input').val('');

  // The giphy from the textbox is then added to our array
  giphyArray.push(giphy);

  // Calling renderButtons which handles the processing of our giphy array
  renderButtons();
});


$(document).on('click', '.gif', grabFromGiphy);

// Calling the renderButtons function to display the initial buttons
renderButtons();




});