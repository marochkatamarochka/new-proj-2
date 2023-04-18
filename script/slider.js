const slider = $('.long__slider').bxSlider({
    pager: false,
    controls: false
});

$('.slider__prod--back').click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
})
$('.slider__prod--next').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
})