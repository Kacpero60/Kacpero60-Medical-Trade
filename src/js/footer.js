// Ładowanie stopki
$(document).ready(function() {
  $('#footer').load('/src/partials/footer.html', function() {
      // Logika przewijania po załadowaniu stopki
      const footerLinks = document.querySelectorAll(".footer-links a");

      footerLinks.forEach(link => {
          link.addEventListener("click", function (e) {
              e.preventDefault();
              const targetId = this.getAttribute("href").substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop,
                      behavior: "smooth"
                  });
              }
          });
      });
  });
});

  