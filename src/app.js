// LOADING SCREEN
    var loadingScreen = document.querySelector(".loading-screen");

    window.addEventListener('load', function() {
        loadingScreen.style.opacity = '0';
    })
    loadingScreen.addEventListener('transitionend', function() {
        loadingScreen.style.display = 'none';
    })
// 

// ROW-TYPE-AUDIO
    document.addEventListener("DOMContentLoaded", (event) => {
        const controlBtn = document.getElementById("play-pause");
        let track = document.getElementById("track"),
        duration = track.duration, // Duration of audio clip (NaN here as the track is not loaded)
        playhead = document.getElementById("playhead"), // playhead
        timeline = document.getElementById("timeline"), // timeline
        timelineWidth = timeline.offsetWidth - playhead.offsetWidth,
        source = controlBtn.getAttribute("data-audio"),
        leftTimer = document.getElementById("is-left"),
        rightTimer = document.getElementById("is-right"),
        repeatButton = document.getElementsByClassName("icon-repeat");
    
        if (!track) return;
    
        // Update the track duration when the track is loaded.
        track.addEventListener(
        "canplaythrough",
        function () {
            duration = track.duration;
        },
        false
        );
    
        function playPause() {
        null === track.getAttribute("src") ? track.setAttribute("src", source) : "";
    
        if (track.paused) {
            track.play();
            controlBtn.className = "pause";
        } else {
            track.pause();
            controlBtn.className = "play";
        }
        }
    
        controlBtn.addEventListener("click", playPause);
    
        track.addEventListener("ended", function () {
        controlBtn.className = "play";
        track.currentTime = 0; // reset the playhead
    
        // Let's check if the repeat button is on, then play the track again.
        let times = repeatButton[0].getAttribute("repeat");
        if (times > 0) {
            controlBtn.className = "";
            controlBtn.className = "pause";
            track.play();
        }
        });
    
        // timeupdate event listener
        track.addEventListener("timeupdate", timeUpdate, false);
    
        // makes timeline clickable
        timeline.addEventListener(
        "click",
        function (event) {
            moveplayhead(event);
            track.currentTime = duration * clickPercent(event);
        },
        false
        );
    
        // Moves playhead as user clicks
        function moveplayhead(event) {
        let newMargLeft = event.clientX - getPosition(timeline);
    
        if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.style.marginLeft = newMargLeft + "px";
        }
        if (newMargLeft < 0) {
            playhead.style.marginLeft = "0px";
        }
        if (newMargLeft > timelineWidth) {
            playhead.style.marginLeft = timelineWidth + "px";
        }
        }
    
        function getPosition(el) {
        return el.getBoundingClientRect().left;
        }
    
        // returns decimal number of the total timelineWidth
        function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
        }
    
        // Time update
        function timeUpdate() {
        let playPercent = timelineWidth * (track.currentTime / duration);
        playhead.style.marginLeft = playPercent + "px";
        scrub.style.width = playPercent + "px";
    
        // Current time
        document.getElementById("duration-time").innerHTML = formatSecondsAsTime(
            duration
        );
        document.getElementById("current-time").innerHTML = formatSecondsAsTime(
            Math.floor(track.currentTime)
        );
        }
    
        // Synchronizes playhead position with current point in audio
        function formatSecondsAsTime(secs, format) {
        let hr = Math.floor(secs / 3600);
        let min = Math.floor((secs - hr * 3600) / 60);
        let sec = Math.floor(secs - hr * 3600 - min * 60);
    
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
    
        return min + ":" + sec;
        }
    });
//
  
// ROW-TYPE-TICKER
var ticker = document.querySelector('.ticker');
    list = document.querySelector('.ticker-list');
    clone = list.cloneNode(true);

ticker.append(clone)
// 