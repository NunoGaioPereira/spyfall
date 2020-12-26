// const app = () => {
    var socket = io.connect('http://localhost:3000/');

    const name_modal = document.querySelector('.name-modal');
    const cover = document.querySelector('#cover');
    const join_button = document.querySelector('#join');
    const start_button = document.querySelector('#start_game');
    const close_name = document.querySelector('#close_name');
    const name_input = document.querySelector('#player-name');
    const join_code_input = document.querySelector('#join-code');

    const join_go = document.querySelector('#join_game');

    const create_game = document.querySelector('#start');

    join_button.addEventListener('click', joinModal);
    join_go.addEventListener('click', joinRoom);
    close_name.addEventListener('click', openNameModal);
    cover.addEventListener('click', openNameModal);

    // start_button.addEventListener('click', startGame);
    create_game.addEventListener('click', createRoom);

    function openNameModal () {
        name_modal.classList.toggle('open');
        cover.classList.toggle('open');
        document.getElementById('error_message').innerHTML = '';
    }

    // function startGame () {
    //     if (name_input.value.length == 0) {
    //         alert("Please type a name!");   
    //         // return false;
    //     }
    // }

    function joinModal() {
        if (nameValidation(name_input.value)) {
            openNameModal();
        }
    }

    function joinRoom() {
        if (joinCodeValidation(join_code_input.value)) {
            socket.emit('joinGame');
        }
    }

    function createRoom() {
        // name = name_input.value;
        if (nameValidation(name_input.value)) {
            socket.emit('newGame');
        }
    }

    function joinCodeValidation(code) {
        if (code.length == 0) {
            document.getElementById('room_error_message').innerHTML = 'Please enter a code!';
            return false;
        }
        else {
            return true;
        }
    }

    function nameValidation(name) {
        if (name.length == 0) {
            document.getElementById('error_message').innerHTML = 'Please enter a name!';
            return false;
        }
        if (name == '' || name.replace(/\s/g, '').length == '') {
            document.getElementById('error_message').innerHTML = 'Your name cannot be all spaces!';
            return false;
        } 
        else if (name.includes('%20')) {
            document.getElementById('error_message').innerHTML = 'Your name cannot contain the character "%20"!';
            return false;
        } 
        else if (
            name.match(
                /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu
            )
        ) {
            document.getElementById('error_message').innerHTML = 'Your name cannot contain emojis, or other odd characters';
            return false;
        }
        else {
            return true;
        }
    }
// };

// app();