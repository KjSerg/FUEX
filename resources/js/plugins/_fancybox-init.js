import $ from 'jquery';

window.$ = $;
window.jQuery = $;
import '@fancyapps/fancybox';

export const fancyboxInit = () => {
    $('[data-fancybox]').fancybox({
        placeFocusBack: false, backFocus: false
    });
    $(document).on('click', '.fancybox', function (e) {
        e.preventDefault();
        const $t = $(this);
        const href = $t.attr('href');
        if (href === undefined) return;
        const $el = $(document).find(href);
        if ($el.length === 0) return;
        $.fancybox.open($el);
    });
    $(document).on('click', '.close-fancybox-modal', function (e) {
        e.preventDefault();
        $.fancybox.close();
    });

};


export function showMsg(msg = '', title = '') {
    const selector = '#dialog';
    const $modal = $(document).find(selector);
    if ($modal.length === 0) {
        alert(msg);
        return;
    }
    $modal.find('.modal__title').html(title);
    $modal.find('.modal__text').html(msg);
    $.fancybox.open($modal);
    setTimeout(function () {
        $.fancybox.close();
    }, 3000);

}
