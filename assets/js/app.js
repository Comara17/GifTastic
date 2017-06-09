//Preset string values for the ten buttons on the page
var queries = ["Horror", "Thriller", "Comedy", "Animated", "Romance", "Sci-Fi", "Action", "Kids", "Drama", "Documentary"];

//Creates a button for each queries[] value, appends to buttons panel

for (var i = 0; i < queries.length; i++) {
	var gifButton = $("<button>");
	$(gifButton).addClass("btn btn-primary btn-lg gifButton");
	$(gifButton).data("name", queries[i]);
	$(gifButton).text(queries[i]);
	$("#buttons").append(gifButton);
}
//On click function that ajax calls for whatever the text value of the button clicked is
$(document).on("click", ".gifButton", function() {

	var option = $(this).text();
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + option + "&limit=12&rating=pg&offset12&api_key=dc6zaTOxFJmzC";
	console.log(option);

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (response) {

		$(".imageSection").empty();

		var result = response.data;
		//For each gif loaded from the API, assign it a div, give it a rating, and put the image inside the the div.
		for (var i = 0; i < result.length; i++) {

			var imageContainer = $("<div>")
				.addClass("imageContainer");

			var imageDiv = $("<div>")
				.addClass("imageBox");

			var rating = $("<p>")
				.text(result[i].rating)
				.addClass("ratingFont");

			var gif = $("<img>")
				.attr("src", result[i].images.fixed_height_still.url)
				.data("animated", result[i].images.fixed_height.url)
				.data("still", result[i].images.fixed_height_still.url)
				.attr("data-state", "still");
			//Append the image divs to a panel below the button panel
			imageContainer.append(rating);
			imageContainer.append(gif);
			imageDiv.append(imageContainer);
			$(".imageSection").prepend(imageDiv);

		}
		//This function changes the src from still to animated using data states
		$("img").click( function() {

			var state = $(this).attr("data-state"); 
			if (state == "still") {
				$(this).attr("src", $(this).data("animated"));
				$(this).attr("data-state", "animated");
			} else {
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");
			}      
		});
	});
});
//Adds a new button based on the input value of the category form
var addButton = function () {
	var categoryValue = $("#gifForm").val().trim();
	console.log(categoryValue);
	var newButton = $("<button>");
	$(newButton).addClass("btn btn-primary btn-lg gifButton");
	$(newButton).attr("id", "newButton");
	$(newButton).data("name", categoryValue);
	$(newButton).text(categoryValue);
	$("#buttons").append(newButton);
};
//When the submit button is pressed, the new button appears
$("#submit").click(function () {
	event.preventDefault();
	addButton();
});

	






                  
                  
                  
                  
