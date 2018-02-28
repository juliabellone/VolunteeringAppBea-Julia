
//script que activa el selected del navbar
$(document).ready(function(){
    switch (window.location.pathname) {
        //user navbar 
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
        // home navbar 
        case '/signup': 
        $('.signup').addClass('active');
        break;
        case '/ong/signup':
        $('.ong-signup').addClass('active');
        break;
        case '/login': 
        $('.login').addClass('active');
        break;
}
});
