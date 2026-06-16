const resumeTitle = document.querySelector(".resume-hero h1");

if (resumeTitle) {
  const text = resumeTitle.textContent.trim();

  resumeTitle.innerHTML = "";

  text.split("").forEach(function(letter) {
    const span = document.createElement("span");

    if (letter === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = letter;
    }

    resumeTitle.appendChild(span);
  });
}

const revealElements = document.querySelectorAll(
  ".job, .skill-card, .cert-card, .sidebar-card"
);

revealElements.forEach(function(element) {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(function(element) {
  observer.observe(element);
});