const main = () => {

    window.addEventListener('load', function(){
        const loader = document.querySelector('.loader');
        loader.className += ' hidden';
    });

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

main();