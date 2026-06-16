const heroTitle = document.querySelector(".hero h1");

if (heroTitle) {
  const text = heroTitle.textContent.trim();

  heroTitle.innerHTML = "";

  text.split("").forEach(function(letter) {
    const span = document.createElement("span");

    if (letter === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = letter;
    }

    heroTitle.appendChild(span);
  });
}

const heroImage = document.querySelector(".hero-image");
const secondImage = document.querySelector(".image-two");

if (heroImage && secondImage) {
  heroImage.addEventListener("mousemove", function(event) {
    const box = heroImage.getBoundingClientRect();
    const mouseX = event.clientX - box.left;

    let percentage = mouseX / box.width;
    percentage = Math.max(0, Math.min(1, percentage));

    const hiddenPart = 100 - percentage * 100;
    secondImage.style.clipPath = `inset(0 ${hiddenPart}% 0 0)`;
  });

  heroImage.addEventListener("mouseleave", function() {
    secondImage.style.clipPath = "inset(0 100% 0 0)";
  });

  heroImage.addEventListener("click", function() {
    heroImage.classList.toggle("active");

    if (heroImage.classList.contains("active")) {
      secondImage.style.clipPath = "inset(0 0 0 0)";
    } else {
      secondImage.style.clipPath = "inset(0 100% 0 0)";
    }
  });
}




const pageDirectory = document.querySelector(".page-directory");
const introSection = document.querySelector("#intro");

function updateDirectoryColor() {
  if (!pageDirectory || !introSection) return;

  const introTop = introSection.getBoundingClientRect().top;

  if (introTop <= window.innerHeight - 120) {
    pageDirectory.classList.add("dark-mode");
  } else {
    pageDirectory.classList.remove("dark-mode");
  }
}

window.addEventListener("scroll", updateDirectoryColor);
window.addEventListener("load", updateDirectoryColor);