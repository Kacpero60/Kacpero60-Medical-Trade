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
    const headerLink = document.getElementById("header-link");
    
    // Sprawdzenie, czy element istnieje, zanim dodamy nasłuch zdarzeń
    if (headerLink) {
        headerLink.addEventListener("click", () => {
            console.log("Kliknięto link w nagłówku!");
        });
    } else {
        console.warn("Element #header-link nie został znaleziony.");
    }
});

// header.js
$(document).ready(function() {
    $('#header').load('/src/partials/header.html', function() {
        // Dodaj obsługę kliknięcia dla linku Inquiry & Orders
        const inquiryLink = document.getElementById("inquiry");
        if (inquiryLink) {
            inquiryLink.addEventListener("click", (event) => {
                event.preventDefault();
                loadContent('/src/partials/inquiry_orders.html', 'hero');
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const headerLink = document.getElementById("header-link");
    if (headerLink) {
        headerLink.addEventListener("click", () => {
            console.log("Kliknięto link w nagłówku!");
            // tutaj możesz dodać inne akcje
        });
    } else {
        console.warn("Element #header-link nie został znaleziony. Sprawdź, czy identyfikator jest poprawny.");
    }
});
