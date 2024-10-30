// Funkcja rozwijająca szczegóły po kliknięciu w "Learn More"
function toggleDetails() {
    const details = document.getElementById("hero-details");
    const button = document.getElementById("expand-button");

    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        button.textContent = "Show Less";
    } else {
        details.style.display = "none";
        button.textContent = "Learn More";
    }
}

// header.js
$(document).ready(function() {
    $('#header').load('/src/partials/header.html');
});

// hero.js
$(document).ready(function() {
    $('#hero').load('/src/partials/hero.html', function() {
        // Kod wykonuje się po zakończeniu załadowania hero.html
        attachToggleDetailsEvent();
    });
});

// footer.js
$(document).ready(function() {
    $('#footer').load('/src/partials/footer.html');
});

// Funkcja przypisująca zdarzenie kliknięcia do przycisku po załadowaniu sekcji hero
function attachToggleDetailsEvent() {
    // Upewnij się, że HTML został załadowany, zanim wyszukasz elementy
    setTimeout(() => {
        const heroButton = document.querySelector("#expand-button");
        const details = document.querySelector("#hero-details");

        if (heroButton && details) {
            // Ustawienie początkowego stanu widoczności na 'none' (ukryty)
            details.style.display = "none";

            heroButton.addEventListener("click", toggleDetails);
        } else {
            console.warn("Element #expand-button lub #hero-details nie został znaleziony.");
        }
    }, 200); // Dodanie opóźnienia, aby upewnić się, że HTML się załadował
}
