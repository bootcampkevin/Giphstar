//TODO
//I want to add a remove button for the favorites array. 
//I want to add local storage
//I want to change all functions to big arrow where feasible

$(document).ready(function () {

  // Initial array of giphys
  let giphyArray = ['Princess Peach', 'Luigi', 'Toad', 'Bowser', 'Mario', 'Princess Daisy', 'Wario', 'Waluigi', 'Rosalina', 'Donkey Kong', 'Diddy Kong', 'Toadette', 'Blue Toad', 'Yellow Toad', 'Bowser Jr.', 'Koopalings', 'Kamek', 'Birdo'];

  let rating = '';
  let baseURL = 'https://api.giphy.com/v1/gifs/search?q=';
  let q = ''; //obtained from buttonInfo  
  let apiKey = 'SH5Sm7xZwnUdkahuKHmC8IIrmKfiFKKD';
  let limit = 10;
  // let favs = [];
  
  $('#back-btn').hide();
  $('#clear-btn').hide();
  $('#favorites').hide();
  $('#fav-btn').hide();
  


  // Load the favorites from localstorage.
  // We need to use JSON.parse to turn the string retrieved from an array into a string
  //TODO get back something I can iterate through to add the divs back onto the DOM
  // favs = JSON.parse(localStorage.getItem('favorites'));
  // console.log(favs);

  // Checks to see if the favorites exist in localStorage and is an array currently
  // If not, set a local favs variable to an empty array
  // Otherwise favs is our current list of favorites
  if (!Array.isArray(favs)) {
    var favs = [];
  }

  //sample from giphy:
  // var xhr = $.get('http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key='+apiKey+'&limit=10');
  // xhr.done(function(data) { console.log('success got data', data); });

  // Generic function for capturing the giphy name from the data-attribute
  function grabFromGiphy() {
    
    $('#favorites').hide();
    $('#container-header').html('');
    $('#back-btn').hide();
    $('#clear-btn').show();
    $('#giphy-view').show();   
    
    if(favs.length>0){
      $('#fav-btn').show();      
    }    

    q = ($(this).attr('data-name'));
    //thanks to template literal readings...big arrow skills are my next target. and .map() 
    var queryURL = `${baseURL}${q}&api_key=${apiKey}&limit=${limit}`;

    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .then(function (response) {
        var payload = response.data;
       
        // $('#giphy-view').append(JSON.stringify(response));
        
        //flag to prepend if checked, otherwise, propogate after clear, yo.
        if (!$('#add10').is(':checked')) {
          $('#giphy-view').empty();
        }

        for (i in payload) {
          // for (var i = 0; i < payload.length; i++) {

          var giphyTitle = payload[i].title;
          var giphyRating = payload[i].rating;
          var giphySrcAnimate = payload[i].images.fixed_height.url;
          var giphySrcStill = payload[i].images.fixed_height_still.url;

          var giphyDiv = $('<div>');
          giphyDiv.addClass('giphy-div');

          // $(giphyDiv).append('<h2>' + giphyTitle + '</h2>');
          
          var img = $('<img>');
          img.attr('src', giphySrcAnimate);
          img.attr('alt', giphyTitle);
          img.attr('data-still', giphySrcStill);
          img.attr('data-animate', giphySrcAnimate);
          img.attr('data-clicked', 'false');
          img.addClass('gif-img m-1');
          giphyDiv.append(img);

          $(giphyDiv).append(`<p>Rating: ${giphyRating.toUpperCase()}</p>`);

          let optionsDiv = $('<div>');
          optionsDiv.addClass('img-options');

          let options = `<div class="item" id="download-img" data-url="${giphySrcAnimate}"><span class="mx-2"><img width="20" height="20" src="./assets/images/dl.svg"></span>Download</div><div class="item" id="btn-favorite"><span class="mx-2"><img width="20" height="20" src="./assets/images/fav.svg"></span>Favorite!</div>`;
          // let options = `<a class="item" href="${giphySrcAnimate}" download><span class="mx-2"><img width="20" height="20" src="./assets/images/dl.svg"></span>Download</a><div class="item" id="btn-favorite"><span class="mx-2"><img width="20" height="20" src="./assets/images/fav.svg"></span>Favorite!</div>`;
          // let options = `<a class="item" href="https://www.w3schools.com/images/myw3schoolsimaffddsfge.jpg" download><span class="mx-3"><img width="20" height="20" src="./assets/images/dl.svg"></span>Download</a><a class="item" href="#"><span class="mx-3"><img width="20" height="20" src="./assets/images/fav.svg"></span>Favorite!</a>`;
          //https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_a_download
          //SO, I learned that chrome 65 and above, cross-origin download is not possible. 
          //Firefox ONLY supports same-origin download links 

          optionsDiv.append(options);
          giphyDiv.append(optionsDiv);

          $('#giphy-view').prepend(giphyDiv);
        }

      });

  }

  function addToFavorites() {
    // console.log($(this).parents('.giphy-div').children().eq(0).attr('src'));    
    $(this).hide();    
    $('#fav-btn').show();   
        
    let fav = $(this).parents('.giphy-div');
    // $(fav).clone().appendTo('#favorites');
        
    favs.push(fav);
    //TODO figure out why I can't parse this back correctly.
    localStorage.setItem('favorites', JSON.stringify(favs));
  }

  function toggleForAndShowFavorites(){
    $('#giphy-view').hide();
    $('#favorites').show();
    $('#container-header').html('<div class="card text-center"><h5 class="card-header">Favorites</h5></div>');
    $('#clear-btn').hide();
    $('#back-btn').show();
    $('#fav-btn').hide();    

    for (i in favs){     
      var giphDiv = $('<div>');
      giphDiv.append(favs[i]);
      $('#favorites').prepend(giphDiv);      
    }   
  }

  function toggleAndShowMain(){
    $('#giphy-view').show();    
    $('#back-btn').hide();
    $('#fav-btn').show();
    $('#favorites').hide();
    $('#container-header').html('');
    $('#clear-btn').show();    
  }
  
  function clearStage(){  
    $('#clear-btn').hide();  
    $('#giphy-view').empty();   
  }

  //TODO I have no clue on how to download. 
  //https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_.22tainted.22_canvas.3F
  //See let options =
  //!Important. Stumbled upon https://cors-image-example.glitch.me/
  //Stealing coding ideas may happen...I found canvas2image.js as a possible solution if I can't write it myself.     
 let downloadedImg;
  function downloadImage() {              
        // console.log($(this).parents('.giphy-div').children().eq(0).attr('src'));    
               
        let imageURL = $(this).parents('.giphy-div').children().eq(0).attr('src');
       
        downloadedImg = new Image;
      
        // Request cross-origin access        
        downloadedImg.crossOrigin = 'Anonymous'; 
        downloadedImg.addEventListener('load', imageReceived, false);
        downloadedImg.src = imageURL;       

  }

  function imageReceived() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');  
    // Adjust the canvas size to match the received image
    
    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;
        
    // Draw the received image into the canvas and insert the
    // canvas onto the DOM.    
    context.drawImage(downloadedImg, 0, 0);
    $('#giphy-view').append(canvas);
    // Construct the <a> link for a download attribute

    let dataUrl = canvas.toDataURL();
    // console.log(dataUrl);
    
    var a = $('<a>').attr('href', dataUrl).attr('download', 'downloaded-img').appendTo('body');
    a[0].click();
    a.click();
    a.remove();
    //FINALLY, bitches. That was crazy! Max and Trevor and Sepideh, is that really in our HW? 
    // try {
    //   localStorage.setItem('saved-image-canvas', canvas.toDataURL('image/png'));      
    // }
    // catch(err) {
    //   console.log('Error: ' + err);
    // }    
  }

  // Function for displaying giphy data
  function renderButtons() {

    // Clearing the giphy's on screen prior to adding new ones
    // (this is necessary otherwise we will have repeat buttons)
    $('#buttons-view').empty();

    // Looping through the array of giphys
    for (i in giphyArray) {
      var appendButton = $('<button>');
      appendButton.addClass('gif-btn');
      appendButton.attr('data-name', giphyArray[i]);
      appendButton.text(giphyArray[i]);
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
  $(document).on('click', '#clear-btn', clearStage);
  $(document).on('mouseenter', '.gif-img', hoverEnterState);
  $(document).on('mouseleave', '.gif-img', hoverExitState);
  $(document).on('click', '#btn-favorite', addToFavorites);
  $(document).on('click', '#download-img', downloadImage);
  $(document).on('click', '#fav-btn', toggleForAndShowFavorites);
  $(document).on('click', '#back-btn', toggleAndShowMain);


  // Calling the renderButtons function to display the initial buttons
  renderButtons();




});