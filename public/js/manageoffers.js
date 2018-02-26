
$(document).ready(function(){
    $('.offerbutton').on('click', (event) => {
        if ($('.offerbutton').hasClass('subscribe')) {
            // hacer peticion POST a 'offerid/subscribe'
            console.log('click subscribe')
            $.ajax({
                method:  'POST',
                url:     "/offer/<%= offer._id %>/subscribe",
                success: showFeedback,
                error:   handleError,
            });
        }
        else {
            // hacer peticion post a offerid/unsubscribe
            console.log('click UNsubscribe')
            $.ajax({
                method:  'POST',
                url:     "/offer/<%= offer._id %>/unsubscribe",
            //   success: showFeedback,
            //   error:   handleError
            });
        }
        function showFeedback () {
            alert('You have suscribed to this offer. Thank you!')
        }
        
        function handleError (err) {
            console.log('Oh no! Error:');
            console.log(err);
            alert('We are sorry, there was a mistake')
        }   
    });
});