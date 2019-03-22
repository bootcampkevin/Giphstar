
$(document).ready(function () {

  // Initial array of giphys
  let giphyArray = ['Princess Peach', 'Luigi', 'Toad', 'Bowser', 'Mario', 'Princess Daisy', 'Wario', 'Waluigi', 'Rosalina', 'Donkey Kong', 'Diddy Kong', 'Toadette', 'Blue Toad', 'Yellow Toad', 'Bowser Jr.', 'Koopalings', 'Kamek', 'Birdo'];

  let rating = '';
  let baseURL = 'https://api.giphy.com/v1/gifs/search?q=';
  let q = ''; //obtained from buttonInfo  
  let apiKey = 'SH5Sm7xZwnUdkahuKHmC8IIrmKfiFKKD';  
  let limit = 10;

  // var xhr = $.get('http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key='+apiKey+'&limit=10');
  // xhr.done(function(data) { console.log('success got data', data); });

  // Generic function for capturing the giphy name from the data-attribute
  function grabFromGiphy() {

    // $('#giphy-view').empty();
    q = ($(this).attr('data-name'));
    //thanks to template literal readings...big arrow skills are my next target. and .map() 
    var queryURL = `${baseURL}${q}&api_key=${apiKey}&limit=${limit}`;
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


          var giphyDiv = $('<div>');
          giphyDiv.addClass('giphy-div');

          // $(giphyDiv).append('<h2>' + giphyTitle + '</h2>');
          $(giphyDiv).append(`<p>Rating: ${giphyRating.toUpperCase()}</p>`);

          var img = $('<img>');
          img.attr('src', giphySrcAnimate);
          img.attr('alt', giphyTitle);
          img.attr('data-still', giphySrcStill);
          img.attr('data-animate', giphySrcAnimate);
          img.attr('data-clicked', 'false');
          img.addClass('gif-img m-1');
          giphyDiv.append(img);
          
          let optionsDiv = $('<div>');
          optionsDiv.addClass('img-options');
          
          let options = `<a class="item" href="${giphySrcAnimate}" download><span class="mx-3"><img width="20" height="20" src="./assets/images/dl.svg"></span>Download</a><a class="item" href="#"><span class="mx-3"><img width="20" height="20" src="./assets/images/fav.svg"></span>Favorite!</a>`;
          // let options = `<a class="item" href="https://www.w3schools.com/images/myw3schoolsimaffddsfge.jpg" download><span class="mx-3"><img width="20" height="20" src="./assets/images/dl.svg"></span>Download</a><a class="item" href="#"><span class="mx-3"><img width="20" height="20" src="./assets/images/fav.svg"></span>Favorite!</a>`;
          //https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_a_download

          optionsDiv.append(options);
          giphyDiv.append(optionsDiv);
          
          // $('#giphy-view').html(giphyDiv);
          $('#giphy-view').prepend(giphyDiv);

        }

      });

  }

function addToFavorites(){
  console.log('favorites adding');  
  console.log($(this).parent().parent());
  
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

  function switchState() {
    let state = $(this).attr('data-state');
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    //I hacked at these if/else statements a lot. Started with just hover, but wanted to add click to pause
    // but upon exit, it would switch back, so I had to make a clicked flag to fix it
    //so that upon a click, a hover exit will not switch it. Was way harder than I thought it'd be. 
    //TODO There has got to be a jQuery sort of hover and click event. Maybe a toggle class.     
    if (state === 'still' && $(this).attr('data-clicked') !== 'false') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } 
    else if (state === 'animate' && $(this).attr('data-clicked') !== 'true') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    }
    else if ($(this).attr('data-clicked') !== 'false') {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
    else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
    $(this).attr('data-clicked', 'true');    

  }
  function hoverEnterState() {
    let state = $(this).attr('data-state');
    $(this).attr('data-clicked', 'false');
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  }
  function hoverExitState() {
    let state = $(this).attr('data-state');
    if ($(this).attr('data-clicked') !== 'false') {
    }
    else {
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
      $(this).attr('data-clicked', 'false');
    }
  }
  // This function handles events where one button is clicked
  $('#add-giphy').on('click', function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var giphyInput = $('#giphy-input').val().trim();
    $('#giphy-input').val('');

    // The giphy from the textbox is then added to our array
    if (giphyInput.length > 0) {
      giphyArray.push(giphyInput);
    }

    // Calling renderButtons which handles the processing of our giphy array
    renderButtons();
  });


  $(document).on('click', '.gif-btn', grabFromGiphy);

  $(document).on('click', '.gif-img', switchState);
  $(document).on('mouseenter', '.gif-img', hoverEnterState);
  $(document).on('mouseleave', '.gif-img', hoverExitState);
  $(document).on('click', '.item', addToFavorites);



  // Calling the renderButtons function to display the initial buttons
  renderButtons();




});