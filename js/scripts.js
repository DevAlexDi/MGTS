$(document).ready(function(){

    $('.head-slider').slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: '<button type="button" class="slick-prev head-slider__arrow head-slider__arrow--prev"></button>',
        nextArrow: '<button type="button" class="slick-next head-slider__arrow head-slider__arrow--next"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    });

    $('.mdc-text-field').each(function() {
        mdc.textField.MDCTextField.attachTo(this);
    });

    $('.news-slider').slick({
        dots: false,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        prevArrow: '<button type="button" class="slick-prev news__arrow news__arrow--prev"></button>',
        nextArrow: '<button type="button" class="slick-next news__arrow news__arrow--next"></button>',
        responsive: [
            {
              breakpoint: 1280,
              settings: {
                slidesToShow: 3
              }
            }
        ]
    });

    $('#packages-checkbox').change(function(e) {
        if ($(this).prop('checked')) {
            $('#service_packs').fadeOut(500);
            $('#internet_packs').fadeIn(1500);
        }
        else {
            $('#internet_packs').fadeOut(500);
            $('#service_packs').fadeIn(1500);
        }
    });

    // POPUP MENUS

    $('.open_popup_menu').mouseover(function(e) {
        var top = $(this).offset().top;
        var link_height = $(this).innerHeight();
        var left = $(this).offset().left;
        var menu = $(this).attr('data-popup');
        var width = $(menu).width();
        var height = $(menu).height();
        var order = $(menu).index();
        var left_position = 0;

        if (order > 1) {
            left_position = -((order-1) * 284) - 654;
        }
        else {
            left_position = -(order * 284);
        }

        if ($(this).hasClass('header-bottom__link')) {
            link_height -= 22;
        }

        $('.popup-wrap').css({'left': left+'px', 'top': top+link_height+'px'}).removeClass('popup-wrap--noPointers');
        $('.popup__mask').css({'height': height+'px', 'width': width+'px'});
        $('.popup__list.popup__list--active').removeClass('popup__list--active').addClass('popup__list--inactive');
        $(menu).removeClass('popup__list--inactive').addClass('popup__list--active');
        $('.popup__menus').css({'left': left_position+'px'});
        $('.popup').css({'width': width+'px'}).removeClass('popup--exitDone').addClass('popup--enterDone');
    });

    $('.open_popup_menu').mouseleave(function(e) {
        if (!$('.popup-wrap').is(':hover')) {

            $('.popup-wrap').addClass('popup-wrap--noPointers');
            $('.popup').removeClass('popup--enterDone').addClass('popup--exitDone');
        }
    });

    $('.popup-wrap').mouseleave(function(e) {
        $('.popup-wrap').addClass('popup-wrap--noPointers');
        $('.popup').removeClass('popup--enterDone').addClass('popup--exitDone');
    });






    // media

    if ($(window).width() < 1280) {
        $('.services__left').append($('.services__item--4'));
    }

    $(window).resize(function(e) {
        if ($(window).width() < 1280) {
            $('.services__left').append($('.services__item--4'));
        }
        else {
            $('.services__item--3').after($('.services__item--4'));
        }
    });

});

function blockAnimate() {
    var length = $('.text .text-block').length - 1;
    $('.text .text-block').each(function(index) {
        if($(this).hasClass('active') && index != length) {
            $(this).removeClass('active').fadeOut(1000).next('.text-block').addClass('active').fadeIn(1000);
            return false;
        } else if (index == length) {
            $(this).removeClass('active').fadeOut(1000);
            $('.text .text-block').eq(0).addClass('active').fadeIn(1000);
            return false;
        }
    });
};