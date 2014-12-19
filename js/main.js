var songs, albums, artists, genres;

$(document).ready(function () {
    //loads in data
    $.getJSON("data/music.json", function (data) {
        //gets references to variables used from data
        songs = data.music;
        albums = data.albums;
        genres = data.genres;
        artists = data.artists;

        // Loading all songs by default
        for (var i = 0; i < data.music.length; i++) {
            var songIndex = i;
            $("#songs ul.data").append("<li data-song='" + songIndex + "' class='song'>" + data.music[i].track + " by " + data.music[i].artist + "</li>");
        }
        //adds active class so content is visible
        $("#content #songs").addClass('active');


        //sets up click event to list songs when the songs item in nav is clicked
        $("#songsnav").click(function () {
            //removes active class to hide prior content
            $("#content .results.active").removeClass('active');

            //loops through songs and appends to the data ul in #songs
            for (var i = 0; i < data.music.length; i++) {
                var songIndex = i;
                $("#songs ul.data").append("<li data-song='" + songIndex + "' class='song'>" + data.music[i].track + " by " + data.music[i].artist + "</li>");
            }
            //adds active class so content is visible
            $("#content #songs").addClass('active');
        });


        //sets up click event to list albums when the albums item in nav is clicked
        $("#albumsnav").click(function () {
            //removes active class to hide prior content
            $("#content .results.active").removeClass('active');

            //loops through albums
            for (var i = 0; i < data.albums.length; i++) {
                var albumtitle = albums[i].title;
                var tracklist = '';
                //loops through tracks to find a match for album name
                for (var k = 0; k < songs.length; k++) {
                    var songIndex = k;
                    if (songs[k].album === albumtitle) {
                        tracklist = tracklist + "<li data-song='" + songIndex + "' class='song'>" + songs[k].track + "</li>";
                    }
                }
                //appends album data and track list to the data ul
                $("#albums ul.data").append("<li class='row'><div class='col-sm-4 side'><img src='" + albums[i].picture + "' class='img-responsive' alt='album art'/></div><div class='col-sm-8'><h3>" + albums[i].title + " by " + albums[i].artist + "</h3><ul>" + tracklist + "</ul></div></li>");
            }
            //adds active class so content is visible
            $("#content #albums").addClass('active');
        });


        //sets up click event to list genres when genres item in nav is clicked
        $("#genresnav").click(function () {
            //removes active class to hide prior content
            $("#content .results.active").removeClass('active');

            //loops through genres
            for (var i = 0; i < genres.length; i++) {
                var genretitle = genres[i];
                var tracklist = '';
                //loops through tracks to find match for genre
                for (var k = 0; k < songs.length; k++) {
                    var songIndex = k;
                    if (songs[k].genre === genretitle) {
                        tracklist = tracklist + "<li data-song='" + songIndex + "' class='song'>" + songs[k].track + "</li>";
                    }
                }
                //appends genre data and track list to the data ul
                $("#genres ul.data").append("<li class='row'><div class='col-sm-4 side'><h3>" + genretitle + "</h3></div><div class='col-sm-8'><ul>" + tracklist + "</ul></div></li>");
            }
            //adds active class so content is visible
            $("#content #genres").addClass('active');
        });


        //sets up click event to list artists when artists item in nav is clicked
        $("#artistnav").click(function () {
            //removes active class to hide prior content
            $("#content .results.active").removeClass('active');

            //loops through artists
            for (var i = 0; i < artists.length; i++) {
                var artistname = artists[i].name;
                var tracklist = '';
                //loops through tracks to find match for artists
                for (var k = 0; k < songs.length; k++) {
                    var songIndex = k;
                    if (songs[k].artist === artistname) {
                        tracklist = tracklist + "<li data-song='" + songIndex + "' class='song'>" + songs[k].track + "</li>";
                    }
                }
                //appends artist data and track list to data ul
                $("#artists ul.data").append("<li class='row'><div class='col-sm-4 side'><h3>" + artistname + "</h3><p>" + artists[i].bio + "</p></div><div class='col-sm-8'><ul>" + tracklist + "</ul></div></li>");
            }
            //adds active class so content is visible
            $("#content #artists").addClass('active');
        });


        // Playing a song function and onclick trigger
        $(".data").on("click", ".song", function () {
            playSong($(this).attr("data-song"));
            //removes playing class from all songs
            $(".song").removeClass("playing");
            //except adds to selected song
            $(this).addClass("playing");
        });
        //plays song and changes now playing info based upon song selected
        function playSong(index) {
            var thesong = songs[index];

            $("#nowplaying").html("<h3>" + thesong.track + " by " + thesong.artist + "</h3>");

            var myAudio = document.querySelector("#myAudio");
            myAudio.src = thesong.source;
            myAudio.addEventListener('canplay', function (event) {
                myAudio.play();
            });
            myAudio.load();
        }

        //search function
        $(".navbar-form").submit(function (e) {
            //removes active class to hide prior content
            $("#content .results.active").removeClass('active');
            //clears any prior search results
            $("#searchResults ul.data").html('');
            //takes value to search for and makes all lower case
            var searchval = $("input", this).val();
            var searchstr = searchval.toLowerCase();
            //loops through songs
            for (var i = 0; i < songs.length; i++) {
                var track = songs[i].track.toLowerCase();
                //to find matching result and then appends to results
                if (track.indexOf(searchstr) > -1) {
                    $("#searchResults ul.data").append("<li data-song='" + songIndex + "' class='song'>" + songs[i].track + " by " + songs[i].artist + "</li>");
                }
            }
            //adds styling to search term
            $("#content #searchResults h3 small").text(searchval);
            //adds active class so content is visible
            $("#content #searchResults").addClass('active');

            e.preventDefault();
            return false;
        });


    });


});
