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






    $('.detail__product-slide').fancybox({
        thumbs: {
            showOnStart: true
        }
    })


    $('.js-other-side').on('mouseover', function() {
        var $this = $(this);
        changeImg($this, 'data-other-side', 'data-img-old')
        // var tempImg = $(this).attr('data-other-side');
        // var oldImg = $(this).find('img').attr('src');
        // $(this).attr('data-img-old',oldImg);
        // $(this).addClass('active');
        // $(this).find('img').attr('src',tempImg);
    });

    $('.js-other-side').on('mouseout', function() {
        if ($(this).hasClass('active')) {
            var $this = $(this);
            changeImg($this, 'data-img-old', 'data-other-side')
            $this.removeClass('active')
            // var tempImg = $(this).attr('data-img-old');
            // var oldImg = $(this).find('img').attr('src');
            // $(this).attr('data-other-side',oldImg);
            // $(this).addClass('active');
            // $(this).find('img').attr('src',tempImg);
        }
    });

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

var changeColor = (function() {
    var $color = $('.js-change-color');

    $color.on('mouseover', function() {
        var targetHref = $(this).attr('data-href');

        $(this).closest('.new-items__slide').find('.new-items__main-image').attr('src', targetHref);
    });
})();

var $html = $('html');
var $pageWrapper = $('.page-wrapper');
var $overlay = $('.overlay');

var cart = (function() {
    var $cartBtn = $('.js-show-cart');
    var $cart = $('.cart');
    var $cartClose = $('.js-cart-close');
    var $removeItem = $('.js-remove-cart-item');


    $cartBtn.on('mouseover', function() {
        setTimeout(function() {
            if ($cartBtn.is(':hover')) {
                $cart.show();
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
            $cart.hide();
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

    function clearTable(){
        $tableRow.find('.orange').removeClass('orange');
    }
})();

var sizeCategorys = (function(){
    var $topLink = $('.js-top-category');
    var $innerLink = $('.js-inner-category');
    var $currentLink = $('.js-current-category');
    var $infoWrapper = $('.info-main');


    $topLink.on('click',function(e){
        e.preventDefault();
        $topLink.removeClass('active');
        $innerLink.removeClass('active');
        $(this).addClass('active');
        $(this).next('.size-info__inner-category-wrap').find('.size-info__inner-category-link').eq(0).addClass('active');
    });

    $innerLink.on('click',function(e){
        e.preventDefault();
        $innerLink.removeClass('active');
        $(this).addClass('active');
    });

    $currentLink.on('click',function(e){
        e.preventDefault();
        $infoWrapper.removeClass('active');
        var $target = $(this).attr('href');
        $currentLink.removeClass('active');
        $(this).addClass('active');

        $($target).addClass('active');
    });
})();
