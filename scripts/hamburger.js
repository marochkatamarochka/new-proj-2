const toggleHamburgerMenu = () => {
    $('#hamburger').toggleClass('hamburger--active');
    $('.menu').toggleClass('menu--active');
}
$('#hamburger').on('click', (e) => {
    e.preventDefault();
    toggleHamburgerMenu();
})

$('.menu__link').on('click', (e) => {
    e.preventDefault();
    toggleHamburgerMenu();
})