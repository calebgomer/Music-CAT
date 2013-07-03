var IS_NOTIFICATION = 0;

document.addEventListener('DOMContentLoaded', function () {
  contentLoaded();
});

function contentLoaded(){
  setTitle("No Music Playing");
  setArtist("You should play a song");
  setAlbum("");
  setProgress("0:00","0:00");

  registerButtonListeners();
  updateCurrentSong();
}

var LEFT = 37;
var SPACE = 32;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;
document.onkeyup=function(e){
    console.log(e.keyCode);
  switch(e.keyCode) {
    case LEFT:
      prev();
      break;

    case RIGHT:
      next();
      break;

    case SPACE:
      play();
      break;

    case UP:{
	if(currentData.thumbsDownStatus==='selected'){
	    thumbsDown();
	} else {
	    thumbsUp();
	}
      break;
    };

    case DOWN:{
     	if(currentData.thumbsUpStatus==='selected'){
	    thumbsUp();
	} else {
	    thumbsDown();
	}
      break;
    };
  }
}

function registerButtonListeners() {
  $('#prev').click(function() {
    prev();
  });
  $('#play').click(function() {
    play();
  });
  $('#next').click(function() {
    next();
  });
  $('#shuffle').click(function() {
    shuffle();
  });
  $('#repeat').click(function() {
    repeat();
  });
  $('#thumbsUp').click(function(){
    thumbsUp();
  });
  $('#thumbsDown').click(function(){
    thumbsDown();
  });
  $('#settings').click(function(){
    openSettings();
  });
  $('#progress_container').click(function(event){
    console.log(event.clientX);
    console.log(document.getElementById("progress_container").offsetWidth);
    console.log(100*event.clientX/document.getElementById("progress_container").offsetWidth);
    sendPercent(100*event.clientX/document.getElementById("progress_container").offsetWidth);
  });
}

// change to find the music tab insta
var musicTab;
function findMusicTab(callback) {
  if (musicTab) {
    return callback(musicTab);
  }
  chrome.tabs.query({url:'https://play.google.com/music/*'}, function(tabs) {
    if (tabs.length > 0) {
      musicTab = tabs[0];
      return callback(musicTab);
    } else {
      chrome.tabs.create({'url': 'https://play.google.com/music/listen#now'}, function(tab) {
        musicTab = tab;
        return callback(musicTab);
      });
    }
  });
} 
function openSettings(){
  $('body').load("options.html",function(){
    //console.log("RETURN BUTTON",$('#return'));
    $('#return').click(function(){
      openMain();
    });
  });
}
function openMain(){
  //console.log("OPEN MAIN");
  $('body').load("popup.html",function(){
    contentLoaded();
  });
}
function sendMessage(msg, callback) {
  findMusicTab(function(tab) {
    chrome.tabs.sendMessage(tab.id, msg, callback);
  })
}
function sendAction(action, callback) {
  sendMessage({action: action}, callback);
}
var currentData;
var first = true;
function updateCurrentSong() {
  sendAction('getSongInfo', function(data) {
    updateCurrentSongWithData(data);
    currentData=data;
    if(first){first=false; setupMarquees();}
  });
}
function updateCurrentSongWithData(data) {
  if (!data) {
    return;
  }
  // console.log(data);
  if (data.status === 'playing') {
    $('#play').attr('src','images/pause.png');
  } else {
    $('#play').attr('src','images/play.png');
  }
  // console.log(data.shuffleStatus);
  if (data.shuffleStatus === 'ALL_SHUFFLE') {
    $('#shuffle').attr('src','images/shuffleOn.png');
  } else {
    $('#shuffle').attr('src','images/shuffle.png');
  }
  if (data.repeatStatus === 'NO_REPEAT') {
    $('#repeat').attr('src','images/repeat.png');
  } else if (data.repeatStatus === 'LIST_REPEAT') {
    $('#repeat').attr('src','images/repeatList.png');
  } else if (data.repeatStatus === 'SINGLE_REPEAT') {
    $('#repeat').attr('src','images/repeatOne.png');
  }
  if(data.thumbsUpStatus === 'selected') {
      $('#thumbsUp').attr('src','images/positiveOn.png');
  } else {
      $('#thumbsUp').attr('src','images/positive.png');
  }
  if(data.thumbsDownStatus === 'selected') {
      $('#thumbsDown').attr('src','images/negativeOn.png');
  } else {
      $('#thumbsDown').attr('src','images/negative.png');
  }
  setTitle(data.title);
  setArtist(data.artist);
  setAlbum(data.album);
  setAlbumArt(data.album_art);
  setProgress(data.progress, data.duration, data.status === 'playing');

// Use background html and javascript

  if(IS_NOTIFICATION){
      var notification = webkitNotifications.createHTMLNotification(
        'notification.html'  // html url - can be relative
      );  
      notification.show();
  }
}

function sendPercent(percent) {
  sendMessage({'scroll':percent});
}
function prev() {
  sendAction('prev', function(response) {
    updateCurrentSongWithData(response);
  });
}

function play() {
  sendAction('play', function(response) {
    updateCurrentSongWithData(response);
  });
}

function next() {
  sendAction('next', function(response) {
    updateCurrentSongWithData(response);
  });
}

function shuffle() {
  sendAction('shuffle', function(response) {
    updateCurrentSongWithData(response);
  });
}

function repeat() {
  sendAction('repeat', function(response) {
    updateCurrentSongWithData(response);
  });
}

function radio() {
  sendAction('radio', function(response) {
    updateCurrentSongWithData(response);
  });
}

function thumbsUp() {
  sendAction('thumbUp', function(response){
      updateCurrentSongWithData(response);
  });
}


function thumbsDown() {
  sendAction('thumbDown', function(response){
      updateCurrentSongWithData(response);
  });
}
function setArtist(artist) {
  $("#artist").text(artist);
}

function setTitle(title) {
  $("#title").text(title);
}

function setAlbum(album) {
  $("#album").text(album);
}

function setAlbumArt(art, local) {
  $("#album_art").attr('src',local?'':'https://'+art);
}

var progressTimeoutID;
var now;
var end;
function setProgress(progress, duration, playing) {
  clearTimeout(progressTimeoutID);
  $('#current_time').text(progress);
  $('#total_time').text(duration);
  
  var progSplit = progress.split(':');
  var durSplit = duration.split(':');
  // console.log(progSplit, '/', durSplit);
  now = parseFloat(progSplit[0])*60+parseFloat(progSplit[1]);
  end = parseFloat(durSplit[0]*60)+parseFloat(durSplit[1]);
  
  var p = Math.round((now/end)*100);
  var progressBar = document.getElementById('song_progress');
  progressBar.style.width=p+'%';
  var currentTime = document.getElementById('current_time');
  // currentTime.style.left=((p/100)*160)+'px';
  if (playing)
    progressTimeoutID = setTimeout(updateCurrentSong, 500);
}

// **warning** non-intuitive code below
function pad(num, size) {
  var s = num.toString();
  while(s.length < size) {
    s = "0"+s;
  }
  return s;
}
// **end-warning** non-intuitive code ended

var marqueeTimeoutID;
var marquees;
function setupMarquees(){
  var marqueeDivs=$('.marquee-container');
  var i;
  marquees=new Array();
  var hasMarquee=false;
  for(i=0;i<marqueeDivs.length; i++){
    var container=marqueeDivs[i];
    var j;
    var elements=container.getElementsByClassName("song_text");
    for(j=0; j < elements.length; j++) {
    	var text=container.getElementsByClassName("song_text")[j];
    	console.log(text.offsetWidth);
    	console.log(container.offsetWidth);
    	if(text.offsetWidth > container.offsetWidth){
		hasMarquee=true;
		marquees.push(text);
		break;
    	}
    	console.log(marquees);
    }
  }
  setTimeout(setupMarqueeInterval,1000);
}
function shiftMarqueeLeft(){
  var i;
  for( i = 0; i < marquees.length; i++){
    var text=marquees[i];
    text.style.left=(parseInt(text.style.left)-2)+"px";
    console.log(text.style.left);
    if(parseInt(text.style.left)+text.offsetWidth < text.parentNode.offsetWidth){
	clearInterval(marqueeTimeoutID);
	setTimeout(setupMarqueeInterval,1000);
    }
  }
}
function shiftMarqueeRight(){
  var i;
  for( i = 0; i < marquees.length; i++){
    var text = marquees[i];
    text.style.left=(parseInt(text.style.left)+2)+"px";
    if(parseInt(text.style.left) > 0){
      clearInterval(marqueeTimeoutID);
      setTimeout(setupMarqueeInterval,1000);
    }
  }
}
var direction="Left";
function setupMarqueeInterval(){
  var funcName;
  if(direction=="Left"){
      funcName=shiftMarqueeLeft;
      direction="Right";
  } else {
      funcName=shiftMarqueeRight;
      direction="Left";
  }
  marqueeTimeoutID=setInterval(funcName,100);
}

