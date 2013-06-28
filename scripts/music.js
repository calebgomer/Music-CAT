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
      // press radio button
      // no clue what happens next
      break;

    // just asking for song info
    case 'getSongInfo':
      // send res current song info/status/progress/etc.
      res({
        status: $("button[data-id='play-pause']").attr('title') === 'Play' ? 'paused' : 'playing',
        title: $('#playerSongTitle').text(),
        artist: $('#player-artist').text(),
        album: $('.player-album')[0].innerText,
        album_art: $('#playingAlbumArt').attr('src'),
        progress: $('#time_container_current').text(),
        duration: $('#time_container_duration').text()
      });
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
    duration: $('#time_container_duration').text()
  });
}