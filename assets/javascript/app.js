$(document).ready(function () {

    /**
     * Declare Variables
     */

    var app = {
        name: "GifTastic",
        theme: "cartoons",
        topics: ["Simpsons", "Thundercats", "Tom and Jerry", "South Park", "Spongebob"]
    }


    /**
     * Run Application
     */

    getButtons();


    /**
     * Define Functions
     */

    // Populates topics array buttons
    function getButtons() {
        var i;

        for (i = 0; i < app.topics.length; i++) {
            createButtons(app.topics[i]);
        }
    }

    // Creates buttons
    function createButtons(buttonText) {
        var button = $("<button>");

        button.text(buttonText)
            .addClass("get-giphy")
            .attr("data-value", buttonText);

        $("#buttons").append(button);
    }

    // Makes request to Giphy API
    function getGiphy() {
        var searchString = $(this).attr("data-value");
        var queryUrl = getQueryUrl(searchString);

        // GET request
        $.get(queryUrl)
            .then(function (response) {
                var results = response.data;
                var i;

                for (i = 0; i < results.length; i++) {
                    parseGiphy(results[i], searchString);
                }
            });
    }

    // Concatenantes URL to pass additional parameters
    function getQueryUrl(search) {
        var apiKey = "nww7lWBSlBLoaPULkE2UKk8RQP8xyQgm";
        var endpoint = "http://api.giphy.com/v1/gifs/search";
        var limit = 10;

        var url = endpoint +
            "?api_key=" + apiKey +
            "&q=" + search +
            "&limit=" + limit;

        return url;
    }

    // Parses response and creates HTML elements
    function parseGiphy(object, search) {
        var div = $("<div>");
        var img = $("<img>");
        var p = $("<p>");
        var still = object.images.fixed_height_still.url;
        var animate = object.images.fixed_height.url;
        var rating = object.rating;

        div.addClass("gif-container")

        img.attr("src", still)
            .addClass("gif-image")
            .attr("alt", search)
            .attr("data-state", "still")
            .attr("data-still", still)
            .attr("data-animate", animate);

        p.text("Rating: " + rating);

        div.append(img)
            .append(p);

        $("#images").prepend(div);
    }

    // Updates the state of the gif from still to animate and back to still
    function updateGif() {
        var state = $(this).attr("data-state");
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");

        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
        else {
            console.log("Error");
        }
    }


    /**
     * Events
     */

    $("#add-topic").on("click", function (event) {
        event.preventDefault();

        var newTopic = $("#gif-input").val().trim();

        // Only push and create button if input has a value
        if (newTopic !== "") {
            app.topics.push(newTopic); // Not sure if this is necessary, topics array serves no added purpose other than populating initial buttons
            createButtons(newTopic);

            // Clear previous search from input field
            $("#gif-input").val("");
        }
    });

    $(document).on("click", ".get-giphy", getGiphy);
    $(document).on("click", "img", updateGif);
});