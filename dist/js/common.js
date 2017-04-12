'use strict';
if (!window.console) window.console = {};
if (!window.console.memory) window.console.memory = function() {};
if (!window.console.debug) window.console.debug = function() {};
if (!window.console.error) window.console.error = function() {};
if (!window.console.info) window.console.info = function() {};
if (!window.console.log) window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------
if (!Modernizr.flexbox) {
    (function() {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            noFlexboxStickyFooter = function() {
                $pageBody.height('auto');
                if ($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
                } else {
                    $pageWrapper.height('auto');
                }
            };
        $(window).on('load resize', noFlexboxStickyFooter);
    })();
}
if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
    (function() {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            ieFlexboxFix = function() {
                if ($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageWrapper.height($(window).height());
                    $pageBody.removeClass('flex-none');
                } else {
                    $pageWrapper.height('auto');
                }
            };
        ieFlexboxFix();
        $(window).on('load resize', ieFlexboxFix);
    })();
}

$(window).on('load', function() {
    $('.page-wrapper').css('opacity', 1);
})

$(function() {

    // placeholder
    //-----------------------------------------------------------------------------
    $('input[placeholder], textarea[placeholder]').placeholder();
    $('.js-slider').slick({
        infinite: false,
        dots: true,
        arrows: false,
    });

    $('.js-slider').on('afterChange ', function(event, slick, currentSlide) {
        var target = $('.banner__slider-wrap').find('.banner__slide').eq(currentSlide)[0];
        console.log($(target).hasClass('video'));
        if ($(target).hasClass('video')) {
            setTimeout(function() {
                $('.banner__slide.slick-current').find('video')[0].play()

            }, 500)
        }
    });

    $(document).on('click', '.js-arrows', function(e) {
        e.preventDefault();
        $('.js-slider').slick($(this).attr('data-slider'));
    });


    $('.js-new-items').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
        arrows: false,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ],


        swipeToSlide: true,
    });

    $(document).on('click', '.js-new-arrows', function(e) {
        e.preventDefault();
        $('.js-new-items').slick($(this).attr('data-slider'));
    });

    $('.js-close-info-message').on('click', function() {
        $('.info-messages').slideUp();
    });




    $('.js-detail-bottom').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
        arrows: false,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ],


        swipeToSlide: true,
    });

    $(document).on('click', '.js-detail-bottom-arrows', function(e) {
        e.preventDefault();
        $('.js-detail-bottom').slick($(this).attr('data-slider'));
    });



    $('.detail .js-product-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }],
    });

    $('.js-quick-buy').fancybox({
        afterLoad: function() {
            $('.quick-buy .js-product-slider').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                arrows: true,
                swipeToSlide: true,
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }],
            });

        },
        afterClose	 : function(){
            setTimeout(function(){
                hideImg()
            },100)
        }
    })






    $('.detail__product-slide').fancybox({
        thumbs: {
            showOnStart: true
        }
    })


    $('.js-other-side').on('mouseover', function() {
        var $this = $(this);
        changeImg($this, 'data-other-side', 'data-img-old')
    });

    $('.js-other-side').on('mouseout', function() {

        var $this = $(this);
        hideImg($this);

    });

    function hideImg(){
        var $this = $('.js-other-side.active')
        changeImg($this, 'data-img-old', 'data-other-side')
        $this.removeClass('active');
    }

    function changeImg($this, oldAtr, newAtr) {
        var tempImg = $this.find('.catalog__main-item-photo').attr(oldAtr);
        var oldImg = $this.find('img').attr('src');
        $this.find('.catalog__main-item-photo').attr(newAtr, oldImg);
        $this.addClass('active');
        $this.find('img').attr('src', tempImg);

    }
});


var dropInner = (function() {
    var $btn = $('.js-show-drop-inner');
    var $droplist = $('.header__main-drop-list');
    var $drop = $('.header__drop');

    $btn.on('mouseover', function() {
        $(this).closest('.header__main-drop-list').find('.header__main-drop-link').removeClass('active');
        $(this).addClass('active');

        $(this).closest('.header__main-drop').find('.header__drop-inner').removeClass('active');

        var tempTarget = $(this).attr('href');
        $(tempTarget).addClass('active');
    });
})();

// var changeColor = (function() {
//     var $color = $('.js-change-color');
//
//     $color.on('mouseover', function() {
//         var targetHref = $(this).attr('data-href');
//
//         $(this).closest('.new-items__slide').find('.new-items__main-image').attr('src', targetHref);
//     });
// })();

var $html = $('html');
var $pageWrapper = $('.page-wrapper');
var $overlay = $('.overlay');

var cart = (function() {
    var $cartBtn = $('.js-show-cart');
    var $cart = $('.cart');
    var $cartClose = $('.js-cart-close');
    var $removeItem = $('.js-remove-cart-item');
    $cart.show();

    $cartBtn.on('mouseover', function() {
        setTimeout(function() {
            if ($cartBtn.is(':hover')) {

                setTimeout(function() {
                    $cart.addClass('active');
                    $html.addClass('hidden');
                    $overlay.fadeIn();
                    $pageWrapper.addClass('hidden move-left');
                }, 10);
            }
        }, 500)
    });

    $cartClose.on('click', function(e) {
        e.preventDefault();
        closeCart();

    });
    $overlay.on('click', function(e) {
        e.preventDefault();
        closeCart();
    });

    $removeItem.on('click', function(e) {
        e.preventDefault();

        $(this).closest('.cart__item').fadeOut(200, function() {
            $(this).remove();
        })
    })

    function closeCart() {
        $cart.removeClass('active');
        $pageWrapper.removeClass('hidden move-left');
        $html.removeClass('hidden');
        $overlay.fadeOut();
        setTimeout(function() {
            // $cart.hide();
        }, 350)
    }
})();

var mobileMenu = (function() {
    var $btn = $('.js-submenu');
    var $back = $('.js-menu-back');
    var $menuBtn = $('.js-show-menu');
    var $menu = $('.mobile-menu');
    var $closeMenu = $('.js-close-menu');

    $btn.on('click', function(e) {
        e.preventDefault();
        $(this).next('.level').addClass('current');
    });

    $back.on('click', function(e) {
        e.preventDefault();
        $(this).closest('.level.current').removeClass('current');
    });


    $menuBtn.on('click', function(e) {
        e.preventDefault();
        $menu.show();
        setTimeout(function() {
            $menu.addClass('active');
            $html.addClass('hidden');
            $overlay.fadeIn();
            $pageWrapper.addClass('hidden move-right');
        }, 10);
    });

    $closeMenu.on('click', function(e) {
        e.preventDefault();
        closeMenu();
    });
    $overlay.on('click', function(e) {
        e.preventDefault();
        closeMenu();
    });

    function closeMenu() {
        $menu.removeClass('active');
        $pageWrapper.removeClass('hidden move-right');
        $html.removeClass('hidden');
        $overlay.fadeOut();
        setTimeout(function() {
            $menu.hide();
        }, 350)
    }
})();

var callback = (function() {
    var $btn = $('.js-show-callback');
    var $callback = $('.header__callback');

    $btn.on('click', function(e) {
        e.preventDefault();
        $callback.show();
        setTimeout(function() {
            $callback.addClass('active');
            $html.addClass('hidden');
            $overlay.fadeIn();
            $pageWrapper.addClass('hidden');
        }, 10);
    });
    $overlay.on('click', function(e) {
        e.preventDefault();
        closeCallback();
    });

    function closeCallback() {
        $callback.removeClass('active');
        $pageWrapper.removeClass('hidden move-right');
        $html.removeClass('hidden');
        $overlay.fadeOut();
        setTimeout(function() {
            $callback.hide();
        }, 350)
    }
})()

var search = (function() {
    var $btn = $('.js-show-search');
    var $search = $('.header__search');
    var $closeSearch = $('.js-close-search');

    $btn.on('click', function(e) {
        e.preventDefault();

        $search.slideDown();
    });

    $closeSearch.on('click', function(e) {
        e.preventDefault();

        $search.slideUp();
    });
})();

var category = (function() {
    var $btn = $('.js-show-category');

    $btn.on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).next('.js-show-category-body').slideUp();
            return false;
        }
        $btn.removeClass('active');
        $btn.next('.js-show-category-body').slideUp();
        $(this).addClass('active');
        $(this).next('.js-show-category-body').slideDown();
    })
})();


var priceRange = (function() {
    var range = $('#priceRange');
    var minMax = [parseInt(range.attr('data-set-min')), parseInt(range.attr('data-set-max'))];
    var inputMin = $('.price-inputs__input--min');
    var inputMax = $('.price-inputs__input--max');
    range.slider({
        range: true,
        min: minMax[0],
        max: minMax[1],
        values: [minMax[0], minMax[1]],
        step: 1,
        slide: function(event, ui) {
            inputMin.val(ui.values[0])
            inputMax.val(ui.values[1])
        }
    });

    inputMin.val(minMax[0])
    inputMax.val(minMax[1])

})();


var filter = (function() {
    var $btn = $('.js-show-filter');
    var $aside = $('.catalog__aside');
    var $wrap = $('.catalog__main');


    $btn.on('click', function(e) {
        e.preventDefault();
        if ($('.catalog__aside').is(':visible')) {
            closeFilter();
        } else {
            openFilter();
        }

        changeText($(this));


    });

    if ($(window).outerWidth() < 767) {
        changeText($btn);
    }

    function openFilter() {
        $aside.show();
        $aside.fadeIn(200)
        $btn.removeClass('active');
        $wrap.removeClass('active');
    }

    function closeFilter() {
        $aside.fadeOut(200, function() {
            $aside.hide();
            $btn.addClass('active');
            $wrap.addClass('active animate');
        });

    }

    function changeText($this) {
        var newText = $this.attr('data-text');
        var oldText = $this.text();
        $this.text(newText);

        $this.attr('data-text', oldText)
    }
})();


var detailPageSlide = (function() {
    var $link = $('.js-go-to-slide');
    var $slider = $('.js-product-slider');

    $link.on('click', function(e) {
        e.preventDefault();
        var targetNumber = ($(this).attr('href') - 1) == ($('.js-product-slider').find('.detail__product-slide').length - 1) ? $(this).attr('href') - 2 : $(this).attr('href') - 1;
        $slider.slick('slickGoTo', targetNumber);
    })


    $('.js-product-slider').on('afterChange', function(event, slick, currentSlide) {
        $('.js-go-to-slide').removeClass('active');
        $('.js-go-to-slide').eq(currentSlide).addClass('active');
    });
})();

var customSizeSelect = (function() {
    var $select = $('.js-custom-size');
    var $parent = $select.parent();
    var $selectList = $('.detail__size-list');
    var $sizeName = $('.detail__size-name');
    var $btn = $('.js-show-drop-select');
    var $drop = $('.detail__size-dropdown');

    //change select value

    $(document).on('click', '.detail__size-item', function(e) {
        e.preventDefault();
        if ($(this).hasClass('disabled') || $(this).hasClass('selected')) {
            return false;
        }
        var targetValue = $(this).attr('data-value');
        $('.js-custom-size').find('option[value="' + targetValue + '"]').prop('selected', true);
        $('.detail__size-item').removeClass('selected');
        $(this).addClass('selected');
        showSizeInButton(targetValue);
    });

    $select.on('change', function() {
        getCustomList();
        var targetValue = $(this).find('option:selected').val();
        showSizeInButton(targetValue);
    });


    $btn.on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            closeDrop();
        } else {
            $(this).addClass('active')
            $drop.fadeIn(150);
        }
    });



    getCustomList()

    function getCustomList() {
        var sizes = [];

        $select.find('option').each(function(key, value) {
            sizes.push({
                name: $(this).text(),
                value: $(this).val(),
                status: $(this).hasClass('disabled'),
                selected: this.selected
            })
        });

        $selectList.html('');

        $.each(sizes, function(key) {
            var tempClassDisabled = this.status ? 'disabled' : '';
            var tempClassSelectd = this.selected ? 'selected' : '';
            $selectList.append('<li class="detail__size-item ' + tempClassDisabled + tempClassSelectd + '" data-value="' + this.value + '">' + this.name + '</li>')
        });
    }

    function showSizeInButton(size) {
        $sizeName.html('(' + size + ')');
        closeDrop();
    }

    function closeDrop() {
        $btn.removeClass('active');
        $drop.fadeOut(150);

    }

})();


var detailVideo = (function() {
    var $btn = $('.js-show-video');
    var $video = $('.detail__video');

    $btn.on('click', function() {
        $video.show();
        $video.css({
            'height': $('.detail__product-slider').outerHeight(),
            'width': $('.detail__product-slider').outerWidth() / 2
        });
        $video.find('video')[0].play();
    });
})();


var hoverTable = (function() {
    var $tableRow = $('.size-table tr');
    var $tableCell = $tableRow.find('td');

    $tableCell.on('mouseover', function() {
        var $leftCount = $(this).index();
        var $topCount = $(this).closest('tr').index();
        var $table = $(this).closest('table');
        clearTable();
        console.log('left = ' + $leftCount);
        console.log('top = ' + $topCount);

        for (var t = 0; t <= $topCount; t++) {
            $table.find('tr').eq(t).find('td').eq($leftCount - 1).addClass('orange');
            $table.find('tr').eq(t).find('th').eq($leftCount).addClass('orange');
            if (t == $topCount) {
                for (var l = 0; l < $leftCount; l++) {
                    $table.find('tr').eq(t).find('td').eq(l).addClass('orange');
                    $table.find('tr').eq(t).find('th').addClass('orange');
                }
            }
        }
    });
    $tableCell.on('mouseleave', function() {
        clearTable();
    })

    function clearTable() {
        $tableRow.find('.orange').removeClass('orange');
    }
})();

var sizeCategorys = (function() {
    var $topLink = $('.js-top-category');
    var $innerLink = $('.js-inner-category');
    var $currentLink = $('.js-current-category');
    var $infoWrapper = $('.info-main');


    $topLink.on('click', function(e) {
        e.preventDefault();
        $topLink.removeClass('active');
        $innerLink.removeClass('active');
        $(this).addClass('active');
        $(this).next('.size-info__inner-category-wrap').find('.size-info__inner-category-link').eq(0).addClass('active');
    });

    $innerLink.on('click', function(e) {
        e.preventDefault();
        $innerLink.removeClass('active');
        $(this).addClass('active');
    });

    $currentLink.on('click', function(e) {
        e.preventDefault();
        $infoWrapper.removeClass('active');
        var $target = $(this).attr('href');
        $currentLink.removeClass('active');
        $(this).addClass('active');

        $($target).addClass('active');
    });
})();

var changeCartDetail = (function() {
    var $btn = $('.js-change-detail-cart');
    var $changeWrapper = $('.cart-page__change-quantity-wrapper');
    var $close = $('.js-close-change');
    var $save = $('.js-save-change');

    var $sizeSelect = $('.js-select-change');

    var $removeItem = $('.js-remove-item-cart-list');



    $btn.on('click', function(e) {
        e.preventDefault();
        $changeWrapper.addClass('active');

        $sizeSelect.each(function() {
            $(this).attr('data-temp-value', $(this).find('option:selected').val());
        })

    })

    $close.on('click', function(e) {
        e.preventDefault();



        closeChange();
        //возврощяем селекты к дефолтному значение если изменения не сохранены
        setTimeout(function() {
            $sizeSelect.each(function() {
                var oldValue = $(this).attr('data-temp-value');
                $(this).find('option[value="' + oldValue + '"]').prop('selected', true);
            })
        }, 300);
    });

    $sizeSelect.on('change', function() {

        // $(this).attr('data-temp-value', $(this).find('option:selected').val());

    });

    $save.on('click', function(e) {
        e.preventDefault();
        $sizeSelect.each(function() {
            var targetItem = $(this).attr('data-change');
            var tempValue = $(this).find('option:selected').val();
            $(targetItem).find('span').html(tempValue);

            // $('.js-custom-size').find('option[value="' + targetValue + '"]').prop('selected', true);

        });
        closeChange();
    });

    $removeItem.on('click', function(e) {
        e.preventDefault();
        $(this).closest('.cart-page__list-item').fadeOut(200, function() {
            $(this).remove();
        });
    })

    function closeChange() {
        $changeWrapper.removeClass('active');
    }



})();


//Forms Validate

var formValidate = (function() {
    var $loginForm = $('#login-form');

    /*
     _                 _        ______
    | |               (_)       |  ___|
    | |     ___   __ _ _ _ __   | |_ ___  _ __ _ __ ___
    | |    / _ \ / _` | | '_ \  |  _/ _ \| '__| '_ ` _ \
    | |___| (_) | (_| | | | | | | || (_) | |  | | | | | |
    \_____/\___/ \__, |_|_| |_| \_| \___/|_|  |_| |_| |_|
                 __/ |
                |___/                                   */

    $loginForm.on('submit', function() {
        return $loginFormValidate.form()
    })

    var $loginFormValidate = $loginForm.validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
            },
        },
        messages: {
            email: {
                required: 'Введите Email',
                email: 'Введите валидный email'
            },
            password: {
                required: 'Введите свой пароль',
            },
        }
    });
    /*
        _____ _               __   ______
       /  ___| |             /  |  |  ___|
       \ `--.| |_ ___ _ __   `| |  | |_ ___  _ __ _ __ ___
        `--. \ __/ _ \ '_ \   | |  |  _/ _ \| '__| '_ ` _ \
       /\__/ / ||  __/ |_) | _| |_ | || (_) | |  | | | | | |
       \____/ \__\___| .__/  \___/ \_| \___/|_|  |_| |_| |_|
                     | |                                    */

    var $step1 = $('#checkout-step-1');

    $step1.on('submit', function() {
        return $step1Validate.form()
    })

    var $step1Validate = $step1.validate({
        rules: {
            firstname: {
                required: true,
            },
            lastname: {
                required: true,
            },
            phone: {
                required: true,
                digits: true
            },
            email: {
                required: true,
                email: true,
            },
            rules: {
                required: true,
            }
        },
        messages: {
            firstname: {
                required: "Введите свое имя",
            },
            lastname: {
                required: "Введите свою фамилию",
            },
            phone: {
                required: "Введите свою телефон",
            },
            email: {
                required: "Введите свой email",
                email: 'Введите валидный email'
            },
            rules: {
                required: "Вы должны быть согласны с правилами",
            }
        }
    });

    /*
 _____ _   _______  _____ _____ ______ ___________ _____
/  ___| | | | ___ \/  ___/  __ \| ___ \_   _| ___ \  ___|
\ `--.| | | | |_/ /\ `--.| /  \/| |_/ / | | | |_/ / |__
`--. \ | | | ___ \ `--. \ |    |    /  | | | ___ \  __|
/\__/ / |_| | |_/ //\__/ / \__/\| |\ \ _| |_| |_/ / |___
\____/ \___/\____/ \____/ \____/\_| \_|\___/\____/\____/

                                                        */

    var $subscribe = $('#subscribe');

    $subscribe.on('submit', function() {
        console.log('test');
        return $subscribeValidate.form()
    })

    var $subscribeValidate = $subscribe.validate({
        rules: {
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            email: {
                required: 'Введите Email',
                email: 'Введите валидный email'
            },

        }
    });

    //registerUser

    var $register = $('#registerUser');

    $register.on('submit', function() {
        return $registerValidate.form()
    })

    var $registerValidate = $register.validate({
        rules: {
            firstname: {
                required: true,
            },
            lastname: {
                required: true,
            },
            phone: {
                required: true,
                digits: true
            },
            email: {
                required: true,
                email: true,
            },
            rules: {
                required: true,
            },
            password: {
                required: true,
            },
            passwordAgain: {
                equalTo: "#password"
            },
        },
        messages: {
            firstname: {
                required: "Введите свое имя",
            },
            lastname: {
                required: "Введите свою фамилию",
            },
            phone: {
                required: "Введите свою телефон",
            },
            email: {
                required: "Введите свой email",
                email: 'Введите валидный email'
            },
            rules: {
                required: "Вы должны быть согласны с правилами",
            },
            password: {
                required: "Введите пароль",
            },
            passwordAgain: {
                equalTo: "Пароли должны совпадать",
            },
        }
    });

    //remind

    var $remind = $('#remind');

    $remind.on('submit', function() {
        console.log('test');
        return $remindValidate.form()
    })

    var $remindValidate = $remind.validate({
        rules: {
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            email: {
                required: 'Введите Email',
                email: 'Введите валидный email'
            },

        }
    });



})();


//Checkout Form - multiSteps

var checkForm = (function() {
    var $checkbox = $('.js-checkbox');

    var $radio = $('.js-radio');
    var $cartBtn = $('.js-show-small-cart');
    var $cartList = $('.checkout__cart-list')

    $checkbox.on('change', function() {
        $(this).closest('.checkout__option').toggleClass('active');
        $(this).closest('.checkout__option').find('.js-form-wrapper').slideToggle(150);
    });

    $radio.on('click', function() {
        $('.js-radio-content').slideUp(150)
        $(this).closest('.js-radio-parent').find('.js-radio-content').slideDown(150)

    });


    $cartBtn.on('click', function(e) {
        e.preventDefault();

        $cartList.slideToggle(150);
        $(this).toggleClass('active');
        $(this).find('.inner-text > span').toggleClass('v-hidden');


    })
})();

var locationPage = (function() {
    var $btn = $('.js-show-map');
    var load = false;

    if ($('.location').length > 0) {

    }

    $btn.on('click', function(e) {
        var $this = $(this);

        var datalat = parseFloat($this.attr('data-lat'));
        var datalng = parseFloat($this.attr('data-lng'));

        if ($(window).outerWidth() > 767) {
            e.preventDefault();

            if (!load) {
                $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4iiu69HGNYjeWowMnGtdghML_vNg5M_Y"></script>')
                load = !load;
            }

            $this.closest('.location__image-wrap').append('<div class="location__map-wrap"><a href="#" class="location__close"></a><div class="map-wrapper" id="map"></div></div>');

            if ((($this.closest('.location__item').index() + 1) % 2) == 0) {
                $('.location__map-wrap').show().addClass('left');
            } else {
                $('.location__map-wrap').show().addClass('right');

            }
            setTimeout(function() {
                initMap(datalat, datalng);
            }, 500);
        }
    });

    function initMap(datalat, datalng) {
        var myLatLng = {
            lat: datalat,
            lng: datalng
        };

        console.log(myLatLng);

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng
        });
        marker.setMap(map);
    };

    $(document).on('click', '.location__close', function(e) {
        e.preventDefault();
        $(this).closest('.location__map-wrap').remove();
    })
})();


var storyScroll = (function() {
    var $storyWrap = $('.story__item');
    var $storyLink = $('.js-story-scroll');

    $(window).on('load', function() {
        $storyWrap.css('height', $(window).outerHeight())

        if ($(window).outerWidth() < 767) {} else {
            ParallaxScroll.init();
        }
    });

    $storyLink.on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
})();

var addToSave = (function() {

    var $btn = $('.js-add-to-save');

    $btn.on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });



})();


var showLang = (function() {
    var $btn = $('.js-show-lang');
    var $langList = $('.header__top-lang-list');


    $btn.on('click', function(e) {
        e.preventDefault();
        $langList.slideToggle(200);
        $(this).toggleClass('active');
    })
})();
