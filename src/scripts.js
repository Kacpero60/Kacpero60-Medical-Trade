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

            // Dodanie stylu i widoczności dla inquiry_orders, jeśli to jest inquiry_orders.html
            if (filePath.includes('inquiry_orders.html')) {
                addCSS('/src/css/inquiry_orders.css');
                const formContainer = targetElement.querySelector('.form-container');
                if (formContainer) {
                    formContainer.classList.add('visible');
                }
            } else {
                removeCSS('/src/css/inquiry_orders.css');
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
