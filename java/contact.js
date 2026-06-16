const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const sendButton = document.getElementById("sendButton");


const contactTitle = document.querySelector(".contact-intro h1");

if (contactTitle) {
  const text = contactTitle.textContent.trim();

  contactTitle.innerHTML = "";

  text.split("").forEach(function(letter) {
    const span = document.createElement("span");

    if (letter === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = letter;
    }

    contactTitle.appendChild(span);
  });
}



if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    sendButton.classList.add("loading");
    sendButton.textContent = "Sending...";

    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/sergiocoria.my@gmail.com", {
      method: "POST",
      body: formData
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        return response.json();
      })
      .then(function() {
        successMessage.style.display = "block";
        form.reset();

        setTimeout(function() {
          successMessage.style.display = "none";
        }, 4000);
      })
      .catch(function() {
        errorMessage.style.display = "block";
      })
      .finally(function() {
        sendButton.classList.remove("loading");
        sendButton.textContent = "Send Message";
      });
  });
}

const revealElements = document.querySelectorAll(".contact-intro, .contact-card");

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