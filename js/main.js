var songs;
var show;

$(document).ready(function () {

    $.getJSON("data/music.json", function (data) {
        console.log(data);

        songs = data.music;

        for (var i = 0; i < data.music.length; i++) {
            $("#songlist").append("<ul> <li data-index='" + i + "'><h2>" + data.music[i].track + "</h2></li>" + "<ul><li data-index='" + i + "'><h3>" + data.music[i].artist + "</h3></li></ul>" + "<ul id='descHide'><li data-index='" + i + "'>" + data.music[i].Album + "</li>" + "<li data-index='" + i + "'>" + data.music[i].Date + "</li>" + "<li data-index='" + i + "'>" + data.music[i].Desc + "</li>" + "<li data-index='" + i + "'>" + data.music[i].Genre + "</li>" + "<li data-index='" + i + "'>" + data.music[i].picture + "</li></ul>" + "</ul>");
        }
        //sets up click event to list songs when the songs item in nav is clicked
        $("#songsnav").click(function () {
            for (var i = 0; i < data.music.length; i++) {
                $("#songs").append("<ul> <li data-index='" + i + "'><h3>" + data.music[i].track + " by " + data.music[i].artist + "</h3></li></ul>");
            }
            $("#songs li").click(function () {

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


    })


});
