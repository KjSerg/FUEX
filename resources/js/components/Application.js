import {detectBrowser, hidePreloader, isHorizontal, isMobile, showPreloader} from "./utils/_helpers";
import {burger} from "./ui/_burger";
import {accordion} from "./ui/_accardion";
import {numberInput} from "./forms/_number-input";
import {showPassword} from "./forms/_show-password";
import {fancyboxInit} from "../plugins/_fancybox-init";
import {selectrickInit} from "../plugins/_selectric-init";
import FormHandler from "./forms/FormHandler";
import {toggler} from "./ui/_togglers";
import {tabs} from "./ui/_tabs";
import Slick from "../plugins/Slick";
import {copyLink} from "./ui/_copy-link";

export default class Application {
    constructor() {
        this.$doc = $(document);
        this.$body = $("body");
        this.parser = new DOMParser();
        this.init();
    }

    init() {
        const t = this;
        this.initBrowserAttributes();
        this.initComponents();
        $(document).ready(t.setRowsItemContentHeight);
        $(window).on('resize', t.setRowsItemContentHeight);
    }

    showLoaderOnClick() {
        this.$doc.on('click', 'a.show-load, .header a, .footer a', function (e) {
            let href = $(this).attr('href') || '';
            let target = $(this).attr('target') || '';
            let test = !href.includes('#') &&
                !href.includes('tel') &&
                !href.includes('mailto') &&
                target !== '_blank';
            if (test) {
                showPreloader();
                setTimeout(hidePreloader, 3000);
            }

        });
    }

    initBrowserAttributes() {
        const browserName = detectBrowser();
        this.$body.attr("data-browser", browserName).addClass(browserName);
        $(window).on('load resize', (e) => {
            const attr = window.innerWidth > window.innerHeight ? 'horizontal' : 'vertical'
            this.$body.attr("data-screen-position", attr);
            this.$body.attr("data-mobile", isMobile ? "mobile" : '');
        });
    }


    setRowsItemContentHeight() {
        const $el = $('.advantages-item-content');
        if($(window).width() <= 1023) {
            $el.removeAttr('style');
            return;
        }
        var maxHeight = 0;

        // Скидаємо попередні висоти
        $el.css('height', 'auto');

        // Знаходимо максимальну висоту
        $el.each(function () {
            var height = $(this).outerHeight();
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        // Встановлюємо максимальну висоту
        $el.css('min-height', maxHeight);
    }

    trendsTableFormInit(){
        $(document).on('click','.trends-table-search:not(.active)', function () {
           $(this).addClass('active');
           $(this).find('input').focus();
        });
        $(document).mouseup( function(e){
            var div = $( ".trends-table-search" );
            if ( !div.is(e.target)
                && div.has(e.target).length === 0 ) {
                div.removeClass('active');
            }
        });
    }


    initComponents() {
        let t = this;

        this.$doc.ready(() => {
            hidePreloader();
            burger();
            toggler();
            accordion();
            numberInput();
            showPassword();
            selectrickInit();
            fancyboxInit();
            tabs();
            copyLink();
            t.loadMore();
            t.trendsTableFormInit();
            this.showLoaderOnClick();
            this.linkListener();
            const form = new FormHandler('.form-js');
            const slick = new Slick();
            slick.gallerySliderRefresh();
        });

    }


    linkListener() {
        const t = this;
        this.$doc.on('click', 'a[href*="#"]:not(.fancybox, .accordion-head, .single-gallery__image, .cars-head__link)', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    if ($t.hasClass('not-scroll')) return;
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
    }

    loadMore() {
        let load = false;
        const parser = new DOMParser();
        $(document).on('click', '.button-load-more', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (load) return;
            const $pagination = $(document).find('.pagination-container');
            showPreloader();
            $pagination.addClass('not-active');
            $t.addClass('not-active');
            $.ajax({
                type: 'GET',
                url: href,
            }).done(function (r) {
                hidePreloader();
                let $requestBody = $(parser.parseFromString(r, "text/html"));
                $(document).find('.container-js').append($requestBody.find('.container-js').html());
                $pagination.html($requestBody.find('.pagination-container').html());
                load = false;
                $pagination.removeClass('not-active');
                $t.remove();
            });
        });
    }
}