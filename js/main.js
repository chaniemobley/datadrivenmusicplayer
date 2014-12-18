var songs;
var show;
var playPause = $("#playPause");
var play = $("#play");
var pause = $("#pause");
var back = $("#back");
var forw = $("#forward");
var res = $("#resultsArea");

$(document).ready(function () {

    $.getJSON("json/data.json", function (data) {
        console.log(data);

        songs = data.music;

        for (var i = 0; i < data.music.length; i++) {
            $("#listAll").append("<ul> <li data-index='" + i + "'><h2>" + data.music[i].track + "</h2></li>" + "<ul><li data-index='" + i + "'><h3>" + data.music[i].artist + "</h3></li></ul>" + "<ul id='descHide'><li data-index='" + i + "'>" + data.music[i].Album + "</li>" + "<li data-index='" + i + "'>" + data.music[i].Date + "</li>" + "<li data-index='" + i + "'>" + data.music[i].Desc + "</li>" + "<li data-index='" + i + "'>" + data.music[i].Genre + "</li>" + "<li data-index='" + i + "'>" + data.music[i].Pic + "</li></ul>" + "</ul>");
        }

        $("li").click(function () {

            var clickedItem = $(this);

            var index = clickedItem.data("index");
            var song = songs[index];
//console.log(song);

            $("#descArea").html("<div id='desc'>" + song.Pic + "<h2>" + song.Title + "</h2>" + "<p>" + song.Artist + " " + song.Album + " " + song.Date + " " + song.Genre + "</p>" + "<p>" + song.Desc + "</p>" + "</div>");


            var myAudio = document.querySelector("#audio");
            myAudio.src = song.Song;
            myAudio.addEventListener('canplay', function (event) {
                myAudio.play();
            });
            myAudio.load();

            playPause.click(function () {
                if (myAudio.paused == false) {
                    myAudio.pause();
                    if ((pause).hasClass('pauseOn')) {
                        (pause).removeClass('pauseOn').addClass('pauseOff');
                        (play).removeClass('playOff').addClass('playOn');
                    }

                } else {
                    myAudio.play();
                    if ((play).hasClass('playOn')) {
                        (play).removeClass('playOn').addClass('playOff');
                        (pause).removeClass('pauseOff').addClass('pauseOn');
                    }
                }
            });

            back.click(function () {
                index--;
                song = songs[index];
                myAudio.src = song.Song;
                $("#descArea").html("<div id='desc'>" + song.Pic + "<h2>" + song.Title + "</h2>" + "<p>" + song.Artist + " " + song.Album + " " + song.Date + " " + song.Genre + "</p>" + "<p>" + song.Desc + "</p>" + "</div>");
            });

            forw.click(function () {
                index++;
                song = songs[index];
                myAudio.src = song.Song;
                $("#descArea").html("<div id='desc'>" + song.Pic + "<h2>" + song.Title + "</h2>" + "<p>" + song.Artist + " " + song.Album + " " + song.Date + " " + song.Genre + "</p>" + "<p>" + song.Desc + "</p>" + "</div>");
            });


        });


    })


});
