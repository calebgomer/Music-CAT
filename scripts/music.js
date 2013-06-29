chrome.runtime.onMessage.addListener(function(req, sender, res) {
  console.log(req.action);
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
      press('shuffle');
      update(res);
      break;

    case 'radio':
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

function update(callback) {
  callback({
    status: $("button[data-id='play-pause']").attr('title') === 'Play' ? 'paused' : 'playing',
    title: $('#playerSongTitle').text(),
    artist: $('#player-artist').text(),
    album: $('.player-album')[0].innerText,
    album_art: $('#playingAlbumArt').attr('src'),
    progress: $('#time_container_current').text(),
    duration: $('#time_container_duration').text(),
    shuffleStatus: $("button[data-id='shuffle']").attr('value'),
    repeatStatus: $("button[data-id='repeat']").attr('value')
  });
}

function triggerMouseEvent(element, eventname){
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent(eventname, true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, element);
    element.dispatchEvent(event);
}

