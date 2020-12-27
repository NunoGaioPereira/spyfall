// const app = () => {
    var socket = io.connect('http://localhost:3000/');
    // const name_modal = document.querySelector('.name-modal');
    // join_button.addEventListener('click', joinModal);


    /* === Time picker === */
    let minute = 10;
    const time_picker_element = document.querySelector('.time-picker');
    let min_element = document.querySelector('.time-picker .minute .min');
    const min_up = document.querySelector('.time-picker .minute .min-up');
    const min_down = document.querySelector('.time-picker .minute .min-down');

    min_up.addEventListener('click', minute_up);
    min_down.addEventListener('click', minute_down);
    min_element.addEventListener('change', minute_change);

    function minute_up () {
        if (minute >= 60) { }
        else { minute++; }
        setTime();
    }

    function minute_down () {
        if (minute != 1) { minute--; }
        else {}
        setTime();
    }

    function setTime() {
        min_element.value = formatTime(minute);
        time_picker_element.dataset.time = '00:' + formatTime(minute);
    }

    function formatTime(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

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

    /* === Time picker === */


// };

// app();