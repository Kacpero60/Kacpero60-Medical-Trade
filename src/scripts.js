$(document).ready(function() {
    // Ładowanie zawartości header, hero oraz footer
    $('#header').load('/src/partials/header.html', function() {
        const inquiryLinkHeader = document.querySelector('a[href="#products"]');
        if (inquiryLinkHeader) {
            inquiryLinkHeader.addEventListener("click", function(event) {
                event.preventDefault();
                loadContent('/src/partials/inquiry_orders.html', 'hero'); // Ładowanie inquiry_orders.html do #hero
            });
        }

        const homeLink = document.querySelector('a[href="#about-us"]');
        if (homeLink) {
            homeLink.addEventListener("click", function(event) {
                event.preventDefault();
                loadContent('/src/partials/hero.html', 'hero'); // Ładowanie hero.html do #hero przy kliknięciu Home
            });
        }
    });

    loadContent('/src/partials/hero.html', 'hero');

    $('#footer').load('/src/partials/footer.html', function() {
        const inquiryLinkFooter = document.querySelector('#inquiry-footer');
        if (inquiryLinkFooter) {
            inquiryLinkFooter.addEventListener("click", function(event) {
                event.preventDefault();
                loadContent('/src/partials/inquiry_orders.html', 'hero'); // Ładowanie inquiry_orders.html do #hero
            });
        }
    });
});

// Funkcja do dynamicznego ładowania plików HTML do kontenera
function loadContent(filePath, targetElementId) {
    const targetElement = document.getElementById(targetElementId);
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Błąd: ${response.status}`);
            return response.text();
        })
        .then(data => {
            targetElement.innerHTML = data;
            console.log(`Zawartość załadowana do ${targetElementId}`);

            // Dodajemy styl i widoczność dla inquiry_orders
            if (filePath.includes('inquiry_orders.html')) {
                addCSS('/src/css/inquiry_orders.css');
                const formContainer = targetElement.querySelector('.form-container');
                if (formContainer) {
                    formContainer.classList.add('visible'); // Dodaj klasę 'visible' po załadowaniu formularza
                }
            } else {
                removeCSS('/src/css/inquiry_orders.css');
            }

            // Dodanie nasłuchu do przycisku "Check It Out" w hero.html
            if (filePath.includes('hero.html')) {
                const inquiryButtonHero = document.querySelector('.info-block-inquiry .info-button');
                if (inquiryButtonHero) {
                    inquiryButtonHero.addEventListener("click", function(event) {
                        event.preventDefault();
                        loadContent('/src/partials/inquiry_orders.html', 'hero'); // Ładowanie inquiry_orders.html do #hero
                    });
                }
            }
        })
        .catch(error => console.error("Błąd ładowania treści:", error));
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
