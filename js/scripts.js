$(document).ready(function(){

    // modals

    //$('#request-modal').modal('show');
    //$('#request_no_connect-modal').modal('show');
    //$('#request_no_connect-modal2').modal('show');
    
    function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    }

    var ww = $(window).width() + getScrollbarWidth();

    // head slider

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
                    arrows: false
                }
            }
        ]
    });

    // inputs

    $('.mdc-text-field').each(function() {
        mdc.textField.MDCTextField.attachTo(this);
    });

    // news slider

    if (ww > 1023) {
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
    }

    // packages switch

    $('#packages-checkbox').change(function(e) {
        if ($(this).prop('checked')) {
            $('#service_packs').fadeOut(0);
            $('#internet_packs').fadeIn(300);
        }
        else {
            $('#internet_packs').fadeOut(0);
            $('#service_packs').fadeIn(300);
        }
    });



    // media

    if (ww < 1280) {
        if (ww > 767) {
            $('.services__left').append($('.services__item--4'));
        }
        else {
            $('.modal').each(function() {
                var id = '#' + $(this).attr('id');

                $(id+' .modal__title').prependTo($(id+' .modal__content'));
            });

            // mobile menu constructor

            mobile_menu_constructor();
        }

        if (ww < 1024) {
            $('.footer-top__contacts').append($('.footer-bottom__socials'));
        }
    }

    $(window).resize(function(e) {
        ww = $(window).width() + getScrollbarWidth();
        if (ww < 1280) {
            if (ww > 767) {
                $('.services__left').append($('.services__item--4'));
            }
            else {
                $('.services__item--3').after($('.services__item--4'));

                $('.modal').each(function() {
                    var id = '#' + $(this).attr('id');

                    $(id+' .modal__title').prependTo($(id+' .modal__content'));
                });

                // mobile menu constructor

                mobile_menu_constructor();

            }

            if (ww < 1024) {
                $('.news-slider.slick-slider').slick('unslick');
                $('.footer-top__contacts').append($('.footer-bottom__socials'));
            }
        }
        else {
            $('.services__item--3').after($('.services__item--4'));
        }

        if (ww > 1023) {
            if (!$('.news-slider').hasClass('slick-slider')) {
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
            }

            $('.footer-bottom__menu').after($('.footer-bottom__socials'));
        }

        if (ww > 767) {
            mobile_menu_destructor();

            $('.modal').each(function() {
                var id = '#' + $(this).attr('id');

                $(id+' .modal__title').prependTo($(id+' .modal__left'));
            });
        }
    });



    // POPUP MENUS

    $('.open_popup_menu').mouseover(function(e) {
        if (ww > 767) {
            var top = $(this).offset().top;
            var link_height = $(this).innerHeight();
            var left = $(this).offset().left;
            var menu = $(this).attr('data-popup');
            var width = $(menu).width();
            var height = $(menu).height();
            var order = $(menu).index();
            var left_position = 0;

            if (ww > 1023) {
                if (order > 1) {
                    left_position = -((order - 1) * 280) - 654;
                }
                else {
                    left_position = -(order * 280);
                }
            }
            else {
                left_position = -(order * 280);
            }

            if ($(this).hasClass('header-bottom__link')) {
                link_height -= 22;
            }

            if ($(this).hasClass('connection__city')) {
                left = left - (width / 2) + 57;
                $('.popup__top').addClass('popup__top--center');
            }
            else {
                $('.popup__top').removeClass('popup__top--center');
            }

            $('.popup-wrap').css({
                'left': left + 'px',
                'top': top + link_height + 'px'
            }).removeClass('popup-wrap--noPointers');
            $('.popup__mask').css({'height': height + 'px', 'width': width + 'px'});
            $('.popup__list.popup__list--active').removeClass('popup__list--active').addClass('popup__list--inactive');
            $(menu).removeClass('popup__list--inactive').addClass('popup__list--active');
            $('.popup__menus').css({'left': left_position + 'px'});
            $('.popup').css({'width': width + 'px'}).removeClass('popup--exitDone').addClass('popup--enterDone');
        }
    });

    $('.open_popup_menu').mouseleave(function(e) {
        if (ww > 767) {
            if (!$('.popup-wrap').is(':hover')) {

                $('.popup-wrap').addClass('popup-wrap--noPointers');
                $('.popup').removeClass('popup--enterDone').addClass('popup--exitDone');
            }
        }
    });

    $('.popup-wrap').mouseleave(function(e) {
        if (ww > 767) {
            $('.popup-wrap').addClass('popup-wrap--noPointers');
            $('.popup').removeClass('popup--enterDone').addClass('popup--exitDone');
        }
    });

    // MOBILE POPUP MENUS

    $('.header-top__mobile-menu').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('header-top__mobile-menu--close');
        $('.mobile-black-bg').toggleClass('mobile-black-bg--show');
        $('body').toggleClass('opened-menu');
        $('.popup-wrap').toggleClass('popup-wrap--mobile_show');
    });

    $('.mobile-black-bg').click(function() {
        $('.popup-wrap').removeClass('popup-wrap--mobile_show');
        $(this).removeClass('mobile-black-bg--show');
        $('body').removeClass('opened-menu');
        $('.header-top__mobile-menu').removeClass('header-top__mobile-menu--close');
    });

    $('.open_popup_menu').click(function(e) {
        e.stopPropagation();
        if (ww < 768) {
            var menu = $(this).attr('data-popup');

            if (!$(this).hasClass('connection__city')) {
                e.preventDefault();

                $(menu).slideToggle();
            }
            else {
                $(menu).addClass('popup__list--mobile_absolute').appendTo($('.connection__title'));
            }
        }
    });

    $('body').click(function (e) {
        if ($('#location-popup').hasClass('popup__list--mobile_absolute') && ww < 768) {
            $('#location-popup').removeClass('popup__list--mobile_absolute');
            $('.open_popup_menu[data-popup="#location-popup"].header-top__link-open').after($('#location-popup'));
        }
    });


});

jQuery.fn.reverseEach = (function () {
    var list = jQuery([1]);
    return function (c) {
        var el, i=this.length;
        try {
            while (i-->0 && (el=list[0]=this[i]) && c.call(list,i,el)!==false);
        }
        catch(e) {
            delete list[0];
            throw e;
        }
        delete list[0];
        return this;
    };
}());

function mobile_menu_constructor() {
    $('.header-bottom__link').reverseEach(function() {
        var id = this.attr('data-popup');

        this.prependTo('.popup__menus');

        if (id != '') {
            this.after($(id));
        }
    });

    $('.header-bottom__button').prependTo($('.popup__menus'));
    $('.header-top__left-links').prependTo($('.popup__menus'));

    $('.open_popup_menu[data-popup="#clients-popup"]').after($('#clients-popup'));
    $('.open_popup_menu[data-popup="#location-popup"].header-top__link-open').after($('#location-popup'));
}

function mobile_menu_destructor() {
    $('#location-popup').prependTo($('.popup__menus'));
    $('#clients-popup').prependTo($('.popup__menus'));
    $('.header-top__logo').after($('.header-top__left-links'));
    $('.header-bottom__link').each(function() {
        $('.header-bottom__menu').append($(this));
    });
    $('.header-bottom__flex').append($('.header-bottom__button'));

    $('.popup__list').attr('style', '');
}