const inventoryByArea = JSON.parse(localStorage.getItem("inventoryByArea")) || {
  "Final Line": 300,
  Paint: 100,
  Assembly: 180,
  Warehouse: 250
};

const productionItems = JSON.parse(localStorage.getItem("productionItems")) || [];

const productionByArea = {
  cutting: 0,
  welding: 0,
  painting: 0,
  assembly: 0,
  quality: 0,
  packaging: 0,
  shipping: 0
};

productionItems.forEach(item => {
  if (item.station && productionByArea[item.station] !== undefined) {
    productionByArea[item.station]++;
  }
});

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 18,
          weight: "bold"
        },
        color: "#111827"
      }
    }
  }
};

new Chart(document.getElementById("inventoryChart"), {
  type: "bar",
  data: {
    labels: Object.keys(inventoryByArea),
    datasets: [{
      label: "Inventory by Area",
      data: Object.values(inventoryByArea),
      backgroundColor: ["#2563eb", "#38bdf8", "#6366f1", "#0ea5e9"],
      borderRadius: 8
    }]
  },
  options: {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 18 },
          color: "#111827"
        }
      },
      x: {
        ticks: {
          font: { size: 18 },
          color: "#111827"
        }
      }
    }
  }
});

new Chart(document.getElementById("ordersChart"), {
  type: "bar",
  data: {
    labels: Object.keys(productionByArea),
    datasets: [{
      label: "Production Items by Area",
      data: Object.values(productionByArea),
      backgroundColor: [
        "#2563eb",
        "#38bdf8",
        "#6366f1",
        "#0ea5e9",
        "#10b981",
        "#f97316",
        "#64748b"
      ],
      borderRadius: 8
    }]
  },
  options: {
    ...commonOptions,
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { size: 18 },
          color: "#111827"
        }
      },
      y: {
        ticks: {
          font: { size: 18 },
          color: "#111827"
        }
      }
    }
  }
});