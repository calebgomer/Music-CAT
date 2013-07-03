chrome.runtime.onMessage.addListener(function(req, sender, res) {
    console.log("OWJER",req);
    if(req.scroll !== undefined){
	console.log(req.scroll);
	clickProgressBar(req.scroll);	
    }
  switch(req.action) {

    case 'prev':
      press('rewind');
      update(res);
      break;

    case 'play':
    case 'pause':
      press('play-pause');
      update(res);
      break;

    case 'next':
      press('forward');
      update(res);
      break;

    case 'repeat':
      press('repeat');
      update(res);
      break;

    case 'shuffle':
      pressShuffle('shuffle');
      update(res);
      break;

    case 'radio':
      update(res);
      break;
    case 'thumbUp':
      pressThumb('Thumbs up');
      update(res);
      break;

    case 'thumbDown':
      pressThumb('Thumbs down');
      update(res);
      break;
    // just asking for song info
    case 'getSongInfo':
      // send res current song info/status/progress/etc.
      update(res);
      break;
  }
});

function press(button, callback) {
  $("button[data-id='"+button+"']").click();
}
function pressShuffle(button){
  $("button[data-id='"+button+"'][class='flat-button']").click();
}

function pressThumb(button) {
    var dummy = $("li[title='"+button+"']");
    $("li[title='"+button+"']").click();
}

function update(callback) {

  callback({
    status: $("button[data-id='play-pause']").attr('title') === 'Play' ? 'paused' : 'playing',
    title: $('#playerSongTitle').text(),
    artist: $('#player-artist').text(),
    album: $('.player-album')[0].innerText,
    album_art: $('#playingAlbumArt').attr('src'),
    progress: $('#time_container_current').text(),
    duration: $('#time_container_duration').text(),
    shuffleStatus: $("button[data-id='shuffle'][class='flat-button']").attr('value'),
    repeatStatus: $("button[data-id='repeat']").attr('value'),
    thumbsUpStatus: $("li[title='Thumbs up']").attr('class'),
    thumbsDownStatus: $("li[title='Thumbs down']").attr('class')
  });
}

function triggerMouseEvent(element, eventname){
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent(eventname, true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, element);
    element.dispatchEvent(event);
}
function clickProgressBar(percent){
  var element=document.getElementById("slider");
  console.log(element.offsetWidth);
  var width=element.offsetWidth;
  var image = $('#playingAlbumArt')[0];
  console.log(image);
  console.log(image.offsetWidth);
  var offset = image.offsetWidth/* * percent / 100*/;
  var x =offset+ (width * percent / 100);
  var eventname="mousedown";
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent(eventname, true, true, document.defaultView, 1, x, 228, x, 228, false, false, false, false, 0, element);
  element.dispatchEvent(event);

}

