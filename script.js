// JavaScript for adding, listing, and removing items from the shopping list

// Array to store list items
let shoppingList = [];

// Function to add an item to the list
function addItem() {
    const itemName = document.getElementById("itemName").value.trim();
    const itemQuantity = parseInt(document.getElementById("itemQuantity").value);

    if (itemName === "" || isNaN(itemQuantity) || itemQuantity < 1) {
        alert("Please enter a valid item name and quantity.");
        return;
    }

    // Add the item to the shopping list
    shoppingList.push({ name: itemName, quantity: itemQuantity });
    
    // Clear input fields
    document.getElementById("itemName").value = "";
    document.getElementById("itemQuantity").value = "1";

    // Update the list display
    displayList();
}

// Function to remove an item from the list
function removeItem(index) {
    shoppingList.splice(index, 1);
    displayList();
}

// Function to display the list items
function displayList() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = ""; // Clear the list container

    shoppingList.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "item";

        itemElement.innerHTML = `
            <span>${item.name} - Quantity: ${item.quantity}</span>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        
        listContainer.appendChild(itemElement);
    });
}
