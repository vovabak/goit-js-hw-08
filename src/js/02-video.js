import Player from '@vimeo/player';
const throttle = require("lodash.throttle");

const iframe = document.querySelector("iframe");
const LOCALSTORAGE_KEY = "videoplayer-current-time";
const currentTime = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

const player = new Player(iframe);

if (currentTime && currentTime.seconds < currentTime.duration) {
    player.setCurrentTime(currentTime.seconds);
}

player.on("timeupdate", throttle(setCurrentTime, 1000));

function setCurrentTime(data) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}