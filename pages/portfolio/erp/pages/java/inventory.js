const inventoryForm =
document.querySelector(".add-inventory-format");

const inventoryList =
document.getElementById("inventoryList");

let inventory =
JSON.parse(localStorage.getItem("inventory")) || [];

function saveInventory(){

    localStorage.setItem(
        "inventory",
        JSON.stringify(inventory)
    );

}

function renderInventory(){

    inventoryList.innerHTML = "";

    inventory.forEach(item => {

        const div =
        document.createElement("div");

        div.classList.add("inventory-item");

        div.innerHTML = `
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Part Number:</strong> ${item.partNumber}</p>
            <p><strong>Area:</strong> ${item.area}</p>
            <p><strong>Comments:</strong> ${item.comments}</p>
            <p><strong>Date:</strong> ${item.date}</p>
        `;

        inventoryList.appendChild(div);

    });

}

inventoryForm.addEventListener("submit", function(e){

    e.preventDefault();

    const item = {

        name:
        document.getElementById(
            "add-item-inventory"
        ).value,

        partNumber:
        document.getElementById(
            "add-part-number"
        ).value,

        area:
        document.getElementById(
            "area-add-inventory"
        ).value,

        comments:
        document.getElementById(
            "add-inventory-comment"
        ).value,

        date:
        document.getElementById(
            "date-add-inventory"
        ).value
    };

    inventory.push(item);

    saveInventory();

    renderInventory();

    inventoryForm.reset();

});

renderInventory();