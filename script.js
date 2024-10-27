// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOuLEJq62q4II7PyrxTEVMSm-m7V_1MB4",
    authDomain: "shoppinglist-55f9a.firebaseapp.com",
    databaseURL: "https://shoppinglist-55f9a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shoppinglist-55f9a",
    storageBucket: "shoppinglist-55f9a.appspot.com",
    messagingSenderId: "66310600403",
    appId: "1:66310600403:web:aafe121d1949445e508626",
    measurementId: "G-8BZFSHJ0R6"
};

// Initialize Firebase and Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const listRef = ref(database, 'shoppingList');

// Add item function
window.addItem = function () {
    const itemName = document.getElementById("itemName").value.trim();
    const itemQuantity = parseInt(document.getElementById("itemQuantity").value);

    if (itemName === "" || isNaN(itemQuantity) || itemQuantity < 1) {
        alert("Please enter a valid item name and quantity.");
        return;
    }

    // Push new item to Firebase
    push(listRef, {
        name: itemName,
        quantity: itemQuantity
    });

    // Clear input fields
    document.getElementById("itemName").value = "";
    document.getElementById("itemQuantity").value = "1";
};

// Retrieve and display items from Firebase
function displayItems() {
    onValue(listRef, (snapshot) => {
        const itemsContainer = document.getElementById("itemsContainer");
        itemsContainer.innerHTML = ""; // Clear existing items
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");
            itemElement.textContent = `${item.name} - Quantity: ${item.quantity}`;
            itemsContainer.appendChild(itemElement);
        });
    });
}

// Display items on load
displayItems();
