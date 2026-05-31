
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/sergiocoria.my@gmail.com", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      successMessage.style.display = "block";
      form.reset();

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 4000);
    })
    .catch(error => {
      alert("Something went wrong. Please try again.");
    });
  });
