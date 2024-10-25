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

$(window).on("load", function() {
    $('#hero').load('/src/partials/hero.html', function() {
        // Możesz tu wywołać funkcje, które są potrzebne po załadowaniu hero
    });
});