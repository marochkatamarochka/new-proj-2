const findBlockByAlias = alias => {
    $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") == alias;
    });
};

$(".interactive-avatar__link").click( e => {
    e.preventDefault();

    const $this = $(e.cerrentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".reviews__switcher-item");

    itemToShow.addClass("active").sublings().removeClass("active");
    curItem.addClass("active").sublings().removeClass("active");
});