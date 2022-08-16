var auxSignal1 = signal1;
var auxSignal2 = signal2;
var auxSignal3 = signal3;
var player;
var results;
$(document).ready(function() {    
    var auxIndex = 0;

    if(player) console.log(player);    
    signal1 = function() {
        var arrayLength = results.length;        
        auxIndex = auxIndex == arrayLength-1 ? 0 : auxIndex + 1;
        console.log(auxIndex);
        createVideo(results,auxIndex);        
        setTimeout(()=>{
            var vID = $('.active iframe').data('video-id');
            var playerID = $('.active iframe').attr('id');
            onYouTubeIframeAPIReady(vID, playerID);            
        }, 500);
        
    };
    signal2 = function() {
        var playStatus = player.getPlayerState();
        if(playStatus == 1) player.pauseVideo();
        else player.playVideo();
    };
    signal3 = function() {
        window.location.href = "/";        
    }    
    var aux = getParameterByName('keyWord');
    searchVideos(aux);
    setTimeout(()=>{
        createVideo(results,0);
    }, 500);
    setTimeout(()=>{
        var vID = $('.active iframe').data('video-id');
        var playerID = $('.active iframe').attr('id');
        onYouTubeIframeAPIReady(vID, playerID);        
    }, 600);
       
});
function searchVideos(word) {
    var wordToSearch = word
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + wordToSearch + "&key=AIzaSyAWdk_62xxj6bdzhnY_KTwiLBu3o2KN29o",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "6573c6d5-999e-9476-cdbf-cc6086a4d753"
        }
    }
    $.ajax(settings).done(function(response) {
        results = response.items;
    });
}
function createVideo(item,index){

    console.log('index:'+index);
    var html = "";
    $("#results").html("");
    html =
        '<div class="item-' + index + ' active " data-id="' + index + '">' +
        '<h2>' + item[index].snippet.title + '</h2>' +
        '<iframe class="video w100" width="100%" id="video-' + index + '" data-video-id="'+item[index].id.videoId+'" height="auto" src="//www.youtube.com/embed/' + item[index].id.videoId + '?enablejsapi=1&widgetid=1&autoplay=1" frameborder="0" allowfullscreen></iframe>' +
        '</div>';
    $("#results").html(html);
    resetVideoHeight();
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9 / 16);
}
 function onYouTubeIframeAPIReady(videoID, playerID) {
     console.log('videoID:'+videoID);
     console.log('playerID:'+playerID);
    player = {};
    player = new YT.Player(playerID, {
        videoId: videoID,
        events: {
            'onReady': onPlayerReady,        
        }
    });
 }
 function onPlayerReady(event) {
    event.target.playVideo();
  }