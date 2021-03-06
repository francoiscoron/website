(function($){
// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#sticky-header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 100);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('#sticky-header').removeClass('fixed').addClass('header-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#sticky-header').removeClass('header-up').addClass('fixed');
        }
    }

    lastScrollTop = st;
}

// Responsive Nav
$('#menu-icon').click(function(){
    $('body').toggleClass('show');
    $('.menu-icon--bar').toggleClass('show');
    $('#nav').toggleClass('show');
})



// Animsition
    $(".animsition").animsition({

        inClass               :   'fade-in-up-sm',
        outClass              :   'fade-out-up-sm',
        inDuration            :    1500,
        outDuration           :    800,
        loading               :    true,
        loadingParentElement  :   'body', //animsition wrapper element
        loadingClass          :   'animsition-loading',
        unSupportCss          : [ 'animation-duration',
                                  '-webkit-animation-duration',
                                  '-o-animation-duration'
                                ],
        overlay               :   false,
        overlayClass          :   'animsition-overlay-slide',
        overlayParentElement  :   'body'
    });

})(jQuery);