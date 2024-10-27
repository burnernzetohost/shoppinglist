// Reference to the shopping list in Firebase
const listRef = firebase.database().ref('shoppingList');

// Function to add an item to Firebase
function addItem() {
    const itemName = document.getElementById("itemName").value.trim();
    const itemQuantity = parseInt(document.getElementById("itemQuantity").value);

    if (itemName === "" || isNaN(itemQuantity) || itemQuantity < 1) {
        alert("Please enter a valid item name and quantity.");
        return;
    }

    // Push the new item to Firebase
    listRef.push({
        name: itemName,
        quantity: itemQuantity
    });

    // Clear input fields
    document.getElementById("itemName").value = "";
    document.getElementById("itemQuantity").value = "1";
}

// Function to remove an item from Firebase
function removeItem(itemId) {
    listRef.child(itemId).remove();
}

// Function to display the list items
function displayList() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    listRef.on("value", (snapshot) => {
        listContainer.innerHTML = ""; // Clear the list container

        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            const itemId = childSnapshot.key;
            
            const itemElement = document.createElement("div");
            itemElement.className = "item";

            itemElement.innerHTML = `
                <span>${item.name} - Quantity: ${item.quantity}</span>
                <button onclick="removeItem('${itemId}')">Remove</button>
            `;
            
            listContainer.appendChild(itemElement);
        });
    });
}

// Initial call to display list
displayList();
