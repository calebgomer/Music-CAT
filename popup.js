document.addEventListener('DOMContentLoaded', function () {
  setTitle("Meow");
  setArtist("The Kittens");
});

function setArtist(artist) {
  document.getElementById("artist").innerText = artist;
}

function setTitle(title) {
  document.getElementById("title").innerText = title;
}

function setAlbumArt(art) {
  document.getElementById("album_art").src = art;
}