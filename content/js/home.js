const app = () => {

    window.addEventListener('load', function(){
        const loader = document.querySelector('.loader');
        loader.className += ' hidden';
    });



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







    const bd = document.getElementsByTagName('body')[0];

    const start = document.getElementById('start');
    const modal = document.querySelector('.modal');
    const cross = document.querySelector('.cross');
    const app_body = document.querySelector('.app');

    const logo = document.querySelector('.logo');

    /* --- Theme toggle --- */
    // Apply cached theme on reload
    const theme_check = document.querySelector('.themeCheck');
    const body = document.body;
    const isDark = localStorage.getItem('isDark');

    if (isDark == 'true') { 
        body.classList.replace('light', 'dark');
        theme_check.checked = true;
        // bd.setAttribute("style", "--track-outline: #9298aa");
        logo.src = "./includes/imgs/logo_dark.png";
    }
    theme_check.addEventListener('click', () => {
        if (theme_check.checked) {
            body.classList.replace('light', 'dark');
            localStorage.setItem('isDark', true);
            bd.setAttribute("style", "--track-outline: #9298aa");
            logo.src = "./includes/imgs/logo_dark.png";
        }
        else {
            body.classList.replace('dark', 'light');
            localStorage.setItem('isDark', false);
            bd.setAttribute("style", "--track-outline: #f2f2f2");
            logo.src = "./includes/imgs/logo.png";
        }
    });
};

app();