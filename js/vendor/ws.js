// Youtube Video iFrame API
// -------------------------------------------------
var vs;
if( !Modernizr.touchevents ) {

    if( document.getElementById('player') ) {

        // Set the relevant YouTube video and controls depending on which page is being viewed
        window.videoId  = 'N0uCMHi1Mps';
        window.controls = 0;
        window.loop     = 1;
        window.loopCue  = 149;
        window.homepage = 1;
        if( !document.getElementById('icon-estimate') ) { // icon-estimate is an element on the homepage only, so used for Features page
            videoId     = 'mYCUnw4T0bc';
            controls    = 1;
            loop        = 0;
            loopCue     = 217;
            homepage    = 0;
        }

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 1. This function creates an <iframe> (and YouTube player)
        // -------------------------------------------------
        // This happens after the API code downloads.

        window.player;

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '900',
                width: '1600',
                videoId: videoId,
                playerVars: {
                    'autoplay': 0,
                    'controls': controls,
                    'rel': 0,
                    'enablejsapi': 1,
                    'showinfo': 0,
                    'modestbranding': 1,
                    'playlist': videoId,
                    'loop': loop
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        // 2. The API will call this function when the video player is ready.
        // -------------------------------------------------
        function onPlayerReady(event) {
            if($('#player').hasClass('autoplay')){
                event.target.playVideo();
            }
            player.setPlaybackQuality('hd1080');
            playbackMonitor();
        }

        // 3. The API calls this function when the player's state changes.
        // -------------------------------------------------
        function onPlayerStateChange(event) {
            if (event.data == 0) {
                clearInterval(vs);
            }
        }

        function playVideo() {
            player.playVideo();
            //revealScreen();
        }

        function stopVideo() {
            player.stopVideo();
            clearInterval(vs);
        }

        function pauseVideo() {
            player.pauseVideo();
        }

        function jumpToCue(c) {
            player.seekTo(c);
        }

    }

}

// Function used to check state of Browser Tab
// -------------------------------------------------
// An inactive browser tab reduces the rate at which setInterval
// fires which can cause the video not to loop and run through to
// the end - so this function pauses the video.


var vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();

vis(function(){
    if( vis() ) {
        console.log('tab visible');
        if($('#player').hasClass('autoplay')) {
            playVideo();
        }
    } else {
        console.log('tab hidden')
        pauseVideo();
    }
});



if( document.getElementById('feature-list') ) {

// Features
// ---------------------------------
// The stack animations

    var flagAnimation = function() {
        animating = true;
    }

    var animateImage = function() {
        animating = false;
        var shufflingStack = false;

        // PINNED OR STACKED TASKS
        toggleColumn();
        // Fade in labels
        setTimeout(function () {
            $('.stack-label-pinned').removeClass('onboard-faded');
        }, 1000);
        setTimeout(function () {
            $('.stack-label-stacked').removeClass('onboard-faded');
        }, 1500);

        // Toggle stacked column
        function toggleColumn() {

            setTimeout(function () {
                $('.click-sml').addClass('scaleup-toggle-sml');
                $('.click-sml').removeClass('onboard-faded');
            }, 600);
            setTimeout(function () {
                $('.click-sml').addClass('onboard-faded');
            }, 800);
            setTimeout(function () {
                if ($('.stack2').hasClass('no-width')) {
                    $('.stack2').removeClass('no-width');
                    if (!shufflingStack) {
                        setTimeout(function () {
                            $('.stack').addClass('show-overflow');
                            moveStacked();
                        }, 1000);
                    }
                } else {
                    $('.stack').removeClass('show-overflow');
                    $('.stack2').addClass('no-width');
                }
            }, 1100);

        }

        // Function to continuously shuffle the tasks in the stacked column
        function moveStacked() {
            shufflingStack = true;
            setTimeout(function () {
                $('.task-block2').addClass('drag');
            }, 0);
            setTimeout(function () {
                $('.task-block2').addClass('move-down');
                $('.task-block3').addClass('move-up');
            }, 400);
            setTimeout(function () {
                $('.task-block2').removeClass('drag');
            }, 800);
            setTimeout(function () {
                $('.task-block1').addClass('drag');
            }, 1800);
            setTimeout(function () {
                $('.task-block1').addClass('move-bottom');
                $('.task-block2').addClass('move-up');
                $('.task-block3').addClass('move-top');
            }, 2200);
            setTimeout(function () {
                $('.task-block1').removeClass('drag');
            }, 2600);
            setTimeout(function () {
                $('.task-block2').addClass('drag');
            }, 3600);
            setTimeout(function () {
                $('.task-block1').removeClass('move-bottom');
                $('.task-block1').addClass('move-up');
                $('.task-block2').removeClass('move-up');
                $('.task-block2').addClass('move-down');
            }, 4000);
            setTimeout(function () {
                $('.task-block2').removeClass('drag');
            }, 4400);
            setTimeout(function () {
                $('.task-block3').addClass('drag');
            }, 5400);
            setTimeout(function () {
                $('.task-block1').removeClass('move-bottom move-top move-up move-down');
                $('.task-block2').removeClass('move-bottom move-top move-up move-down');
                $('.task-block3').removeClass('move-bottom move-top move-up move-down');
            }, 5800);
            setTimeout(function () {
                $('.task-block3').removeClass('drag');
                setTimeout(function () {
                    toggleColumn();
                }, 1000);
                setTimeout(function () {
                    shufflingStack = false;
                    toggleColumn();
                }, 2500);
            }, 6200);

        }

        // PINNED TASKS IN THE PAST
        var dayHeight = 72;
        var dayCounter = 0;
        resetPinned();

        function movePinned(d) {

            switch (d) {
                case 1:
                    $('.task-block-pinned1, .task-block-pinned2, .task-block-pinned3').css({opacity: 1});
                    $('.task-block-pinned1').removeClass('day4');
                    $('.task-block-pinned1').addClass('day3');
                    break;
                case 2:
                    $('.task-block-pinned1').removeClass('day3');
                    $('.task-block-pinned1').addClass('day2');
                    break;
                case 3:
                    $('.task-block-pinned1').removeClass('day2');
                    $('.task-block-pinned1').addClass('day1');

                    $('.task-block-pinned2').removeClass('day4');
                    $('.task-block-pinned2').addClass('day3');
                    break;
                case 4:
                    $('.task-block-pinned2').removeClass('day3');
                    $('.task-block-pinned2').addClass('day2');
                    break;
                case 5:
                    $('.task-block-pinned1').addClass('half-width left-pos');

                    $('.task-block-pinned2').removeClass('day2');
                    $('.task-block-pinned2').addClass('day1 half-width middle-pos');

                    $('.task-block-pinned3').removeClass('day4');
                    $('.task-block-pinned3').addClass('day3');
                    break;
                case 6:
                    $('.task-block-pinned3').removeClass('day3');
                    $('.task-block-pinned3').addClass('day2');
                    break;
                case 7:
                    $('.task-block-pinned1').addClass('third-width');

                    $('.task-block-pinned2').addClass('third-width middle-pos');

                    $('.task-block-pinned3').removeClass('day2');
                    $('.task-block-pinned3').addClass('day1 third-width right-pos');
                    break;
                case 8:
                    completePinnedTask(1);
                    break;
                case 9:
                    completePinnedTask(2);
                    break;
                case 10:
                    completePinnedTask(3);
                    break;
                default:
                    resetPinned();
            }

        }

        function completePinnedTask(num) {
            $('.pinned-popover').addClass('popover-show');
            var t = $('.task-block-pinned' + num);
            setTimeout(function () {
                $('.popover-complete').addClass('popover-complete-click');
                setTimeout(function () {
                    $('.popover-complete').removeClass('popover-complete-click');
                    setTimeout(function () {
                        $('.pinned-popover').removeClass('popover-show');
                        setTimeout(function () {
                            t.css({opacity: 0});
                            if (num == 1) {
                                $('.task-block-pinned2, .task-block-pinned3').removeClass('third-width right-pos middle-pos');
                                $('.task-block-pinned2').addClass('half-width left-pos');
                                $('.task-block-pinned3').addClass('half-width middle-pos');
                            } else if (num == 2) {
                                $('.task-block-pinned3').removeClass('half-width middle-pos');
                                $('.task-block-pinned3').addClass('left-pos');
                            }
                        }, 200);
                    }, 300);
                }, 300);
            }, 500);
        }

        function resetPinned() {
            $('.pinned').each(function () {
                $(this).css({opacity: 0});
                $(this).removeClass('day0 day1 day2 day3 day4 half-width third-width left-pos middle-pos right-pos');
                $(this).addClass('day4');
            });
            dayCounter = 0;
        }

        function moveDates(d) {
            setTimeout(function () {
                $('.date').each(function () {
                    // Move Dates
                    var d = $(this);
                    if (d.hasClass('day0')) {
                        d.css({opacity: 0});
                        d.removeClass('day0');
                        d.addClass('day5');
                    } else if (d.hasClass('day1')) {
                        d.removeClass('day1');
                        d.addClass('day0');
                    } else if (d.hasClass('day2')) {
                        d.removeClass('day2');
                        d.addClass('day1');
                    } else if (d.hasClass('day3')) {
                        d.removeClass('day3');
                        d.addClass('day2');
                    } else if (d.hasClass('day4')) {
                        d.removeClass('day4');
                        d.addClass('day3');
                    } else if (d.hasClass('day5')) {
                        d.css({opacity: 1});
                        d.removeClass('day5');
                        d.addClass('day4');
                    }
                });
                // Move Tasks
                dayCounter++;
                movePinned(dayCounter);
                // Cycle Days
                moveDates(1600);
            }, d);
        }

        moveDates();

    }

    animateImage();



    // Donut budget charts

    $('#doughnutChart').one('inview', function(event, visible) {
        if (visible) {
            $('#doughnutChart').drawDoughnutChart([
                {
                    title: "Time Worked",
                    value : 240,
                    //color: "#f26ede"
                    color: "rgba(96,207,254,1)"
                },
                {
                    title: "Time Scheduled",
                    value:  600,
                    color: "rgba(96,207,254,0.5)"
                }
            ]);
        }
    });



}






$(document).ready(function(){

    // Loading
    // ---------------------------------

    show($('.cover'),0,0,'block');

    // Vivus SVG drawing
    // ---------------------------------------
    // Animates the SVG icons
    function myCallback(){

    }

    function drawIcon(obj){
        new Vivus(obj, {type: 'oneByOne', duration: 30, start: 'manual', forceRender: false, dashGap: 20}, myCallback);
    }

    // Reveal page elements
    // ---------------------------------------
    // Checks for when page items have
    // scrolled into view

    var hCount  = 0;
    var tCount  = 0;
    var fCount  = 0;
    var cCount  = 0;
    var pCount  = 0;
    var flCount = 0;
    var delay   = 150;
    var stagger = 800;

    // Hide all animated page elements
    $('.anim-block').transition({opacity:0, y:'50px'},0);
    $('.fade-block').transition({opacity:0},0);

    function showElem(obj){
        obj.transition({opacity:1, y:'0px'},500,'easeOutCirc');
    }

    // Header Panel
    // ---------------------------------
    $('header > .fade-block').one('inview', function(event, visible) {
        if (visible) {
            d = delay * hCount;
            setTimeout(showElem, d, $(this));
            hCount ++;
        }
    });

    // Features Panel
    // ---------------------------------
    $('.feature').one('inview', function(event, visible) {
        if (visible) {
            var id = $(this).find('.feature-icon').attr('id');
            $(this).transition({y:'80px'},0);
            d = delay * fCount;
            setTimeout(showFeature, d, $(this), id, true);
            fCount ++;
        }
    });

    function showFeature(obj,id){
        obj.transition({opacity:0.8, y:'0px'},400,'out');
        new Vivus(id, {type: 'oneByOne', duration: 100, start: 'autostart', forceRender: false, dashGap: 20}, myCallback);
    }

    // Price Plans
    // ---------------------------------
    $('.plans-container .anim-block').one('inview', function(event, visible) {
        if (visible) {
            d = delay * pCount + stagger;
            setTimeout(showElem, d, $(this));
            pCount ++;
        }
    });

    // Clients Panel
    // ---------------------------------
    $('.clients-inner > .anim-block').one('inview', function(event, visible) {
        if (visible) {
            d = delay * cCount;
            setTimeout(showElem, d, $(this));
            cCount ++;
        }
    });

    // Navigation
    // ---------------------------------

    $( window ).resize(function() {
        resize();
    });

    function resize(){
        var ww = $(window).width();
        if(ww <= 950){
            hide($('.nav-container'),0,0,'none');
        }else{
            show($('.nav-container'),0,0,'block');
            hide($('.mobile-nav-bg'),200,0,'none');
            show($('.page-container'),200,0,'block');
            show($('.bg-hero'),200,0,'block');
            mobileNavActive = false;
            switchIcon('icon',0);
        }
    }

    var mobileNavActive = false;

    $('.nav-icon').click(function(){
        if(!mobileNavActive){
            mobileNavActive = true;
            $(this).transition({rotate:90},150, 'in', function() { switchIcon('close',180) });
            show($('.nav-container'),200,0,'block');
            show($('.mobile-nav-bg'),200,0,'block');
            hide($('.page-container'),200,0,'none');
            hide($('.bg-hero'),200,0,'none');
        }else{
            mobileNavActive = false;
            hide($('.nav-container'),200,0,'none');
            hide($('.mobile-nav-bg'),200,0,'none');
            show($('.page-container'),200,0,'block');
            show($('.bg-hero'),200,0,'block');
            $(this).transition({rotate:90},150, 'in', function() { switchIcon('icon',0) });
        }
    });

    function switchIcon(icon, rot){
        $('.nav-icon').attr('src', 'img/nav-'+icon+'.svg');
        $('.nav-icon').transition({rotate:rot},150, 'out');

        if(icon == 'close'){

        }
    }

    // Contact Form
    // -----------------------------------
    // Post the contact form - pass the entered
    // details to send-mail.php

    $("#submit-btn").click(function(e) {

        e.preventDefault();

        var url = "/contact";

        var n = $('#name').val();
        var e = $('#email').val();
        var c = $('#details').val();


        if( n != '' && e != '' && c != '' ){

            if(validateEmail(e)){

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $("#contactForm").serialize(), // serializes the form's elements.
                    success: function(data)
                    {
                        //clear form and show message
                        //$('#name').val('');
                        //$('#email').val('');
                        //$('textarea').val('');
                        $('#contactForm').trigger('reset');
                        $('span.response').removeClass('error');
                        $('span.response').html(data);
                        $('span.response').transition({opacity:1},500,'out');
                        setTimeout(function(){
                            $('span.response').transition({opacity:0},500,'out');
                        },3000);
                    }
                });

            }else{
                $('span.response').addClass('error');
                $('span.response').html('You must enter a valid email address');
                $('span.response').transition({opacity:1},500,'out');
            }

        }else{
            $('span.response').addClass('error');
            $('span.response').html('You must fill all the fields');
            $('span.response').transition({opacity:1},500,'out');
        }

        return false; // don't execute the standard form submit.
    });

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
        if( !emailReg.test( $email ) ) {
            return false;
        } else {
            return true;
        }
    }

    // Resize
    // ---------------------------------
    // Full screen background images are resized and positioned using
    // javascript as the CSS 'background-size: cover' property makes the
    // image jitter when scrolling.

    $(".clients-img").backstretch("img/client-logos.png");

    // Parallax
    // ---------------------------------
    // Uses Stellar.js on non-touch devices

    if (!Modernizr.touch) {
        $.stellar({
            horizontalScrolling: false,
            responsive: true
        });
    }

    // Video
    // ---------------------------------
    // Used to loop the screencast videos without causing a momentary blank screen

    var ct = 0;

    window.playbackMonitor = function() {
        // Clear any old setIntervals that might be running
        if(vs){ clearInterval( vs ); }

        vs = setInterval( function() {

            ct = Math.round( player.getCurrentTime() * 10 ) / 10;

            // Loop video before natural end is reached
            if( ct >= loopCue ) {
                if(homepage) {
                    jumpToCue( 0 );
                } else {
                    show( $('.video-features-poster'), 500, 0, 'block' );
                    show( $('.video-fade'), 500, 0, 'block' );
                    show( $('.play-video'), 500, 200, 'block' );
                    pauseVideo();
                    jumpToCue(0);
                }

            }

        }, 200  );
    }

    // Features Video
    // ---------------------------------
    // Controls the playback og the "Getting Started" features video

    $('.play-video').click(function(){
        hide( $(this), 500, 0, 'none' );
        hide( $('.video-fade'), 500, 0, 'none' );
        hide( $('.video-features-poster'), 500, 1500, 'none' );

        jumpToCue(1);
        playVideo();
    });


    // Popup Video
    // ---------------------------------
    // Used for touch devices

    $('.play-link').click(function(e) {
        e.preventDefault();
        var $iframeElement = $('<iframe>').attr(
            {
                'id': 'videoPlayer',
                'name': 'videoPlayer',
                'frameborder': '0',
                'webkitAllowFullScreen': '',
                'mozallowfullscreen': '',
                'allowFullScreen': '',
                'src': $(this).attr('href')
            }
        );
        $('.popup-embed-container').append($iframeElement);
        show( $('.popup-bg-container'), 500, 0, 'table' );
        show( $('.popup-video-container'), 500, 0, 'table-cell' );

        var $frame = $('iframe#videoPlayer');
        $frame.attr('src',src);
    });

    $(".popup-close").click(function(e){
        e.preventDefault();
        closeVideo();
    });
    $(".popup-bg-container").click(function(e){
        e.preventDefault();
        closeVideo();
    });

    function closeVideo() {
        $("iframe#videoPlayer").remove();
        hide( $('.popup-bg-container'), 500, 0, 'none' );
        hide( $('.popup-video-container'), 500, 0, 'none' );

    }



    // Sideshows
    // ---------------------------------------
    // Uses Swipe.js to power the slideshows
    // that appear on the features page

    $('.section-nav').each(function(index, item){

        var linkList = $(this);
        var slideshow = $(this).data('target-slider');
        var s = $('#'+slideshow);


        if( s.find('.slide').length > 1 ) {

            var id = s.attr('id');
            console.log(id);

            slideshow = new Swipe(document.getElementById(id), {
                startSlide: 0,
                speed: 600,
                auto: 0,
                continuous: true,
                disableScroll: false,
                stopPropagation: false,
                callback: function(index, elem) { },
                transitionEnd: function(index, elem) { }
            });

        }

        $(this).find('li a').each(function(i) {

            $(this).click(function(e){
                e.preventDefault();
                slideshow.slide(i, 1000);
                setActiveLink(i, linkList);
            });

        });

    });

    function setActiveLink(link, list) {
        list.find('li').each(function(i){
            if(i == link) {
                $(this).find('a').addClass('link-active');
            } else {
                $(this).find('a').removeClass('link-active');
            }
        });
    }



    //  Initialise
    // ---------------------------------
    $('.loader').loadie(0.75);
    resize();

    hide($('.old-workstack .content'),0,0,'none');


// -------------------------------------------------
// -------------------------------------------------
// Twitter Promo
// Used to sparingly show the Twitter promo modal
// -------------------------------------------------
// -------------------------------------------------

    window.dropPromoCookie = true;                         // false disables the Cookie, allowing you to style the modal
    window.cookiePromoDuration = 30;                       // Number of days before the cookie expires, and the banner reappears
    window.cookiePromoName = 'promoCookie';                // Name of our cookie
    window.cookiePromoValue = 'on';                        // Value of cookie


    window.showPromo = function(){
        removePromo();
        setTimeout(function(){
            $('#freeSubModal').modal('show');
        }, 40000);
    }

    window.createPromoCookie = function(name,value,days) {

        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        if(window.dropPromoCookie) {
            document.cookie = name+"="+value+expires+"; path=/";
        }
    }

    window.checkPromoCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    window.erasePromoCookie = function(name) {
        createPromoCookie(name,"",-1);
    }

    window.removePromo = function(){
        createPromoCookie(window.cookiePromoName,window.cookiePromoValue, window.cookiePromoDuration); // Create the cookie
    }




});

$(window).load(function(){

    $('.loader').loadie(1);
    setTimeout( hide, 300, $('.cover'), 500, 0, 'none' );

    if($('.cover-reveal').length) {
        $('.cover-reveal').addClass('swipe-right');
    }


    // Twitter promo modal
    // ---------------------------------

    if(checkPromoCookie(window.cookiePromoName) != window.cookiePromoValue){
        showPromo();
    }


});


// Helpers
// -----------------------------------

window.hide = function(obj,speed,d,state){
    obj.transition({opacity:0, delay:d},speed,'out',function(){
        obj.css( { display: state } );
    });
}

window.show = function(obj,speed,d,state){
    //obj.removeClass('state-hidden');
    obj.css( { display: state } );
    obj.transition({opacity:1, delay:d},speed,'out');
}




