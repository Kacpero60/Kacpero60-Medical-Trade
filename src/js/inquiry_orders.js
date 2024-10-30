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
