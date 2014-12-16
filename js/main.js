var music;
var artists;
//template variables go below
var genreLinkTemplate;

$(document).ready(function () {
    //get references to dom elements
    var contentDiv = $("#content");
    var resultsDiv = $("#searchResults");
    var genreDiv = $("#genres");
    var albumDiv = $("#albumInfo");
    var artistDiv = $("#artistInfo");
    var myAudio = $("#myAudio");

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

            //store data
            music = data[0].music;
            
            //append starting state
            genreDiv.html(genreLinkTemplate(data[0].genres));
        });

    $("#content").on("click", ".albumLink", function(){
        //'this' is the thing that was clicked
        //we can get anything with the data - on the
        var albumId = $(this).data('id');
        //get the album obj using underscore to find the right result
        var albumInfo = _.findWhere(albums,{id: albumId});

        console.log(albumInfo);
        //using the template , add the album info Div
        albumInfoDiv.html(albumInfoTemplate(albumInfo) );


    });

    //whenever a genre link is clicked
    $("#container").on("click", ".genreLink", function(){
        //this textual name we are looking for
        var genreToFind = $(this).html();

        //an object to hold the results
        var results = {};

        //put the results into the albums property of an object
        results.albums = _.where(albums,{genre: genreToFind});

        //use the home template to show our results
        browseDiv.html(albumLinkTemplate( results) );

    });
    
    //search field
    $("#btnSearch").click(function(){
        var searchTerm = $("#textSearch").val();

        var results = {};

        //will only search title
        //will only search exact match names
        results.album = _.filter(album, function(item){
            return (item.title.toUpperCase().indexOf(searchTerm.toUpperCase())!= -1);
        })
        browseDiv.html(albumLinkTemplate(results));
    })

})