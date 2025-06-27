// main.js — scripts da página

// Carrossel de imagens
$(document).ready(function () {
    console.log('jQuery e Slick estão funcionando.');

    $('.carrossel__slick').slick({
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });
});
