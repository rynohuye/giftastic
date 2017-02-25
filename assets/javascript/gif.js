//take dog breed "topics" array for buttons already on the DOM
var topics = ["Yorkshire Terrier", "Great Dane", "Rottweiler", "Shih Tzu", "Siberian Husky", "Poodle", "Labrador Retriever", "German Shepard", "Golden Retriever", "Beagle", "Boxer", "Pug", "Border Collie", "Chihuahua", "Boston Terrier", "Australian Shepherd", "French Bulldog"];

//set attributes for buttons
var buttonMaker = function() {

    //create buttons for topics array
    for (var i = 0; i < topics.length; i++) {

        //space words out
        var spacedWords = topics[i].split(' ').join('+');

        //attributes for top buttons on screen
        var button = $('<button data-woof=' + spacedWords + '>').append(topics[i]);

        //give button a class to reference
        button.addClass('button');
        
        //appened to div
        $('#topButtons').append(button);
        
    }

    //user adds new dog breed
    $('#addPup').on('click', function() {

        //clear the buttons, to stop duplicates
        $('#topButtons').empty();
         
       //store new dog breed
        var newBreed = $('#doggie-input').val();

        //add to list through for loop
        for (i = 0; i < topics.length; i++) {
        
            //if breed already listed on page
            if (newBreed == topics[i]) {

               //replace it on the array
                topics.pop(newBreed);
            }
        }

        //adds new breed to the array
        topics.push(newBreed);

        //call buttonMaker function to add button with same attributes
        buttonMaker();

     });
  
    //function for when user clicks a button
    $('.button').on('click', function() {

        //create var to store the data from api
        var woof = $(this).data('woof');
        //console log
        console.log($(this).data('woof'));
        
        //use api key to search the api with the var dog 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + woof + "&api_key=dc6zaTOxFJmzC&limit=10";

        //use ajax to get the data from the api
         $.ajax({
            url: queryURL,
            method: 'GET'
            })

        //ajax response
        .done(function(response) {

            //console log object returned
            console.log(response);

            //set response to results var
            var results = response.data;

            //remove previous gifs
            $('#dogs').empty();

                //display all 10 gifs
                for (var i = 0; i < results.length; i++) {

                    //create div
                    var dogDiv = $('<div>');

                    //create p tag
                    var p = $('<p>');

                    //set rating to results
                    var rating = results[i].rating;

                        //some gifs don't have ratings, have p tag state not rated
                        if (rating == ''){

                            p.text("Not rated");
                        }
                        else {
                            p.text("Rating: " + rating);
                        }

                    //create img tag    
                    var dogImage = $('<img>');

                    //add attribute source
                    dogImage.attr("src", results[i].images.
                        fixed_height_small_still.url);

                    //add attribute still image from api
                    dogImage.attr("data-still", results[i].images.
                        fixed_height_small_still.url);

                    //add attribute active image from api
                    dogImage.attr("data-active", results[i].images.
                        fixed_height_small.url);

                     //append rating
                    dogDiv.append(p);

                    //append dogImage to the div
                    dogDiv.append(dogImage);

                    //prepend #dogs
                    $('#dogs').prepend(dogDiv);
                        
                }

            //click to animate gifs  

            $('img').on('click', function(e){

                console.log(e);

                //use a default var to set gif to still
                var state = e.currentTarget.dataset.still;

                //create var to create animate option
                var active = e.currentTarget.dataset.active;

                //create var to create a still option
                var still = e.currentTarget.dataset.still;
                //if statement to change status
                  if (state == still) { 
                   
                   //switch to active URL
                   $(this).attr('src', active);

                   //set current
                   current = active;

                }
                
                else {

                    //Switch to still URL
                    $(this).attr('src', still);

                    //Set current
                    current = still;
                }
                
            })

            })

        });
};

//Start the app
buttonMaker();