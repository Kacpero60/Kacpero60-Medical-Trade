$(document).ready(function() {
    // Ładowanie zawartości hero.html do sekcji #hero
    $('#hero').load('/src/partials/hero.html', function() {
        console.log("Załadowano hero.html");

        // Przypisanie zdarzeń po załadowaniu zawartości
        attachToggleDetailsEvent();
    });
});

// Funkcja przypisująca zdarzenie kliknięcia do przycisku po załadowaniu hero.html
function attachToggleDetailsEvent() {
    const $heroButton = $("#expand-button");
    const $details = $("#hero-details");

    if ($heroButton.length && $details.length) {
        // Początkowy stan widoczności detali na "none"
        $details.hide();

        // Obsługa kliknięcia
        $heroButton.on("click", function() {
            if ($details.is(":visible")) {
                $details.slideUp();
                $heroButton.text("Learn More");
            } else {
                $details.slideDown();
                $heroButton.text("Show Less");
            }
        });
    } else {
        console.warn("Element #expand-button lub #hero-details nie został znaleziony.");
    }
}

