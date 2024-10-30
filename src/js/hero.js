// header.js
$(document).ready(function() {
    $('#header').load('/src/partials/header.html');
});

// hero.js
$(document).ready(function() {
    $('#hero').load('/src/partials/hero.html');
});

// footer.js
$(document).ready(function() {
    $('#footer').load('/src/partials/footer.html');
});


document.addEventListener("DOMContentLoaded", () => {
    const heroButton = document.querySelector(".hero-button");

    // Sprawdzenie, czy element istnieje, zanim dodamy nasłuch zdarzeń
    if (heroButton) {
        heroButton.addEventListener("click", () => {
            console.log("Kliknięto przycisk Hero!");
        });
    } else {
        console.warn("Element .hero-button nie został znaleziony.");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const heroButton = document.querySelector(".hero-button");
    if (heroButton) {
        heroButton.addEventListener("click", () => {
            console.log("Kliknięto przycisk Hero!");
            // tutaj możesz dodać inne akcje
        });
    } else {
        console.warn("Element .hero-button nie został znaleziony. Sprawdź, czy klasa jest poprawna.");
    }
});
