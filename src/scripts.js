$(document).ready(function() {
    // Ładowanie zawartości header, hero oraz footer
    $('#header').load('/src/partials/header.html', function() {
        // Przypisywanie zdarzeń po załadowaniu headera
        attachHeaderEvents();
    });

    // Ładowanie hero.html do sekcji #hero
    loadContent('/src/partials/hero.html', 'hero', function() {
        // Po załadowaniu przypisz zdarzenia do przycisków w hero.html
        attachToggleDetailsEvent();
    });

    $('#footer').load('/src/partials/footer.html', function() {
        // Przypisywanie zdarzeń po załadowaniu footera
        attachFooterEvents();
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

// Funkcja przypisująca zdarzenie kliknięcia do przycisku po załadowaniu sekcji hero
function attachToggleDetailsEvent() {
    // Zastosowanie jQuery, aby mieć pewność, że elementy są dostępne
    const $heroButton = $("#expand-button");
    const $details = $("#hero-details");

    if ($heroButton.length && $details.length) {
        // Ustawienie początkowego stanu widoczności na 'none' (ukryty)
        $details.hide();

        // Obsługa zdarzenia kliknięcia
        $heroButton.on("click", function() {
            if ($details.is(":visible")) {
                $details.slideUp();  // Dodanie efektu animacji dla estetyki
                $heroButton.text("Learn More");
            } else {
                $details.slideDown();  // Dodanie efektu animacji dla estetyki
                $heroButton.text("Show Less");
            }
        });
    } else {
        console.warn("Element #expand-button lub #hero-details nie został znaleziony.");
    }
}

// Funkcja przypisująca zdarzenia do elementów header
function attachHeaderEvents() {
    const inquiryLinkHeader = document.querySelector('a[href="#products"]');
    if (inquiryLinkHeader) {
        inquiryLinkHeader.addEventListener("click", function(event) {
            event.preventDefault();
            loadContent('/src/partials/inquiry_orders.html', 'hero', attachToggleDetailsEvent);
        });
    }

    const homeLink = document.querySelector('a[href="#about-us"]');
    if (homeLink) {
        homeLink.addEventListener("click", function(event) {
            event.preventDefault();
            loadContent('/src/partials/hero.html', 'hero', attachToggleDetailsEvent);
        });
    }
}

// Funkcja przypisująca zdarzenia do elementów footer
function attachFooterEvents() {
    const inquiryLinkFooter = document.querySelector('#inquiry-footer');
    if (inquiryLinkFooter) {
        inquiryLinkFooter.addEventListener("click", function(event) {
            event.preventDefault();
            loadContent('/src/partials/inquiry_orders.html', 'hero', attachToggleDetailsEvent);
        });
    }
}

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
