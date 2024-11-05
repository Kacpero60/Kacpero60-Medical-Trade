
// Funkcja do zamykania okna polityki prywatności
function closePrivacyPolicy() {
    document.querySelector('.privacy-policy-container').style.display = 'none';
    document.querySelector('.inquiry-container').classList.remove('inquiry-blur'); // Usunięcie rozmycia
}

// Funkcja do wyświetlania polityki prywatności
function showPrivacyPolicy() {
    document.querySelector('.privacy-policy-container').style.display = 'block';
    document.querySelector('.inquiry-container').classList.add('inquiry-blur'); // Dodanie rozmycia
}
