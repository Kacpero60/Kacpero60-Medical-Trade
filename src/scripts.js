$(document).ready(function() {
    // Ładowanie zawartości header, hero oraz footer
    $('#header').load('/src/partials/header.html', function() {
        console.log("Załadowano header.html");
    });

    // Ładowanie hero.html do sekcji #hero
    loadContent('/src/partials/hero.html', 'hero', function() {
        console.log("Załadowano hero.html");
    });

    $('#footer').load('/src/partials/footer.html', function() {
        console.log("Załadowano footer.html");
    });
});

// Funkcja do dynamicznego ładowania plików HTML do kontenera
function loadContent(filePath, targetElementId, callback) {
    const targetElement = document.getElementById(targetElementId);
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Błąd: ${response.status}`);
            return response.text();
        })
        .then(data => {
            targetElement.innerHTML = data;
            console.log(`Zawartość załadowana do ${targetElementId}`);

            // Dodanie odpowiednich CSS dla różnych sekcji
            if (filePath.includes('inquiry_orders.html')) {
                addCSS('/src/css/inquiry_orders.css');
            } else if (filePath.includes('gallery.html')) {
                addCSS('/src/css/gallery.css');
            } else if (filePath.includes('specification.html')) {
                addCSS('/src/css/specification.css');
            } else if (filePath.includes('disposable_equipment.html')) {
                addCSS('/src/css/disposable_equipment.css');
            } else if (filePath.includes('medical_devices.html')) {
                addCSS('/src/css/medical_devices.css');
            } else if (filePath.includes('hospitals_development.html')) {
                addCSS('/src/css/hospitals_development.css');
            } else {
                removeCSS('/src/css/inquiry_orders.css');
                removeCSS('/src/css/gallery.css');
                removeCSS('/src/css/specification.css');
                removeCSS('/src/css/disposable_equipment.css');
                removeCSS('/src/css/medical_devices.css');
                removeCSS('/src/css/hospitals_development.css');
            }

            // Wywołanie funkcji callback po załadowaniu zawartości
            if (typeof callback === "function") {
                callback();
            }
        })
        .catch(error => console.error("Błąd ładowania treści:", error));
}

// Delegacja zdarzeń do przycisków i linków dynamicznie ładowanych
$(document).on("click", "#expand-button", function() {
    const $details = $("#hero-details");
    if ($details.is(":visible")) {
        $details.slideUp();
        $(this).text("Learn More");
    } else {
        $details.slideDown();
        $(this).text("Show Less");
    }
});

$(document).on("click", "#contact-us-button", function(event) {
    event.preventDefault();
    loadContent('/src/partials/inquiry_orders.html', 'hero');
});

$(document).on("click", 'a[href="#products"]', function(event) {
    event.preventDefault();
    loadContent('/src/partials/inquiry_orders.html', 'hero');
});

$(document).on("click", 'a[href="#about-us"]', function(event) {
    event.preventDefault();
    loadContent('/src/partials/hero.html', 'hero');
});

$(document).on("click", "a[href='#gallery']", function(event) {
    event.preventDefault();
    loadContent('/src/partials/gallery.html', 'hero');
});

$(document).on("click", "a[href='#specification']", function(event) {
    event.preventDefault();
    loadContent('/src/partials/specification.html', 'hero');
});

$(document).on("click", "a[href='#disposable-equipment']", function(event) {
    event.preventDefault();
    loadContent('/src/partials/disposable_equipment.html', 'hero');
});

$(document).on("click", "a[href='#medical-devices']", function(event) {
    event.preventDefault();
    loadContent('/src/partials/medical_devices.html', 'hero');
});

$(document).on("click", "a[href='#hospital-development']", function(event) {
    event.preventDefault();
    loadContent('/src/partials/hospitals_development.html', 'hero');
});

$(document).on("click", "#inquiry-footer", function(event) {
    event.preventDefault();
    loadContent('/src/partials/inquiry_orders.html', 'hero');
});

// Funkcja do dodawania pliku CSS
function addCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    }
}

// Funkcja do usuwania pliku CSS
function removeCSS(href) {
    const link = document.querySelector(`link[href="${href}"]`);
    if (link) {
        link.remove();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const tocButton = document.querySelector(".toc-toggle-button");
    const tocContent = document.querySelector(".toc-content");

    tocButton.addEventListener("click", function () {
        tocContent.classList.toggle("show"); // Przełącza klasę 'show', aby pokazać/ukryć zawartość
    });
});
