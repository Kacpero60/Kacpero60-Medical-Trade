document.addEventListener("DOMContentLoaded", () => {
    const privacyPolicyButton = document.querySelector('a[href="#privacy-policy"]');
    
    if (privacyPolicyButton) {
        privacyPolicyButton.addEventListener("click", (event) => {
            event.preventDefault(); // Zapobiega domyślnemu działaniu linku
            openPopUp(); // Otwiera pop-up
        });
    }

    // Funkcja do otwierania pop-upu
    function openPopUp() {
        const popUpContainer = document.getElementById('popUpContainer');
        popUpContainer.style.display = 'flex'; // Pokaż pop-up

        // Zamknięcie pop-upu
        document.getElementById('closePopUp').onclick = function () {
            popUpContainer.style.display = 'none';
        };
    }
});
