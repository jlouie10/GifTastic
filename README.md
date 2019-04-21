# GifTastic
A dynamic web page that populates with gifs of my choice. This application demonstrates the ability to 

# Cartoons Gif Generator
Click a cartoon tab to generate a set of gifs based on that cartoon. Don't see your favorite cartoon? Search for it in the search bar and generate a set of your favorite cartoon's gifs.

Special Features: 
* Modern and responsive design
* Displays gif title and rating
* Awesome transition effects to resize search section after gifs are generated
* Unique set of gifs each time a tag is clicked

# Screenshots

# What's New
* Integrated Giphy API
* Response is parsed and populates images and ratings
* Introduced array of topics that populates buttons when app is loaded
* Populates 10 gifs when a topic button is clicked
* Gifs load as still images until clicked
* Clicking a gif will toggle its still/animated versions
* New button created when a topic is searched
* New search layout
* Transition effect when loading gifs for the first time
* More mobile responsive
* Added title to each gif
* Updated endpoint to use HTTPS

# Instructions
Add more cartoons by searching for them in the search bar. A new tag will be created, and clicking on it (or any existing tags) will populate 10 random gifs. Clicking the tag again will generate a new set of gifs for that topic. 

The app will load with 10 default cartoons, but you can uncomment the larger array in the source code. This was modified to de-clutter the interface.

Click a gif to toggle it to play. Click again to stop it.

Add as many gifs as you want.

# Issues ([Feature], [Bug])
[Feature] Add limit when gifs loaded is greater than total gifs on Giphy
[Bug] All titles appear to be lowercase
[Bug] Long titles push gif container wider than image
[Feature] Add download button (not working)
[Feature] Integrate with OMDB to produce additional metadata
[Feature] Add favorites button
[Feature] Add button to animate all
[Feature] Add button to stop all
[Feature] Add layout for gif section (identify a solution that doesn't show as much white space, avoid justify-content)
[Feature] Improve searched layout
[Feature] Dark background for gif section

# References
* Page template inspiration
    * https://colorlib.com/wp/free-css3-html5-search-form-examples/
* Fix for spacing in last row of flexbox layout
    * https://stackoverflow.com/questions/18744164/flex-box-align-last-row-to-grid
