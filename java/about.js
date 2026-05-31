// Selecciona todas las tarjetas de imagen del About Me
const imageCards = document.querySelectorAll(".about-image-card");

// A cada imagen le agregamos un evento de click
imageCards.forEach(function(card) {

    card.addEventListener("click", function() {

        // Si tocas una imagen, primero cerramos las demás
        imageCards.forEach(function(otherCard) {
            if (otherCard !== card) {
                otherCard.classList.remove("active");
            }
        });

        // Luego abrimos o cerramos la imagen tocada
        card.classList.toggle("active");
    });

});