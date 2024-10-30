$(document).ready(function() {
    // Ładowanie hero.html
    $('#hero').load('/src/partials/hero.html', function() {
        // Po zakończeniu ładowania przypiszemy zdarzenie kliknięcia do przycisku
        attachToggleDetailsEvent();
    });
});

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
