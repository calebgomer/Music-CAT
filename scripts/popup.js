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

var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
  if (msg.question == "Who's there?")
    port.postMessage({answer: "Madame"});
  else if (msg.question == "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
});

// chrome.runtime.onConnect.addListener(function(port) {
//   // console.assert(port.name == "knockknock");
//   port.onMessage.addListener(function(msg) {
//     if (msg.joke == "Knock knock") {
//       port.postMessage({question: "Who's there?"});
//     } else if (msg.answer == "Madame") {
//       port.postMessage({question: "Madame who?"});
//     } else if (msg.answer == "Madame... Bovary") {
//       port.postMessage({question: "I don't get it."});
//     }
//   });
// });
