const galleryWheel = document.querySelector('.gallery-wheel');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentRotation = 0;

document.querySelector('.arrow.left').addEventListener('click', () => {
  currentRotation -= 30; // Obraca galerię o 30 stopni w lewo
  galleryWheel.style.transform = `rotateY(${currentRotation}deg)`;
});

document.querySelector('.arrow.right').addEventListener('click', () => {
  currentRotation += 30; // Obraca galerię o 30 stopni w prawo
  galleryWheel.style.transform = `rotateY(${currentRotation}deg)`;
});

// Obsługa przesuwania palcem na urządzeniach mobilnych
let startX;
galleryWheel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

galleryWheel.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const moveX = touch.clientX - startX;
  currentRotation += moveX / 10; // Rotacja w zależności od ruchu palcem
  galleryWheel.style.transform = `rotateY(${currentRotation}deg)`;
  startX = touch.clientX;
});
