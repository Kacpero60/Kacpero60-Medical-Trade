// Animacja płynnego pojawiania się strony przy ładowaniu
document.addEventListener("DOMContentLoaded", function() {
    document.body.style.opacity = 0;
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = 1;
});

// Funkcja do animowania paska przewijania
window.onscroll = function() {scrollIndicator()};

function scrollIndicator() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-indicator").style.width = scrolled + "%";
}
