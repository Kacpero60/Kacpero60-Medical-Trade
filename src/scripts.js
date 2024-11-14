$(document).ready(function() {
    // Ładowanie zawartości header, hero oraz footer
    $('#header').load('src/partials/header.html', function() {
        console.log("Załadowano header.html");
    });

    loadContent('src/partials/hero.html', 'hero', function() {
        console.log("Załadowano hero.html");
    });

    $('#footer').load('src/partials/footer.html', function() {
        console.log("Załadowano footer.html");
    });

    // Funkcja do dynamicznego ładowania plików HTML do kontenera z animacją przejścia
    function loadContent(filePath, targetElementId, callback) {
        const targetElement = document.getElementById(targetElementId);

        // Rozpocznij animację fade-out
        targetElement.classList.add('fade-out');

        // Po zakończeniu animacji fade-out
        targetElement.addEventListener('animationend', function onFadeOut() {
            // Upewnij się, że zdarzenie jest powiązane tylko raz
            targetElement.removeEventListener('animationend', onFadeOut);

            // Po zakończeniu animacji fade-out, ładujemy nową zawartość
            fetch(filePath)
                .then(response => {
                    if (!response.ok) throw new Error(`Błąd: ${response.status}`);
                    return response.text();
                })
                .then(data => {
                    targetElement.innerHTML = data;
                    console.log(`Zawartość załadowana do ${targetElementId}`);

                    // Dodanie odpowiednich CSS dla różnych sekcji
                    if (filePath.includes('inquiry_orders.html')) {
                        addCSS('src/css/inquiry_orders.css');
                    } else if (filePath.includes('gallery.html')) {
                        addCSS('src/css/gallery.css');
                    } else if (filePath.includes('specification.html')) {
                        addCSS('src/css/specification.css');
                    } else if (filePath.includes('disposable_equipment.html')) {
                        addCSS('src/css/disposable_equipment.css');
                    } else if (filePath.includes('medical_devices.html')) {
                        addCSS('src/css/medical_devices.css');
                    } else if (filePath.includes('hospitals_development.html')) {
                        addCSS('src/css/hospitals_development.css');
                    } else if (filePath.includes('privacy_police.html')) {
                        addCSS('src/css/privacy_police.css');
                    } else {
                        removeCSS('src/css/inquiry_orders.css');
                        removeCSS('src/css/gallery.css');
                        removeCSS('src/css/specification.css');
                        removeCSS('src/css/disposable_equipment.css');
                        removeCSS('src/css/medical_devices.css');
                        removeCSS('src/css/hospitals_development.css');
                        removeCSS('src/css/privacy_police.css');
                    }

                    // Dodaj klasę fade-in po załadowaniu nowej zawartości
                    targetElement.classList.remove('fade-out');
                    targetElement.classList.add('fade-in');

                    // Usuń klasę fade-in po zakończeniu animacji
                    targetElement.addEventListener('animationend', function onFadeIn() {
                        targetElement.classList.remove('fade-in');
                        targetElement.removeEventListener('animationend', onFadeIn);
                    });

                    if (typeof callback === "function") {
                        callback();
                    }
                })
                .catch(error => console.error("Błąd ładowania treści:", error));
        });
    }

    // Obsługa rozwijanego menu "Specification" dla urządzeń mobilnych i desktopowych
    function handleSpecificationDropdown() {
        const specificationLink = $('.dropdown > a'); // Link "Specification"
        const dropdownContent = $('.dropdown-content');

        specificationLink.on('click', function(event) {
            event.preventDefault(); // Zablokuj domyślne działanie linku
            if ($(window).width() <= 768) {
                // Na urządzeniach mobilnych przełącza widoczność podlinków
                dropdownContent.toggleClass('expanded');
            }
        });

        // Obsługa hover dla większych ekranów
        if ($(window).width() > 768) {
            $('.dropdown').hover(
                function() {
                    dropdownContent.stop(true, true).fadeIn(200).css("display", "block");
                },
                function() {
                    dropdownContent.stop(true, true).fadeOut(200);
                }
            );
        }
    }

    handleSpecificationDropdown();
    $(window).resize(handleSpecificationDropdown);

    // Delegacja zdarzeń do przycisków i linków dynamicznie ładowanych
    $(document).on("click", "#expand-button", function() {
        const $details = $("#hero-details");
        if ($details.is(":visible")) {
            $details.slideUp();
            $(this).text("Learn More");
        } else {
            $details.slideDown();
            $(this).text("Show Less");
        }
    });

    $(document).on("click", "#contact-us-button", function(event) {
        event.preventDefault();
        loadContent('src/partials/inquiry_orders.html', 'hero');
    });

    $(document).on("click", 'a[href="#products"]', function(event) {
        event.preventDefault();
        loadContent('src/partials/inquiry_orders.html', 'hero');
    });

    $(document).on("click", 'a[href="#about-us"]', function(event) {
        event.preventDefault();
        loadContent('src/partials/hero.html', 'hero');
    });

    $(document).on("click", "a[href='#gallery']", function(event) {
        event.preventDefault();
        loadContent('src/partials/gallery.html', 'hero');
    });

    $(document).on("click", "a[href='#specification']", function(event) {
        event.preventDefault(); // Zapobiega przekierowaniu dla linku Specification
    });

    $(document).on("click", "a[href='#disposable-equipment']", function(event) {
        event.preventDefault();
        loadContent('src/partials/disposable_equipment.html', 'hero');
    });

    $(document).on("click", "a[href='#medical-devices']", function(event) {
        event.preventDefault();
        loadContent('src/partials/medical_devices.html', 'hero');
    });

    $(document).on("click", "a[href='#hospital-development']", function(event) {
        event.preventDefault();
        loadContent('src/partials/hospitals_development.html', 'hero');
    });

    $(document).on("click", "#inquiry-footer", function(event) {
        event.preventDefault();
        loadContent('src/partials/inquiry_orders.html', 'hero');
    });

    // Obsługa kliknięcia w przycisk "Privacy Policy"
    $(document).on("click", "a[href='#privacy-policy']", function(event) {
        event.preventDefault();
        loadContent("src/partials/privacy_police.html", "hero");
    });

    function addCSS(href) {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        }
    }

    function removeCSS(href) {
        const link = document.querySelector(`link[href="${href}"]`);
        if (link) {
            link.remove();
        }
    }
    
    $(document).on("click", "a[href='privacy_police.html']", function(event) {
        event.preventDefault();
        loadContent("src/partials/privacy_police.html", "hero", function() {
            console.log("Załadowano privacy_police.html");
        });
    });
    $(document).ready(function() {
        // Usuwanie klasy aktywnej po kliknięciu w podlink
        $(".dropdown-content a").on("click", function() {
            $(".dropdown-content a").removeClass("active");
            $(this).addClass("active"); // Tylko kliknięty link ma być aktywny
        });
    });
    $(document).ready(function() {
        // Istniejący kod pozostaje bez zmian
    
        // Dodajemy dodatkową obsługę dla urządzeń mobilnych (<= 768px)
        if ($(window).width() <= 768) {
            $(".dropdown-content a").on("click", function(event) {
                event.preventDefault(); // Zapobiega domyślnemu działaniu linku
                const link = $(this);
    
                // Dodaj klasę aktywną tylko na chwilę
                link.addClass("active");
    
                // Po krótkim czasie usuń klasę, aby wróciło do pierwotnego stanu
                setTimeout(function() {
                    link.removeClass("active");
                }, 200); // Czas w milisekundach (0.2 sekundy)
            });
        }
    });
    document.getElementById('inquiry-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Zapobiega domyślnemu przesłaniu formularza
      
        // Pobranie danych z formularza
        const data = {
          company: document.querySelector('[name="company"]').value,
          email: document.querySelector('[name="email"]').value,
          zipcode: document.querySelector('[name="zipcode"]').value,
          country: document.querySelector('[name="country"]').value,
          product: document.querySelector('[name="product"]').value,
          reference: document.querySelector('[name="reference"]').value,
          quantity: document.querySelector('[name="quantity"]').value,
          shipping: document.querySelector('[name="shipping"]').value,
          message: document.querySelector('[name="message"]').value
        };
      
        // Wysłanie danych do serwera
        fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
          if (result.status === 'success') {
            alert('Wiadomość wysłana pomyślnie!');
            document.getElementById('inquiry-form').reset(); // Wyczyść formularz po wysłaniu
          } else {
            alert('Wystąpił błąd podczas wysyłania wiadomości.');
          }
        })
        .catch(error => console.error('Error:', error));
      });
      
});
