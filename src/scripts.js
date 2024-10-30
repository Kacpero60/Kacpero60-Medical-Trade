$(document).ready(function() {
    // Ładowanie zawartości header, hero oraz footer
    $('#header').load('/src/partials/header.html', function() {
        // Po załadowaniu header.html, dodaj nasłuch na link "Inquiry & Orders" w nagłówku
        const inquiryLinkHeader = document.querySelector('a[href="#products"]');
        if (inquiryLinkHeader) {
            inquiryLinkHeader.addEventListener("click", function(event) {
                event.preventDefault();
                loadContent('/src/partials/inquiry_orders.html', 'hero'); // Ładowanie inquiry_orders.html do #hero
            });
        }

        // Dodaj nasłuch na link "Home" w nagłówku
        const homeLink = document.querySelector('a[href="#about-us"]');
        if (homeLink) {
            homeLink.addEventListener("click", function(event) {
                event.preventDefault();
                loadContent('/src/partials/hero.html', 'hero'); // Ładowanie hero.html do #hero przy kliknięciu Home
            });
        }
    });

    // Ładowanie zawartości hero na początek
    loadContent('/src/partials/hero.html', 'hero');

    // Ładowanie zawartości stopki i dodanie nasłuchu na "Inquiry & Orders" w stopce
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

            // Po załadowaniu zawartości hero, dodaj nasłuch na przycisk "Check It Out"
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
