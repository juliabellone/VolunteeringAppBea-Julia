
//script que activa el selected del navbar
$(document).ready(function(){
    switch (window.location.pathname) {
        case '/opportunities':
        $('.opportunities').addClass('active');
        break;
        case '/profile':
        $('.profile').addClass('active');
        break;
        //ong navbar
        case '/ong/newoffer':
        $('.newoffer').addClass('active');
        break;       
        case '/ong/profile':
        $('.profile').addClass('active');
        break;
}
});
