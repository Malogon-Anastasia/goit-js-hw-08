
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYER_STOP_TIME = 'videoplayer-current-time';

const player = new Player('vimeo-player');

player.on('play', onVideoPlay);

function onVideoPlay() {
  if (localStorage.getItem(PLAYER_STOP_TIME)) {
    player.setCurrentTime(localStorage.getItem(PLAYER_STOP_TIME));
    player.off('play', onVideoPlay);
  }
}

player.on('timeupdate', throttle(OnTimeUpdate, 1000));

player.on('seeked', OnTimeUpdate);

function OnTimeUpdate(data) {
  player.getCurrentTime().then(seconds => localStorage.setItem(PLAYER_STOP_TIME, seconds));
}