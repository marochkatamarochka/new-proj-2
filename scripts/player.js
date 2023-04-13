let player;
const playerContainer = $(".player");
const volBtn = $(".player__volume-button");
const volIcon = $('.player__volume-icon');

let eventsInit = () => {
  $(".player__start").click((e) => {
    e.preventDefault();



    if (playerContainer.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $(".player__playback").click((e) => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPercentSec =
      (player.getDuration() / 100) * newButtonPositionPercent;

    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`,
    });

    player.seekTo(newPlaybackPercentSec);
  });

  $(".player__wrapper").click((e) => {
    player.playVideo();
  });



  $(".player__volume-pic").click((e) => {
    e.preventDefault();

    if (!!player.isMuted()) {
      player.unMute();
      const volUnMute = player.getVolume();
      volIcon.removeClass('mute');
      volBtn.css({
        left: `${volUnMute}%`,
      });
    } else {
      player.mute();
      volIcon.addClass('mute');
      volBtn.css({
        left: `0%`,
      });
    }
  });

  $(".player__volume").click((e) => {
    formatVolume(e);
  });
};

const formatVolume = (e) => {
  const vol = $(e.currentTarget);
  const clickedPos = e.originalEvent.layerX;
  const newButtonPosPercent = (clickedPos / vol.width()) * 100;

  if (player.mute()) {
    player.unMute();
    volIcon.removeClass('mute');
  }

  player.setVolume(newButtonPosPercent);
  $(".player__volume-button").css({
    left: `${newButtonPosPercent}%`,
  });
};

const formatTime = (timeSec) => {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes}:${seconds}`;
};

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  if (typeof interval === "undefined") {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const compelentedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${compelentedPercent}%`,
    });
  }, 1000);
};

const onPlayerStateChange = (event) => {

  switch (event.data) {
    case 1:
      playerContainer.removeClass("active");
      playerContainer.addClass("paused");
      break;

    case 2:
      playerContainer.addClass("active");
      playerContainer.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "405",
    width: "660",
    videoId: "LXb3EKWsInQ",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    playerVars: {
      controls: 0,
      disablekd: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0,
    },

  });
}

eventsInit();