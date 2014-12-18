var songs, albums, artists;

$(document).ready(function () {

    $.getJSON("data/music.json", function (data) {
        console.log(data);

        songs = data.music;
        albums = data.albums;
        artists = data.artists;
        for (var i = 0; i < data.music.length; i++) {
            $("#songlist").append("<ul> <li data-index='" + i + "'><h2>" + data.music[i].track + "</h2></li>" + "<ul><li data-index='" + i + "'><h3>" + data.music[i].artist + "</h3></li></ul>" + "<ul id='descHide'><li data-index='" + i + "'>" + data.music[i].album + "</li>" + "<li data-index='" + i + "'>" + data.music[i].information + "</li>" + "<li data-index='" + i + "'>" + data.music[i].genre + "</li>" + "<li data-index='" + i + "'><img src='" + data.music[i].picture + "' class='img-responsive'/></li></ul>" + "</ul>");
        }
        //sets up click event to list songs when the songs item in nav is clicked
        $("#songsnav").click(function () {
            for (var i = 0; i < data.music.length; i++) {
                $("#songs").append("<ul> <li data-index='" + i + "'><h3>" + data.music[i].track + " by " + data.music[i].artist + "</h3></li></ul>");
            }
            $("#songs li").click(function () {
                $("#albums").html('');
                var clickedItem = $(this);
                var index = clickedItem.data("index");
                var song = songs[index];
                $("#nowplaying").html("<h3>" + song.track + " by " + song.artist + "</h3>");


                var myAudio = document.querySelector("#myAudio");
                myAudio.src = song.source;
                myAudio.addEventListener('canplay', function (event) {
                    myAudio.play();
                });
                myAudio.load();

            });
        });
//        $("#artistnav").click(function () {
//
//        }
        //sets up click event to list albums when the albums item in nav is clicked
        $("#albumsnav").click(function () {
            $("#songs").html('');
            for (var i = 0; i < data.albums.length; i++) {
                $("#albums").append("<ul><li><img src='" + albums.picture + "' class='img-responsive' alt='album art'/><h3>" + albums.title + " by " + albums.artist + "</h3></li></ul>");
            }
//            $("#albums li").click(function () {
//
//                var clickedItem = $(this);
//                var index = clickedItem.data("index");
//                var song = songs[index];
//                $("#nowplaying").html("<h3>" + song.track + " by " + song.artist + "</h3>");
//
//
//                var myAudio = document.querySelector("#myAudio");
//                myAudio.src = song.source;
//                myAudio.addEventListener('canplay', function (event) {
//                    myAudio.play();
//                });
//                myAudio.load();
//
//            });
        });
    })


});
