
$(document).ready(function () {

  // Initial array of giphys
  let giphyArray = ['The Matrix', 'The Notebook', 'Mr. Nobody', 'The Lion King'];

  let rating = '';
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
        // console.log(payload);

        // $('#giphy-view').append(JSON.stringify(response));

        for (var i = 0; i < payload.length; i++) {

          var giphyTitle = payload[i].title;
          var giphyRating = payload[i].rating;
          var giphySrcAnimate = payload[i].images.fixed_height.url;
          var giphySrcStill = payload[i].images.fixed_height_still.url;

          //<img src="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" 
          //data-still="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" 
          //data-animate="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200.gif" 
          //data-state="still" class="gif">


          var giphyDiv = $('<div class="giphy-div" style="float:left">');

          $(giphyDiv).append('<h1>' + giphyTitle + '</h2>');
          $(giphyDiv).append('<p>' + giphyRating.toUpperCase() + '</p>');
          
          var img = $('<img>');
          img.attr('src', giphySrcAnimate);
          img.attr('alt', giphyTitle);
          img.attr('data-still', giphySrcStill);
          img.attr('data-animate', giphySrcAnimate);
          img.addClass('gif-img');
          $(giphyDiv).append(img);

          // $('#giphy-view').html(giphyDiv);
          $('#giphy-view').append(giphyDiv);

        }

      });

  }

  // Function for displaying giphy data
  function renderButtons() {

    // Clearing the giphy's on screen prior to adding new ones
    // (this is necessary otherwise we will have repeat buttons)
    $('#buttons-view').empty();

    // Looping through the array of giphys
    for (var i = 0; i < giphyArray.length; i++) {
      var appendButton = $('<button>');
      appendButton.addClass('gif-btn');
      appendButton.attr('data-name', giphyArray[i]);
      // Provided the initial button text
      appendButton.text(giphyArray[i]);
      // Added the button to the HTML
      $('#buttons-view').append(appendButton);
    }
  }

  function switchState(){
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  
  }
  // This function handles events where one button is clicked
  $('#add-giphy').on('click', function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var giphyInput = $('#giphy-input').val().trim();
    $('#giphy-input').val('');

    // The giphy from the textbox is then added to our array
    if (giphyInput.length > 0){    
    giphyArray.push(giphyInput);
    }

    // Calling renderButtons which handles the processing of our giphy array
    renderButtons();
  });


  $(document).on('click', '.gif-btn', grabFromGiphy);


  $(document).on('click', '.gif-img', switchState);




  // Calling the renderButtons function to display the initial buttons
  renderButtons();




});