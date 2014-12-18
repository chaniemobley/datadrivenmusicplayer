var music, artists, albums;
//template variables go below
var genreLinkTemplate, albumLinkTemplate, albumInfoTemplate, songLinksTemplate, audioTemplate;

$(document).ready(function () {
    //get references to dom elements
    var contentDiv = $("#content");
    var resultsDiv = $("#searchResults");
    var genreDiv = $("#genres");
    var albumDiv = $("#albumInfo");
    var artistDiv = $("#artistInfo");
    var nav = $("#navbar-collapse");
    var myAudio = document.querySelector("#myAudio");

    //
    //waits for all the functions in the argument list to finish before doing the 'done' half
    $.when(
            $.ajax("components/components.html"), //load in our component data
            $.getJSON("data/music.json") //load in our data data
        ).done(function (templateData, data) {

            //wrap the template content in the jquery object
            var templates = $(templateData[0]);

            //compile templates
            genreLinkTemplate = Handlebars.compile(templates.find("#genreLinks").html());
            albumLinkTemplate = Handlebars.compile(templates.find("#albumHomeLinks").html() );
            albumInfoTemplate = Handlebars.compile(templates.find("#albumInfo").html() );
            songLinksTemplate = Handlebars.compile(templates.find("#songLinks").html());
            audioTemplate = Handlebars.compile(templates.find("#audioSource").html());

            //store data
            music = data[0].music;
            
            //append starting state
            $("#controls").append(audioTemplate(data[0]));
            //contentDiv.html(songLinksTemplate(data[0]));
            $(nav).on("click", "#songsnav", function () {
                contentDiv.html(songLinksTemplate(data[0]));


            });
            $(nav).on("click", "#genresNav", function () {
                genreDiv.html(genreLinkTemplate(data[0].genres));
            });
            $(nav).on("click", "#albumsnav", function () {
                genreDiv.html(albumLinkTemplate(data[0]));
            });
        });

    //myAudio.src = $("#myaudiosrc");
    $(contentDiv).on("click", ".songLinks", function () {
        //'this' is the thing that was clicked
        //we can get anything with the data
        var songId = $(this).data('id');
        //get the album obj using underscore to find the right result
        var songPlay = _.findWhere(albums, {id: songId});

        console.log(myAudio.src);
        //using the template , add the album info Div
//     albumDiv.html(albumInfoTemplate(albumInfo) );


    });

    //whenever a genre link is clicked
    /* $("#container").on("click", ".genreLink", function(){
     //this textual name we are looking for
        var genreToFind = $(this).html();

        //an object to hold the results
        var results = {};

        //put the results into the albums property of an object
        results.albums = _.where(albums,{genre: genreToFind});

        //use the home template to show our results
        resultsDiv.html(albumLinkTemplate(results));

     });*/

    //search field
    /*$("#btnSearch").click(function(){
     var searchTerm = $("#textSearch").val();

        var results = {};

        //will only search title
        //will only search exact match names
        results.music = _.filter(music, function (item) {
            return (item.title.toUpperCase().indexOf(searchTerm.toUpperCase())!= -1);
        });
        resultsDiv.html(songLinksTemplate(results));

     })*/

})