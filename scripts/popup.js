document.addEventListener('DOMContentLoaded', function () {
  setTitle("Meow All Day");
  setArtist("The Kittens");
  setAlbum("Becoming a Cat");
  sendMessage();
});

function setArtist(artist) {
  document.getElementById("artist").innerText = artist;
}

function setTitle(title) {
  document.getElementById("title").innerText = title;
}

function setAlbum(album) {
  document.getElementById("album").innerText = album;
}

function setAlbumArt(art) {
  document.getElementById("album_art").src = art;
}

chrome.runtime.onConnect.addListener(function(port) {
  // console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "Knock knock") {
      port.postMessage({question: "Who's there?"});
    } else if (msg.answer == "Madame") {
      port.postMessage({question: "Madame who?"});
    } else if (msg.answer == "Madame... Bovary") {
      port.postMessage({question: "I don't get it."});
    }
  });
});
