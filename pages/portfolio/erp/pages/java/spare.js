const spareForm = document.querySelector(".spare-part-format");
const searchForm = document.querySelector(".search-spare-part-format");
const sparePartsList = document.getElementById("sparePartsList");

let spareParts = JSON.parse(localStorage.getItem("spareParts")) || [];

function saveSpareParts() {
  localStorage.setItem("spareParts", JSON.stringify(spareParts));
}

function renderSpareParts(parts = spareParts) {
  sparePartsList.innerHTML = "";

  if (parts.length === 0) {
    sparePartsList.innerHTML = "<p>No spare parts saved yet.</p>";
    return;
  }

  parts.forEach((part) => {
    const div = document.createElement("div");
    div.classList.add("spare-item");

    div.innerHTML = `
      <p><strong>Name:</strong> ${part.name}</p>
      <p><strong>Part Number:</strong> ${part.number}</p>
      <p><strong>Quantity:</strong> ${part.quantity}</p>
      <p><strong>Area:</strong> ${part.area}</p>
      <p><strong>Date:</strong> ${part.date}</p>
    `;

    sparePartsList.appendChild(div);
  });
}

spareForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("spare-part-name").value.trim();
  const number = document.getElementById("spare-part-number").value.trim();
  const quantity = Number(document.getElementById("spare-parts-quantity").value);
  const area = document.getElementById("select-area-spare-part").value;
  const date = document.getElementById("date-format-spares").value;

  if (!name || !number || !quantity || !area || !date) {
    alert("Please fill all fields.");
    return;
  }

  const newPart = {
    name,
    number,
    quantity,
    area,
    date
  };

  spareParts.push(newPart);
  saveSpareParts();
  renderSpareParts();

  spareForm.reset();
});

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchText = document
    .getElementById("search-part-input")
    .value
    .toLowerCase()
    .trim();

  const filteredParts = spareParts.filter((part) =>
    part.name.toLowerCase().includes(searchText) ||
    part.number.toLowerCase().includes(searchText) ||
    part.area.toLowerCase().includes(searchText)
  );

  renderSpareParts(filteredParts);
});

renderSpareParts();