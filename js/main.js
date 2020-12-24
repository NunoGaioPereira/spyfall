const app = () => {

    window.addEventListener('load', function(){
        const loader = document.querySelector('.loader');
        loader.className += ' hidden';
    });

    const bd = document.getElementsByTagName('body')[0];
    const time_picker_element = document.querySelector('.time-picker');

    // var hr_element = document.querySelector('.time-picker .hour .hr');
    var min_element = document.querySelector('.time-picker .minute .min');

    // const hr_up = document.querySelector('.time-picker .hour .hr-up');
    // const hr_down = document.querySelector('.time-picker .hour .hr-down');

    const min_up = document.querySelector('.time-picker .minute .min-up');
    const min_down = document.querySelector('.time-picker .minute .min-down');
    const endAudio = new Audio();
    endAudio.src = './includes/sounds/silence.mp3';
    // endAudio.play();

    const start = document.getElementById('start');
    const modal = document.querySelector('.modal');
    const cross = document.querySelector('.cross');
    const app_body = document.querySelector('.app');

    const logo = document.querySelector('.logo');

    const mute = document.querySelector('.mute');
    const unmute = document.querySelector('.unmute');
    unmute.addEventListener('click', muteSounds);
    mute.addEventListener('click', muteSounds);
    function muteSounds () {
        mute.classList.toggle('active');
        unmute.classList.toggle('unactive');
        if(song.muted == true){
            song.muted = false;
        }
        else {
            song.muted = true;
        }
    }

    start.addEventListener('click', openModal);
    cross.addEventListener('click', closeModal);

    let hour = 0;
    let minute = 10;

    var now;
    var end;
    var secondsLeft;
    var pauseStart = 0;

    // Video toggle
    const video_check = document.querySelector('.videoCheck');
    let videoCheck = video_check.checked;

    // Theme toggle

    // Apply cached theme on reload
    const theme_check = document.querySelector('.themeCheck');
    const body = document.body;
    const isDark = localStorage.getItem('isDark');

    if (isDark == 'true') { 
        body.classList.replace('light', 'dark');
        theme_check.checked = true;
        // bd.setAttribute("style", "--track-outline: #9298aa");
        logo.src = "./includes/imgs/logo.png";
    }
    theme_check.addEventListener('click', () => {
        if (theme_check.checked) {
            body.classList.replace('light', 'dark');
            localStorage.setItem('isDark', true);
            bd.setAttribute("style", "--track-outline: #9298aa");
            logo.src = "./includes/imgs/logo.png";
        }
        else {
            body.classList.replace('dark', 'light');
            localStorage.setItem('isDark', false);
            bd.setAttribute("style", "--track-outline: #f2f2f2");
            logo.src = "./includes/imgs/logo_pink.png";
        }
    });

    // Event listeners
    // hr_up.addEventListener('click', hour_up);
    // hr_down.addEventListener('click', hour_down);

    min_up.addEventListener('click', minute_up);
    min_down.addEventListener('click', minute_down);

    // hr_element.addEventListener('change', hour_change);
    min_element.addEventListener('change', minute_change);

    // function hour_up () {
    //     hour++;
    //     if (hour > 23) {
    //         hour = 0;
    //     }
    //     setTime();
    // }

    // function hour_down () {
    //     hour--;
    //     if (hour < 0) {
    //         hour = 0;
    //     }
    //     setTime();
    // }

    function minute_up () {
        if (minute >= 60) { }
        else if (minute < 5) { minute++; }
        else { minute+=5; }
        setTime();
    }

    function minute_down () {
        if (minute <= 5 && minute != 1) { minute--; }
        else if(minute == 1) {}
        else { minute-=5; }
        setTime();
    }

    function setTime() {
        min_element.value = formatTime(minute);
        // time_picker_element.dataset.time = formatTime(hour) + ':' + formatTime(minute);
        time_picker_element.dataset.time = '00:' + formatTime(minute);
    }

    function formatTime(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

    // function hour_change (e) {
    //     if (e.target.value > 23) {
    //         e.target.value = 23;
    //     }
    //     else if (e.target.value < 0) {
    //         e.target.value = '00';
    //     }

    //     if (e.target.value == "") {
    //         e.target.value = formatTime(hour);
    //     }

    //     hour = e.target.value;
    // }

    function minute_change (e) {
        if (e.target.value > 60) {
            e.target.value = 60;
        }
        else if (e.target.value < 0) {
            e.target.value = '00';
        }
        if (e.target.value == "") {
            e.target.value = formatTime(minute);
        }
        minute = e.target.value;
    }

    function openModal () {
        pause = 0;
        sessionLength = min_element.value * 60;
        // sessionLength = 5;
        stopper = false;
        // console.log("sesion: " + sessionLength);
        now = Date.now();
        end = now + sessionLength * 1000;
        secondsLeft = sessionLength;
        outline.style.strokeDashoffset = "1360px";
        // console.log(now)
        // console.log(end)

        timeDisplay.textContent = `${sessionLength/60}:00`;
        modal.classList.toggle('open');
        app_body.classList.toggle('open');
        play.classList.toggle('open');
        if(!video_check.checked) {
            if(matchMedia('(pointer:fine)').matches) { video.style.display = 'none'; }
        }
        else {
            if(matchMedia('(pointer:fine)').matches) { video.style.display = 'initial'; }
            bd.setAttribute("style", "--light-contrast: #fff; --track-outline: #ffffff25");
        }

        song.play();
        play.src = "./includes/imgs/pause.svg";
        if(matchMedia('(pointer:fine)').matches) { video.play(); }
    }

    function closeModal () {
        stopPlaying(song);
        song.currentTime = 0; // reset time
        modal.classList.toggle('open');
        app_body.classList.toggle('open');
        play.classList.toggle('open');
        outline.style.strokeDashoffset = "1360px";
        if (localStorage.getItem('isDark') == 'true') { 
            bd.setAttribute("style", "--light-contrast: #5a6174; --track-outline: #9298aa"); 
        }
        else { 
            bd.setAttribute("style", "--light-contrast: #5a6174; --track-outline: #f2f2f2"); 
        }
    }

    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video-container video');
    const video_container = document.querySelector('.video-container');
    // Remove video for mobile devices
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { video_container.removeChild(video); }

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // Length of outline
    // const outlineLenght = outline.getTotalLength();
    const outlineLenght = '1359.76';
        // Duration
    let sessionLength = min_element.value;


    // Animate outline
    outline.style.strokeDasharray = outlineLenght + "px"; //Total length // 100 px between each dash
    outline.style.strokeDashoffset = outlineLenght + "px"; // hide

    // Pick sound
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            if(matchMedia('(pointer:fine)').matches) { video.src = this.getAttribute('data-video'); }
            activateButtons(sound);
        }); 
    });

    // Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select sound
    timeSelect.forEach(option =>{
        option.addEventListener('click', function(){
          // use function() to be able to use this
          song.currentTime = 0; // reset time
          // sessionLength = this.getAttribute('data-time');
          // timeDisplay.textContent = `${Math.floor(sessionLength / 60)}:${Math.floor(sessionLength % 60)}0`;
          // Pause everything
          // song.pause();
          // song.currentTime = 0;
          play.src = './includes/imgs/play.svg';
          if(matchMedia('(pointer:fine)').matches) { video.pause(); }
        })
    });

    // Stop and play the sounds
    const checkPlaying = song =>{
        if (song.paused) {
          song.play();
          play.src = "./includes/imgs/pause.svg";
          if(matchMedia('(pointer:fine)').matches) { video.play(); }
          // timeInPause = Math.round((Date.now() - pauseStart) / 1000);
          timeInPause = Date.now() - pauseStart;
          end += timeInPause;
          pauseStart = 0;
        }
        else {
          song.pause();
          play.src = "./includes/imgs/play.svg"; 
          if(matchMedia('(pointer:fine)').matches) { video.pause(); }
          pauseStart = Date.now();
        }
    };

    const stopPlaying = song =>{
        if (song.paused) { }
        else {
          song.pause();
          play.src = "./includes/imgs/play.svg"; 
          if(matchMedia('(pointer:fine)').matches) { video.pause(); }
        }
    };

    var elapsedT = 0;
    // Animate circle
    var stopper = false;
    song.ontimeupdate = () => {
        if(stopper == false)
        {
            var timeLeft = (end - Date.now()) / 1000;
            secondsLeft = Math.round(timeLeft);
            // secondsLeft = end - Date.now();
            // console.log(secondsLeft);
            let currentTime = song.currentTime;
            let elapsed = sessionLength - currentTime;
            // let seconds = Math.floor(elapsed % 60);
            // let minutes = Math.floor(elapsed / 60);
            let seconds = Math.floor(secondsLeft % 60);
            let minutes = Math.floor(secondsLeft / 60);

            // Animate circle
            // let progress = outlineLenght - (currentTime / sessionLength) * outlineLenght;
            // let progress = outlineLenght - (((end - Date.now())/1000) / sessionLength) * outlineLenght;
            let progress = outlineLenght - ((sessionLength - timeLeft) / sessionLength) * outlineLenght;
            // console.log("Progress: " + progress);
            // console.log("currentTime: " + currentTime);
            // console.log("Test: " + (sessionLength - (end - Date.now())/1000));
            // console.log("Time left: " + timeLeft);
            outline.style.strokeDashoffset = progress + "px";

            // Animate text
            if(seconds == 0) { timeDisplay.textContent = `${minutes}:${seconds}0`; }
            else if(seconds < 10) { timeDisplay.textContent = `${minutes}:0${seconds}`; }
            else { timeDisplay.textContent = `${minutes}:${seconds}`; }

            // if(currentTime >= sessionLength) {
            // if(secondsLeft < 0) {
            // if(secondsLeft < 0 && stopper == false) {
            if(timeLeft <= 0 && stopper == false) {   

              song.pause();
              song.currentTime = 0;
              play.src = './includes/imgs/play.svg';
              if(matchMedia('(pointer:fine)').matches) { video.pause(); }
              // var endAudio = new Audio('./includes/sounds/bowl.mp3');
              endAudio.src = './includes/sounds/bowl.mp3';
              endAudio.loop = false;
              endAudio.volume = 0.5;
              endAudio.play(); 
              outline.style.strokeDashoffset = "1360px";
              stopper = true;
              closeModal();
            }
            song.onended = function() {
                if(secondsLeft > 0  && stopper == false) {
                    song.currentTime = 0;
                    song.play();
                }
            };
        }
    }

    function activateButtons (cur_sound) {
        // Pick sound
        sounds.forEach(sound =>{
            if(sound.classList.contains("active")) {
                sound.classList.remove('active');
            }
            cur_sound.classList.add('active');
        });
    }
};

app();