const names = document.querySelectorAll(".name");

names.forEach(function(name) {
    const text = name.textContent;

    name.innerHTML = "";

    text.split("").forEach(function(letter) {
        const span = document.createElement("span");
        span.textContent = letter;
        name.appendChild(span);
    });
});

const heroImage = document.querySelector(".hero-image");
const secondImage = document.querySelector(".image-two");

if (heroImage && secondImage) {

    // Efecto para computadora con mouse
    heroImage.addEventListener("mousemove", function(event) {
        const box = heroImage.getBoundingClientRect();
        const mouseX = event.clientX - box.left;

        let percentage = mouseX / box.width;
        percentage = Math.max(0, Math.min(1, percentage));

        const hiddenPart = 100 - (percentage * 100);
        secondImage.style.clipPath = `inset(0 ${hiddenPart}% 0 0)`;
    });

    heroImage.addEventListener("mouseleave", function(event) {
        const box = heroImage.getBoundingClientRect();

        if (event.clientX >= box.right) {
            secondImage.style.clipPath = "inset(0 0% 0 0)";
        } else if (event.clientX <= box.left) {
            secondImage.style.clipPath = "inset(0 100% 0 0)";
        }
    });

    // Efecto para celular: tocar imagen
    // Efecto para celular: tocar imagen
    heroImage.addEventListener("click", function() {
        heroImage.classList.toggle("active");

        if (heroImage.classList.contains("active")) {
            secondImage.style.clipPath = "none";
        } else {
            secondImage.style.clipPath = "none";
        }
    });
}

// Letras bailan al hacer scroll
let scrollTimeout;

window.addEventListener("scroll", function() {
    names.forEach(function(name) {
        name.classList.add("animate");
    });

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(function() {
        names.forEach(function(name) {
            name.classList.remove("animate");
        });
    }, 900);
});