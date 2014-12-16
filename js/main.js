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

            //store data
            music = data[0].music;

            genreDiv.html(genreLinkTemplate(data[0].genres));
        });
    //search field
    $("#btnSearch").click(function(){
        var searchTerm = $("#textSearch").val();

        var results = {};

        //will only search title
        //will only search exact match names
        results.books = _.filter(books, function(item){
            return (item.title.toUpperCase().indexOf(searchTerm.toUpperCase())!= -1);
        })
        browseDiv.html(bookLinkTemplate(results));
    })

})