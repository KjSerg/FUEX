import 'slick-carousel';



export default class Slick {
    constructor() {
        this.init();
    }

    init() {
        this.gallerySliderInit();
    }

    reviewSliderInit() {

        $(document).find('.reviews-slider').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            $slider.slick({
                slidesToShow: 3,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: true,
                responsive: [

                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 601,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

        });
        $(document).find('.review-car-slider').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            $slider.slick({
                slidesToShow: 1,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: false
            });

        });
    }

    recommendationsSliderInit() {

        $(document).find('.recommendations-slider').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            if ($slider.find('> *').length < 4) {
                $prev.remove();
                $next.remove();
                return;
            }
            $slider.slick({
                slidesToShow: 3,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: true,
                responsive: [

                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 601,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

        });
    }

    gallerySliderInit() {
        $(document).find('.single-gallery').each(function () {
            var currentSlickIndex;
            const $slider = $(this);
            const $section = $slider.closest('section');
            const $prev = $section.find('.slick__prev');
            const $next = $section.find('.slick__next');
            const $preview = $section.find('.single-gallery-preview');

            const param = {
                // lazyLoad: 'ondemand',
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: false,
                // accessibility: true,
                // autoplay: false,
                // infinite: false
            };

            if ($preview.length > 0) {
                $preview.slick({
                    // lazyLoad: 'ondemand',
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: $slider,
                    dots: false,
                    centerMode: false,
                    focusOnSelect: true,
                    arrows: false,
                    infinite: false,
                    responsive: [
                        {
                            breakpoint: 601,
                            settings: {
                                slidesToShow: 3
                            }
                        }
                    ]
                });
                param.asNavFor = $preview;
            }
            if ($slider.find('> *').length > 1) {
                $slider.slick(param);
            }else {
                $slider.find('img').css('opacity', '1');
                $prev.hide();
                $next.hide();
            }

        });
    }

    gallerySliderRefresh() {
        $(window).on('load', function () {
            $(document).find('.single-gallery.slick-slider').each(function () {
                $(this).slick('refresh');
            });
            $(document).find('.single-gallery-preview.slick-slider').each(function () {
                console.log($(this))
                $(this).slick('refresh');
            });
        });
    }
}

