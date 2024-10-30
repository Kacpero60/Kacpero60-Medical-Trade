$(document).ready(function() {
    // Ładowanie zawartości header, hero oraz footer
    $('#header').load('/src/partials/header.html', function() {
        // Po załadowaniu header.html, dodaj nasłuch na link "Inquiry & Orders"
        const inquiryLink = document.querySelector('a[href="#products"]');
        if (inquiryLink) {
            inquiryLink.addEventListener("click", function(event) {
                event.preventDefault();
                loadContent('/src/partials/inquiry_orders.html', 'hero'); // Ładowanie inquiry_orders.html do #hero
            });
        }
    });

    $('#footer').load('/src/partials/footer.html');
    loadContent('/src/partials/hero.html', 'hero'); // Początkowe ładowanie hero.html do #hero
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
        })
        .catch(error => console.error("Błąd ładowania treści:", error));
}
$(document).ready(function() {
    // Po załadowaniu header.html, dodaj nasłuch na link Home
    $('#header').load('/src/partials/header.html', function() {
        const homeLink = document.querySelector('a[href="#about-us"]');
        if (homeLink) {
            homeLink.addEventListener("click", function(event) {
                event.preventDefault();
                loadContent('/src/partials/hero.html', 'hero'); // Ładowanie hero.html do #hero przy kliknięciu Home
            });
        }

        // Nasłuch dla linku Inquiry & Orders
        const inquiryLink = document.querySelector('a[href="#products"]');
        if (inquiryLink) {
            inquiryLink.addEventListener("click", function(event) {
                event.preventDefault();
                loadContent('/src/partials/inquiry_orders.html', 'hero'); // Ładowanie inquiry_orders.html do #hero
            });
        }
    });
});
