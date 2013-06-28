document.addEventListener('DOMContentLoaded', function () {
  setTitle("Meow All Day");
  setArtist("The Kittens");
  setAlbum("Becoming a Cat");
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