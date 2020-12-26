// const app = () => {
    const name_modal = document.querySelector('.name-modal');
    const cover = document.querySelector('#cover');
    const join_button = document.querySelector('#join');
    const open_name = document.querySelector('#start');
    const start_button = document.querySelector('#start_game');
    const close_name = document.querySelector('#close_name');
    const name_input = document.querySelector('#player-name');

    join_button.addEventListener('click', openNameModal);
    open_name.addEventListener('click', openNameModal);
    close_name.addEventListener('click', openNameModal);
    cover.addEventListener('click', openNameModal);

    start_button.addEventListener('click', startGame);

    function openNameModal () {
        name_modal.classList.toggle('open');
        cover.classList.toggle('open');
    }

    function startGame () {
        if (name_input.value.length == 0) {
            alert("Please choose a name!");   
            // return false;
        }
    }
// };

// app();