$(document).ready(function() {
    // Load header content
    $('#header').load('/src/partials/header.html');
  
    // Load about-us section content
    $('#about-us').load('/src/partials/about-us.html');
  
    // Load footer content
    $('#footer').load('/src/partials/footer.html');
});

// Funkcja do dynamicznego ładowania plików HTML do kontenera
function loadContent(filePath, targetElementId) {
    const targetElement = document.getElementById(targetElementId);

    // Dodaj efekt zanikania (opcjonalne)
    targetElement.classList.add("fade-out");

    // Opóźnienie dla efektu zanikania
    setTimeout(() => {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Błąd: ${response.status}`);
                return response.text();
            })
            .then(data => {
                targetElement.innerHTML = data;
                targetElement.classList.remove("fade-out"); // Usuń efekt zanikania po załadowaniu
            })
            .catch(error => console.error("Błąd ładowania treści:", error));
    }, 500); // Czas trwania animacji
}

// Obsługa kliknięcia dla linku "Inquiry & Orders"
document.addEventListener("DOMContentLoaded", () => {
    const inquiryLink = document.getElementById("inquiry");
    if (inquiryLink) {
        inquiryLink.addEventListener("click", (event) => {
            event.preventDefault();
            loadContent('/src/partials/inquiry_orders.html', 'hero'); // Załaduj inquiry_orders.html do #hero
        });
    }
});
