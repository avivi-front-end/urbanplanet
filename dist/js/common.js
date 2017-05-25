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

    $(".js-mask-phone").mask("+380 99-99-99-999");
    $(".js-mask").mask("99/99/99");

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

    $('.js-open-video').on('click', function(e) {
        $('this').toggleClass('active');
        e.preventDefault();
        $('.story__video-container').toggleClass('active');
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



    $('.js-product-slider').slick({
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

    $('.js-blog-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false
    });

    $(document).on('click', '.js-blog-arrows', function(e) {
        e.preventDefault();
         $('.js-blog-slider').slick($(this).attr('data-slider'));
    });


    $('.js-quick-buy').fancybox({
        afterLoad: function() {
            $('.js-popup-slider').slick({
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
    var $container = $(".category__filter-list");

    $btn.on('click', function(e){
        e.preventDefault();
        $(this).next($container).slideToggle(200);
        $btn.not(this).next($container).slideUp(200);
        $btn.not(this).addClass('active');
        $(this).toggleClass('active');

    });
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

var filter = (function(){
    var $btn = $('.js-filter-link');
    var $container = $(".catalog__item-wrap");

    $btn.on('click', function(e){
        e.preventDefault();
        $(this).next($container).slideToggle(200);
        $(this).toggleClass('active');
    });

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

var popuplPageSlide = (function() {
    var $link = $('.js-go-to-slide-popup');
    var $slider = $('.js-popup-slider');

    $link.on('click', function(e) {
        e.preventDefault();
        var targetNumber = ($(this).attr('href') - 1) == ($('.js-product-slider').find('.detail__product-slide').length - 1) ? $(this).attr('href') - 2 : $(this).attr('href') - 1;
        $slider.slick('slickGoTo', targetNumber);
    })


    $('.js-popup-slider').on('afterChange', function(event, slick, currentSlide) {
        $('.js-go-to-slide-popup').removeClass('active');
        $('.js-go-to-slide-popup').eq(currentSlide).addClass('active');
    });
})();

/*var customSizeSelect = (function() {
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
        $(this).getCustomList();
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
})();*/


(function( $ ){

  $.fn.customSelect = function() {
    var $select = this;
    var $parent = $select.parent();
    var $selectList =  $('.detail__size-list');
    var $sizeName =  $('.detail__size-name');
    var $btn =  $('.js-show-drop-select');
    var $drop =  $('.detail__size-dropdown');
    var $wrap = $('.detail__product-size');
    //change select value

    $(document).on('click', '.detail__size-item', function(e) {
        e.preventDefault();
        if ($(this).hasClass('disabled') || $(this).hasClass('selected')) {
            return false;
        }
        var targetValue = $(this).attr('data-value');
        $select.find('option[value="' + targetValue + '"]').prop('selected', true);
        $('.detail__size-item').removeClass('selected');
        $(this).addClass('selected');
        showSizeInButton(targetValue);
    });

    $wrap.find($select).on('change', function() {
        $(this).getCustomList();
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
        var sizes0 = [];
        var sizes1 = [];
        $select.eq(0).find('option').each(function(key, value) {
            sizes0.push({
                name: $(this).text(),
                value: $(this).val(),
                status: $(this).hasClass('disabled'),
                selected: this.selected
            })
        });
        $select.eq(1).find('option').each(function(key, value) {
            sizes1.push({
                name: $(this).text(),
                value: $(this).val(),
                status: $(this).hasClass('disabled'),
                selected: this.selected
            })
        });
        $selectList.html('');
        $.each(sizes0, function(key) {
            var tempClassDisabled = this.status ? 'disabled' : '';
            var tempClassSelectd = this.selected ? 'selected' : '';
            $selectList.eq(0).append('<li class="detail__size-item ' + tempClassDisabled + tempClassSelectd + '" data-value="' + this.value + '">' + this.name + '</li>');
        });
        $.each(sizes1, function(key) {
            var tempClassDisabled = this.status ? 'disabled' : '';
            var tempClassSelectd = this.selected ? 'selected' : '';
            $selectList.eq(1).append('<li class="detail__size-item ' + tempClassDisabled + tempClassSelectd + '" data-value="' + this.value + '">' + this.name + '</li>');
        });
    }

    function showSizeInButton(size) {
        $sizeName.html('' + size + '');
        closeDrop();
    }

    function closeDrop() {
        $btn.removeClass('active');
        $drop.fadeOut(150);
    }

    $(document).mouseup(function (e){ // закрытие селекта при клике вне его
        if (!$btn.is(e.target) && !$drop.is(e.target)) {
            closeDrop(); // скрываем его
        }
    });

  };
})( jQuery );

$('.js-custom-size, .js-custom-size-popup').customSelect();


var detailVideo = (function() {
    var $btn = $('.js-show-video');
    var $video = $('.detail__video');
    var $slider = $('.detailSlider');
    $btn.on('click', function() {
        $(this).parent().parent().find($video).show();
        console.log($(this).parent().parent().find($video).find('video'));
        $(this).parent().parent().find($video).css({
            'height': $slider.outerHeight(),
            'width': $slider.outerWidth() / 2
        });
        $(this).parent().parent().find($video).find('video')[0].play();
    });
    $slider.on('beforeChange', function() {
        $video.hide();
    });
})();

var popupVideo = (function() {
    var $btn = $('.js-show-videoP');
    var $video = $('.detail__video');
    var $sliderPopup = $('.popup-slider');


    $btn.on('click', function() {
        $(this).parent().parent().find($video).show();
        $(this).parent().parent().find($video).css({
            'height': $sliderPopup.outerHeight(),
            'width': $sliderPopup.outerWidth() / 2
        });
        $(this).parent().parent().find($video).find('video')[0].play();
    });
    $sliderPopup.on('beforeChange', function() {
        $video.hide();
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
        $(this).parent().parent().find($changeWrapper).addClass('active');
        $btn.not($(this)).parent().parent().find($changeWrapper).removeClass('active');
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
        $(this).parent().parent().find($sizeSelect).each(function() {
            var targetItem = $(this).attr('data-change');
            var tempValue = $(this).find('option:selected').val();
            $(this).parent().parent().find(targetItem).find('span').html(tempValue);
            // $('.js-custom-size').find('option[value="' + targetValue + '"]').prop('selected', true);
        });
        $(this).parent().parent().find($sizeSelect).each(function() {
            $(this).attr('data-temp-value', $(this).find('option:selected').val());
        })
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
            country: {
                required: true
            },
        },
        messages: {
            email: {
                required: "Введите свою фамилию",
            },

        }
    });

    /*vacancyForm*/

    var $vacancyForm = $('#vacancyForm');

    $vacancyForm.on('submit', function() {
        console.log('test');
        return $vacancyFormValidate.form()
    })

    var $vacancyFormValidate = $vacancyForm.validate({
        rules: {
            country: {
                required: true,
            },
            name: {
                required: true,
            },
            surname: {
                required: true,
            },
            birthdate: {
                required: true,
            },
            region1: {
                required: true,
            },
            region2: {
                required: true,
            },
            registrationCity1: {
                required: true,
            },
            registrationCity2: {
                required: true,
            },
            registrationAdress1: {
                required: true,
            },
            registrationAdress2: {
                required: true,
            },
            phone: {
                required: true,
            },
            email: {
                required: true,
            },
            family: {
                required: true,
            },
            where: {
                required: true,
            },
            period1: {
                required: true,
            },
            period2: {
                required: true,
            },
            period3: {
                required: true,
            },
            period4: {
                required: true,
            },
            studyForm: {
                required: true,
            },
            studyStage: {
                required: true,
            },
            typeStudy: {
                required: true,
            },
            education: {
                required: true,
            },
            specialty: {
                required: true,
            },
            workPlace: {
                required: true,
            },
            career: {
                required: true,
            },
            VacancyPrestige: {
                required: true,
            },
            money: {
                required: true,
            },
            stability: {
                required: true,
            },
            newExperience: {
                required: true,
            },
            possibility: {
                required: true,
            },
            interest: {
                required: true,
            },
            distance: {
                required: true,
            },
            CompanyPrestige: {
                required: true,
            },
            collective: {
                required: true,
            },
            reason1: {
                required: true,
            },
            reason2: {
                required: true,
            },
            reason3: {
                required: true,
            },
            position: {
                required: true,
            },
            salary1: {
                required: true,
            },
            salary2: {
                required: true,
            },
        },
        messages: {
            country: {
                required: 'Оберіть місто',
            },
            name: {
                required: 'Введите свое имя',
            },
            surname: {
                required: 'Це поле необхідно заповнити',
            },
            birthdate: {
                required: 'Це поле необхідно заповнити',
            },
            region1: {
                required: 'Оберіть регіон',
            },
            region2: {
                required: 'Оберіть регіон',
            },
            registrationCity1: {
                required: 'Це поле необхідно заповнити',
            },
            registrationCity2: {
                required: 'Це поле необхідно заповнити',
            },
            registrationAdress1: {
                required: 'Це поле необхідно заповнити',
            },
            registrationAdress2: {
                required: 'Це поле необхідно заповнити',
            },
            phone: {
                required: 'Це поле необхідно заповнити',
            },
            email: {
                required: 'Це поле необхідно заповнити',
            },
            family: {
                required: 'Це поле необхідно заповнити',
            },
            where: {
                required: 'Це поле необхідно заповнити',
            },
            period1: {
                required: 'Це поле необхідно заповнити',
            },
            period2: {
                required: 'Це поле необхідно заповнити',
            },
            period3: {
                required: 'Це поле необхідно заповнити',
            },
            period4: {
                required: 'Це поле необхідно заповнити',
            },
            studyForm: {
                required: 'Це поле необхідно заповнити',
            },
            studyStage: {
                required: 'Це поле необхідно заповнити',
            },
            typeStudy: {
                required: 'Це поле необхідно заповнити',
            },
            education: {
                required: 'Вкажіть рівень',
            },
            specialty: {
                required: 'Це поле необхідно заповнити',
            },
            workPlace: {
                required: 'Це поле необхідно заповнити',
            },
            career: {
                required: 'Це поле необхідно заповнити',
            },
            VacancyPrestige: {
                required: 'Це поле необхідно заповнити',
            },
            money: {
                required: 'Це поле необхідно заповнити',
            },
            stability: {
                required: 'Це поле необхідно заповнити',
            },
            newExperience: {
                required: 'Це поле необхідно заповнити',
            },
            possibility: {
                required: 'Це поле необхідно заповнити',
            },
            interest: {
                required: 'Це поле необхідно заповнити',
            },
            distance: {
                required: 'Це поле необхідно заповнити',
            },
            CompanyPrestige: {
                required: 'Це поле необхідно заповнити',
            },
            collective: {
                required: 'Це поле необхідно заповнити',
            },
            reason1: {
                required: 'Це поле необхідно заповнити',
            },
            reason2: {
                required: 'Це поле необхідно заповнити',
            },
            reason3: {
                required: 'Це поле необхідно заповнити',
            },
            position: {
                required: 'Це поле необхідно заповнити',
            },
            salary1: {
                required: 'Це поле необхідно заповнити',
            },
            salary2: {
                required: 'Це поле необхідно заповнити',
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
                required: "Введите свой телефон",
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
            typeStudy: {
                equalTo: "Пароли должны совпадать",
            },
        }
    });


    //privateData

    var $privateData = $('#privateData');

    $privateData.on('submit', function() {
        return $privateDataValidate.form()
    })

    var $privateDataValidate = $privateData.validate({
        rules: {
            name: {
                required: true,
            },
            surname: {
                required: true,
            },
            country: {
                required: true
            },
            sex: {
                required: true,
            },
            phone: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            }
        },
        messages: {
            name: {
                required: "Введите свое имя",
            },
            surname: {
                required: "Введите свою фамилию",
            },
            country: {
                required: "Введите город доставки"
            },
            sex: {
                required: "Выберите ваш пол",
            },
            phone: {
                required: "Введите ваш телефон",
            },
            email: {
                required: "Введите свой email",
                email: 'Введите валидный email'
            }
        }
    });


    //speed-order

    var $speedOrder = $('#speedBuy');

    $speedOrder.on('submit', function() {
        return $speedOrderValidate.form()
    })

    var $speedOrderValidate = $speedOrder.validate({
        rules: {
            name: {
                required: true,
            },
            phone: {
                required: true,
            }
        },
        messages: {
            name: {
                required: "Введите свое имя",
            },
            phone: {
                required: "Введите свой телефон",
            }
        }
    });

    //contactForm

    var $contactForm = $('#contactForm');

    $contactForm.on('submit', function() {
        return $contactValidate.form()
    })

    var $contactValidate = $contactForm.validate({
        rules: {
            name: {
                required: true,
            },
            adress: {
                required: true,
            },
            phone: {
                required: true,
                digits: true
            },
            theme: {
                required: true
            },
            mess: {
                required: true,
            }
        },
        messages: {
            name: {
                required: "Введите свое имя",
            },
            adress: {
                required: "Введите свой адрес",
            },
            phone: {
                required: "Введите свой телефон",
            },
            theme: {
                required: "Введите тему вопроса"
            },
            mess: {
                required: "Введите ваше сообщение",
            }
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

    //newpass

    var $newpass = $('#newpass');

    $newpass.on('submit', function() {
        console.log('test');
        return $newpassValidate.form()
    })

    var $newpassValidate = $newpass.validate({
        rules: {
            actualpass: {
                required: true
            },
            newpass: {
                required: true
            },
            repeatpass: {
                required: true
            }
        },
        messages: {
            actualpass: {
                required: 'Введіть пароль'
            },
            newpass: {
                required: 'Введіть новий пароль'
            },
            repeatpass: {
                required: 'Пароли должны совпадать'
            }
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

    $radio.on('click', function(e) {
        $('.js-radio-content').slideUp(150);
        $(this).closest('.js-radio-parent').find('.js-radio-content').slideDown(150);

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

var colorSwitch = (function(){
    var $color = $('.detail__product-link');

    $color.on('click', function(e){
        e.preventDefault();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

})();

var productReturn = (function(){
    var $btn = $('.js-product-choice');
    var $inputName = $('.js-input-return');
    var $input = [
        $('input[name="product-size"]'),
        $('input[name="product-color"]'),
        $('input[name="product-id"]')
    ]

    $btn.on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        var $size = $this.parent().find('.product-choice__size .active').text();
        var $color = $this.parent().find('.product-choice__color .active img').attr('alt');
        var $name  = $this.parent().find('.js-product-name').text();
        var $id = $this.parent().data('id');
        $inputName.val($name);
        $input[0].val($size);
        $input[1].val($color);
        $input[2].val($id);
        $this.parent().parent().slideUp();
    });

})();

var historyOpen = (function(){
    var $btn = $('.js-history-open');
    var $wrap = $('.history__item');
    var $inner = $('.history__inner');

    $btn.on('click', function(e){
        var $this = $(this);
        e.preventDefault();
        $this.toggleClass('active');
        if($this.hasClass('active')){
            $this.parent().find('.js-hide').hide();
            $wrap.not($this.parent()).find($btn).removeClass('active');
            $wrap.not($this.parent()).find('.js-hide').show();
            $wrap.find($inner).slideUp();
            $this.closest($wrap).find($inner).slideDown();
        } else{
            $this.closest($wrap).find($inner).slideUp();
            $this.parent().find('.js-hide').show();
        }
    });
})();

var map = (function(){
    var $mapLink = $('.location-link');

    $(window).on('click', function(){
        $('.history__popup').hide();
    });

    $mapLink.on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        $this.toggleClass('active');
        $mapLink.not($(this)).removeClass('active');
        $mapLink.next().hide();
        if($mapLink.hasClass('active')){
            $this.next().show();
        }
        return false;
    });

})();

var vacancyForm = (function(){
    var $check = $('.js-vacancy-check');
    var $input = $('.js-vacancy-input');
    var $btnAdd = $('.js-add-form');
    var $copyBlock = $('.vacancy-form__block');

    $btnAdd.on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        $this.parent().prev().find('.vacancy-form__block').first().clone().appendTo($this.parent().prev());
        $this.parent().prev().find('.vacancy-form__block').last().find('.js-vacancy-input').val('');
        $(".js-mask").mask("99/99/99");
    });

    $check.change(function(){
        if($('.js-vacancy-check').is(':checked')){
            $('.vacancy__dis').attr('disabled', true);
        } else{
            $('.vacancy__dis').removeAttr('disabled');
        }
    });

    /*$("#vacancyForm").on( "submit", function( event ) {
      event.preventDefault();
      $(this).serialize();
      console.log( $(this).serialize() );
    });*/


})();

var vacancyList = (function(){
    var $btn = $('.js-vacancy-toggle');
    var $wrap = $('.js-vacancy-wrap');

    $btn.on('click', function(e){
        var $this = $(this);
        e.preventDefault();
        $this.toggleClass('active');
        $btn.not($this).removeClass('active');
        /*$this.parent().find($wrap).slideDown();*/
        if($this.hasClass('active')){
            $this.parent().find($wrap).slideDown();
            $btn.not($this).parent().find($wrap).slideUp();
        } else{
            $this.parent().find($wrap).slideUp();
        }
    });

})();

var titleHeight = (function(){
    var $title = $('.js-height');
    var max = 0;
    $title.each(function(){
        if($(this).height() > max) {
            max = $(this).height(); //нахожу высоту самого высокого блока
        }
    });
    $title.height(max);

})();

var detailSize = (function(){
    var $select = $('.js-detail-size');
    var $btn = $('.js-detail-btn');
    var $text = $('.detail__speed-text');

    $select.find('.detail__size-item').not('.disabled').on('click', function(){
        $btn.removeClass('disabled');
        $text.hide();
    });
    console.log($select.find('.detail__size-item:first-child'));

    $btn.addClass('disabled');

})();
