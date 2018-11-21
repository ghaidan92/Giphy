var giphies = ["Fat Cats", "silicon valley", "catdog", "football clubs"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGiphyInfo() {

    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=Blrcz8hT52ksnp7KITVcbQnOjcNIBISI&limit=10";
    // var myKey = Blrcz8hT52ksnp7KITVcbQnOjcNIBISI;
    // http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
            console.log(response);
            var div = $("<div>");
            var rating = $("<p>");
            div.addClass("giphy-details");
            var gifUrl =  response.data[i].images.original_still.url;
            var gifUrlAnimated =  response.data[i].images.original.url;
            
            var gifRating = response.data[i].images.rating;
            rating.text("Rating: " + result[i].rating);
            var clip = $("<img>");
            // PAY ATTENTION HERE
            clip.attr("src", gifUrl);
            clip.attr("data-still", gifUrl);
            clip.attr("data-animated", gifUrlAnimated);
            clip.attr("data-state", "still");
            clip.attr("class", "images");
            rating.attr("src", gifRating);
            div.append(div, rating)
            div.append(rating, clip);
            $("#giphy-view").prepend(div);
        }



    });

}


function renderButtons() {


    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    for (var i = 0; i < giphies.length; i++) {


        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of giphy to our button
        a.addClass("giphy");
        // Added a data-attribute
        a.attr("data-name", giphies[i]);
        // Provided the initial button text
        a.text(giphies[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }

    
}

$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var giphy = $("#giphy-input").val().trim();

    // The movie from the textbox is then added to our array
    giphies.push(giphy);


    renderButtons();
   
    
});




$(document).on("click", ".giphy", displayGiphyInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
//PAY ATTENTION HERE
$(document).on("click", ".images", function(){
    var state = $(this).attr("data-state");
    var still = $(this).attr("data-still");
    var animated = $(this).attr("data-animated");
    if (state === "still"){
        $(this).attr("src", animated);
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }
})