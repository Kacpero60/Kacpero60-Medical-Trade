document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.querySelector(".form-container");
    const heroButton = document.querySelector("#hero-button"); // Przycisk w sekcji hero

    heroButton.addEventListener("click", () => {
        formContainer.classList.add("visible"); // Dodaj klasę 'visible' bez przełączania
    });
});
 
document.addEventListener("DOMContentLoaded", () => {
    const inquiryContainer = document.getElementById("inquiry-container");

    for (let i = 0; i < 60; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        // Losowy rozmiar i pozycja bąbelków
        const size = Math.random() * 60 + 20; // rozmiar od 20px do 80px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;

        // Losowy czas trwania animacji dla każdego bąbelka
        bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;

        inquiryContainer.appendChild(bubble);
    }
});
$(document).ready(function() {
    // Dodanie bąbelków do tła (tylko jeśli potrzebne)
    const inquiryContainer = document.getElementById("inquiry-container");
    if (inquiryContainer) {
        for (let i = 0; i < 60; i++) {
            const bubble = document.createElement("div");
            bubble.classList.add("bubble");
            const size = Math.random() * 60 + 20;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.top = `${Math.random() * 100}%`;
            bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;
            inquiryContainer.appendChild(bubble);
        }
    }

    // Obsługa kliknięcia na link "Privacy Policy" i otwieranie pop-upu
    $(document).on("click", '.form-group a[href="privacy_police.html"]', function(event) {
        event.preventDefault();
        openPrivacyPolicyPopup();
    });

    // Funkcja otwierająca pop-up z polityką prywatności
    function openPrivacyPolicyPopup() {
        fetch("/src/privacy_police.html")
            .then(response => {
                if (!response.ok) throw new Error("Error loading Privacy Policy");
                return response.text();
            })
            .then(data => {
                const popUpContainer = $('<div class="pop-up-container-inquiry"></div>');
                popUpContainer.html(`
                    <div class="pop-up-inquiry">
                        <button class="closePopUp-inquiry" id="closePopUpInquiry">X</button>
                        <div class="privacy-policy-content">${data}</div>
                    </div>
                `);
                $("body").append(popUpContainer);

                // Funkcja zamykająca pop-up po kliknięciu przycisku "X"
                $("#closePopUpInquiry").on("click", function() {
                    popUpContainer.remove();
                });
            })
            .catch(error => console.error("Could not load Privacy Policy:", error));
    }
});
