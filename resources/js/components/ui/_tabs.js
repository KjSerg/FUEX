export const tabs = () => {
    $(document).on('click', '.tab-head', function (e) {
        e.preventDefault();
        const $this = $(this);
        const selector = $this.attr('href');
        $this.addClass('active');
        if (!selector) return;
        const $element = $(document).find(selector);
        if ($element.length === 0) return;
        let $section = $element.closest('section');
        $section = $section.length === 0 ? $element.closest('footer') : $section;
        $section = $section.length === 0 ? $element.closest('header') : $section;
        const isShowed = $element.hasClass('active');
        $section.find('.tab-head').not($this).removeClass('active');
        $section.find('.tab-content').not($element).removeClass('active');
        if (isShowed) return;
        $element.addClass('active');
    });
}