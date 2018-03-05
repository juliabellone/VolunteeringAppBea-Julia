
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
    // function carouselHeight() { 
    //     if(window.location.pathname == '/') {
    //         console.log('hola')
    //         let windowHeight = $(window).height();
    //         let navbarHeight = $('.navbar').height();
    //         $('.carousel').css('height', windowHeight - navbarHeight)
    //     }
    // }

    // $(window).load(carouselHeight())
    // $(window).resize(carouselHeight())

        // We can attach the `fileselect` event to all file inputs on the page
        $(document).on('change', ':file', function() {
          var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
          input.trigger('fileselect', [numFiles, label]);
        });
      
        // We can watch for our custom `fileselect` event like this
        $(document).ready( function() {
            $(':file').on('fileselect', function(event, numFiles, label) {
      
                var input = $(this).parents('.input-group').find(':text'),
                    log = numFiles > 1 ? numFiles + ' files selected' : label;
      
                if( input.length ) {
                    input.val(log);
                } else {
                    if( log ) alert(log);
                }
      
            });
        });
        
});


