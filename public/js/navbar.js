
//script que activa el selected del navbar
$(document).ready(function(){
    switch (window.location.pathname) {
        case '/opportunities':
        $('.opportunities').addClass('active');
        break;
        case '/profile':
        $('.profile').addClass('active');
        break;
}
});
