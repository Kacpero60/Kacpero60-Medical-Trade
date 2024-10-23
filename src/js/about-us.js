document.addEventListener("DOMContentLoaded", function () {
    const aboutUsSection = document.querySelector(".about-us");
  
    function handleScroll() {
      const sectionTop = aboutUsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
  
      if (sectionTop < windowHeight * 0.9) {
        aboutUsSection.classList.add("visible");
        window.removeEventListener("scroll", handleScroll);
      }
    }
  
    window.addEventListener("scroll", handleScroll);
  });
  