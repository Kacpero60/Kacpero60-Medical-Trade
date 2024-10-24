document.addEventListener("DOMContentLoaded", function () {
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

  // header.js
$(document).ready(function() {
  $('#header').load('/src/partials/header.html');
});

// hero.js
$(document).ready(function() {
  $('#hero').load('/src/partials/hero.html');
});

// footer.js
$(document).ready(function() {
  $('#footer').load('/src/partials/footer.html');
});

  