$(document).ready(function () {

    /**
     * Declarations
     */

    var app = {
        name: "GifTastic",
        theme: "cartoons",
        //topics: ["Simpsons", "Flinstones", "Family Guy", "South Park", "Looney Toons", "Spongebob", "Ninja Turtles", "Futurama", "Powerpuff Girls", "Animaniacs", "Tom & Jerry", "Pinky and the Brain", "Pokemon", "Rugrats", "Jetsons", "Scooby-Doo", "DuckTales", "Inspector Gadget", "Thundercats", "He Man"]
        topics: ["Simpsons", "Flinstones", "Family Guy", "South Park", "Looney Toons", "Spongebob", "Ninja Turtles", "Futurama", "Powerpuff Girls", "Animaniacs"]
    } // Used second topics property to limit initial buttons to 10 to keep page clean


    /**
     * Application
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
            .attr("data-value", buttonText)
            .attr("data-clicks", "0");

        $("#buttons").append(button);
    }

    // Makes request to Giphy API
    function getGiphy() {
        var searchString = $(this).attr("data-value");
        var clickString = $(this).attr("data-clicks");
        var clickNumber = parseInt(clickString);
        var queryUrl = getQueryUrl(searchString, clickNumber);

        // This click tracker uses Giphy API's pagination to retrieve a unique set of gifs to display to the user
        clickNumber++;
        clickString = clickNumber.toString();

        $(this).attr("data-clicks", clickString);

        updateSearchBar();

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
    function getQueryUrl(search, offset) {
        var apiKey = "nww7lWBSlBLoaPULkE2UKk8RQP8xyQgm";
        var endpoint = "http://api.giphy.com/v1/gifs/search";
        var limit = 10;

        var url = endpoint +
            "?api_key=" + apiKey +
            "&q=" + search +
            "&limit=" + limit;

        // If get-giphy button clicked more than once, pass offset to Giphy
        if (offset !== 0) {
            offset = offset * limit;
            url = url + "&offset=" + offset;
        }

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

        var h = $("<h6>");
        var title = object.title;

        rating = rating.toUpperCase();

        div.addClass("gif-container");

        img.attr("src", still)
            .addClass("gif-image")
            .attr("alt", search)
            .attr("data-state", "still")
            .attr("data-still", still)
            .attr("data-animate", animate);

        h.text(title);
        p.text("Rated: " + rating);

        div.append(img)
            .append(h)
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

    // Updates CSS in the search area to make room for gifs to populate
    function updateSearchBar() {
        $("#outer").css("min-height", "50vh")
            .css("transition", "min-height 0.5s ease");

        $("#input-container-inner").css("height", "50px")
            .css("transition", "height 0.5s ease");

        $("label").css("margin-bottom", "10px")
            .css("transition", "margin-bottom 0.5s ease");
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