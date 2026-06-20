const ordersForm = document.querySelector(".add-orders-production-format");
const searchForm = document.querySelector(".search-orders-information-format");
const ordersList = document.getElementById("ordersList");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));

  const openOrders = orders.filter(order => order.status === "open").length;
  const closedOrders = orders.filter(order => order.status === "closed").length;

  localStorage.setItem("maintenanceOrders", JSON.stringify({
    open: openOrders,
    closed: closedOrders
  }));
}

function renderOrders(orderArray = orders) {
  ordersList.innerHTML = "";

  if (orderArray.length === 0) {
    ordersList.innerHTML = "<p>No orders saved yet.</p>";
    return;
  }

  orderArray.forEach(order => {
    const div = document.createElement("div");
    div.classList.add("order-item");

    div.innerHTML = `
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Order Number:</strong> ${order.number}</p>
      <p><strong>Customer:</strong> ${order.customer}</p>
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <p><strong>Start Date:</strong> ${order.startDate}</p>
    `;

    ordersList.appendChild(div);
  });
}

ordersForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const status = document.getElementById("new-order-production-status").value;
  const number = document.getElementById("new-order-production-number").value;
  const customer = document.getElementById("new-order-production-customer").value.trim();
  const quantity = Number(document.getElementById("new-order-production-quantity").value);
  const startDate = document.getElementById("add-order-production-start-date").value;

  if (!status || !number || !customer || !quantity || !startDate) {
    alert("Please fill all fields.");
    return;
  }

  const newOrder = {
    status,
    number,
    customer,
    quantity,
    startDate
  };

  orders.push(newOrder);
  saveOrders();
  renderOrders();
  ordersForm.reset();
});

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const searchText = document.getElementById("search-orders-number").value.toLowerCase().trim();

  const filteredOrders = orders.filter(order =>
    order.number.toString().includes(searchText) ||
    order.customer.toLowerCase().includes(searchText) ||
    order.status.toLowerCase().includes(searchText)
  );

  renderOrders(filteredOrders);
});

renderOrders();