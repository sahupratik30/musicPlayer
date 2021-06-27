//Globals
let isPlaying = false;
let songIndex = 0;
//DOM Elements
const image = document.getElementById("image");
const title = document.getElementById("title");
const artists = document.getElementById("artists");
const currentMusicTime = document.getElementById("current_time");
const totalDuration = document.getElementById("music_duration");
const music = document.getElementById("music");
const progressBar = document.getElementById("progress_bar");
const previous = document.getElementById("previous");
const play = document.getElementById("play");
const next = document.getElementById("next");
const progress = document.getElementById("progress_div");

//Declaring array of objects for storing songs data
const songs = [
  {
    image: "images/image1.jpg",
    title: "O Saki Saki",
    artists: "Singers: Neha Kakkar, Tulsi Kumar, B Praak",
    music: "music/music1.mp3",
  },
  {
    image: "images/image2.jpg",
    title: "Dilbar Dilbar",
    artists: "Singers: Neha Kakkar, Dhvani Bhanushali, Ikka",
    music: "music/music2.mp3",
  },
  {
    image: "images/image3.jpg",
    title: "Bandeya",
    artists: "Singer: Arijit Singh",
    music: "music/music3.mp3",
  },
  {
    image: "images/image4.jpg",
    title: "Selfie Le Le Re",
    artists: "Singers: Vishal Dadlani, Nakash Aziz, Aditya Pushkarna",
    music: "music/music4.mp3",
  },
  {
    image: "images/image5.jpg",
    title: "The Disco Song",
    artists: "Singers: Benny Dayal, Nazia Hassan, Sunidhi Chauhan",
    music: "music/music5.mp3",
  },
  {
    image: "images/image6.jpg",
    title: "Jag Ghoomeya",
    artists: "Singer: Rahat Fateh Ali Khan",
    music: "music/music6.mp3",
  },
  {
    image: "images/image7.jpg",
    title: "Thodi Jagah",
    artists: "Singer: Arijit Singh",
    music: "music/music7.mp3",
  },
  {
    image: "images/image8.jpg",
    title: "Tum Hi Aana",
    artists: "Singer: Jubin Nautiyal",
    music: "music/music8.mp3",
  },
  {
    image: "images/image9.jpg",
    title: "Nazar Na Lag Jaaye",
    artists: "Singers: Ash King & Sachin-Jigar",
    music: "music/music9.mp3",
  },
  {
    image: "images/image10.jpg",
    title: "Milegi Milegi",
    artists: "Singers:  Mika Singh & Sachin-Jigar",
    music: "music/music10.mp3",
  },
];
//Function to toogle play/pause
function togglePlayPause() {
  isPlaying = isPlaying === false ? true : false;
  if (isPlaying) {
    play.classList.replace("fa-play", "fa-pause");
    image.classList.add("animate");
  } else {
    play.classList.replace("fa-pause", "fa-play");
    image.classList.remove("animate");
  }
}
//Function to handle play and pause
function handlePlayPause() {
  //Toggle play/pause
  togglePlayPause();
  if (isPlaying) {
    music.play();
  } else {
    music.pause();
  }
}
//Function to load song
function loadSong(song) {
  image.setAttribute("src", song.image);
  title.innerText = song.title;
  artists.innerText = song.artists;
  music.setAttribute("src", song.music);
}
//Function to play next song
function playNextSong() {
  isPlaying = true;
  play.classList.replace("fa-play", "fa-pause");
  let { duration } = music;
  if (duration) {
    image.classList.add("animate");
  } else {
    image.classList.remove("animate");
  }
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  music.play();
}
//Function to play previous song
function playPreviousSong() {
  isPlaying = true;
  play.classList.replace("fa-play", "fa-pause");
  let { duration } = music;
  if (duration) {
    image.classList.add("animate");
  } else {
    image.classList.remove("animate");
  }
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  music.play();
}
//Function to update time and progress bar
function updateTime(event) {
  let { currentTime, duration } = event.target;
  let progressPercent = (currentTime / duration) * 100;
  //Update progress bar
  progressBar.style.width = `${progressPercent}%`;
  let minuteDuration = Math.floor(duration / 60);
  let secondDuration = Math.floor(duration % 60);
  //Update total song duration
  let total_duration =
    secondDuration < 10
      ? `${minuteDuration}:0${secondDuration}`
      : `${minuteDuration}:${secondDuration}`;
  if (duration) {
    totalDuration.innerText = total_duration;
  }
  let currentMinute = Math.floor(currentTime / 60);
  let currentSecond = Math.floor(currentTime % 60);
  //Update current time
  let current_time =
    currentSecond < 10
      ? `${currentMinute}:0${currentSecond}`
      : `${currentMinute}:${currentSecond}`;
  if (currentTime) {
    currentMusicTime.innerText = current_time;
  }
  //If music is over play next song
  if (currentTime === duration) {
    playNextSong();
  }
}
//Adding click funtionality to progress bar
function updateProgressBar(event) {
  let { duration } = music;
  let progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = progress;
}
//Event Listeners
play.addEventListener("click", handlePlayPause);
next.addEventListener("click", playNextSong);
previous.addEventListener("click", playPreviousSong);
music.addEventListener("timeupdate", updateTime);
progress.addEventListener("click", updateProgressBar);
