
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYER_STOP_TIME = 'videoplayer-current-time';
const player = new Player('vimeo-player');
// var iframe = document.querySelector('iframe');


function onVideoPlay() {
  player.getCurrentTime().then(function(seconds) {
   localStorage.setItem(PLAYER_STOP_TIME, seconds)
}).catch(function(error) {
    console.log(error)
});
}

player.on('timeupdate', throttle(onVideoPlay, 1000));

const currentTime = localStorage.getItem(PLAYER_STOP_TIME);

player.setCurrentTime(currentTime).catch(function(error) { 
  console.log(error);
}); 



