let productionItems = JSON.parse(localStorage.getItem("productionItems")) || [];

const createForm = document.querySelector(".create-item-form");
const searchForm = document.querySelector(".search-item-format");
const updateForm = document.querySelector(".update-item-access");

const productionItemsList = document.getElementById("productionItemsList");
const generatedCode = document.getElementById("generatedCode");
const qrCanvas = document.getElementById("qrCanvas");

function generateItemCode() {
  let code;

  do {
    const datePart = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    code = `BOX-${datePart}-${randomPart}`;
  } while (productionItems.some(item => item.code === code));

  return code;
}

function saveProductionItems() {
  localStorage.setItem("productionItems", JSON.stringify(productionItems));

  const productionByArea = {};

  productionItems.forEach(item => {
    const station = item.station;
    productionByArea[station] = (productionByArea[station] || 0) + 1;
  });

  localStorage.setItem("productionByArea", JSON.stringify(productionByArea));
}

function renderItems(items) {
  productionItemsList.innerHTML = "";

  if (!items || items.length === 0) {
    productionItemsList.innerHTML = "<p>No item found.</p>";
    return;
  }

  items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("production-item");

    div.innerHTML = `
      <p><strong>Code:</strong> ${item.code}</p>
      <p><strong>Item:</strong> ${item.name}</p>
      <p><strong>Description:</strong> ${item.description}</p>
      <p><strong>Current Station:</strong> ${item.station}</p>
      <p><strong>Date:</strong> ${item.date}</p>
      <p><strong>Status:</strong> ${item.partsComplete ? "Parts complete" : "In process"}</p>
      <p><strong>Last Update:</strong> ${item.lastUpdate || "No updates yet"}</p>
    `;

    productionItemsList.appendChild(div);
  });
}

createForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("add-item").value.trim();
  const description = document.getElementById("description-item").value.trim();
  const date = document.getElementById("date").value;
  const partsComplete = document.getElementById("parts-complete").checked;
  const initialStation = document.getElementById("initial-station").value;

  if (!name || !description || !date || !initialStation) {
    alert("Please fill all fields.");
    return;
  }

  const code = generateItemCode();

  const newItem = {
    code,
    name,
    description,
    date,
    partsComplete,
    station: initialStation,
    history: [
      {
        station: initialStation,
        date: new Date().toLocaleString()
      }
    ],
    lastUpdate: null
  };

  productionItems.push(newItem);
  saveProductionItems();

  generatedCode.textContent = `Code: ${code}`;

  QRCode.toCanvas(qrCanvas, code);

  createForm.reset();

  alert("Item created successfully.");
});

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const searchValue = document.getElementById("search").value.toLowerCase().trim();

  if (!searchValue) {
    alert("Please enter an item code, name or station.");
    return;
  }

  const results = productionItems.filter(item =>
    item.code.toLowerCase().includes(searchValue) ||
    item.name.toLowerCase().includes(searchValue) ||
    item.station.toLowerCase().includes(searchValue)
  );

  renderItems(results);
});

updateForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const code = document.getElementById("item-code").value.trim();
  const newStation = document.getElementById("update-station").value;

  if (!code || !newStation) {
    alert("Please enter item code and select a station.");
    return;
  }

  const item = productionItems.find(item => item.code === code);

  if (!item) {
    alert("Item not found.");
    return;
  }

  item.station = newStation;
  item.lastUpdate = new Date().toLocaleString();

  item.history.push({
    station: newStation,
    date: item.lastUpdate
  });

  saveProductionItems();
  renderItems([item]);

  updateForm.reset();

  alert("Item updated successfully.");
});