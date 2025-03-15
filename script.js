document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/restaurants")
        .then(response => response.json())
        .then(data => {
            const restaurantsContainer = document.getElementById("restaurants");
            restaurantsContainer.innerHTML = "";

            data.forEach(restaurant => {
                const restaurantCard = document.createElement("div");
                restaurantCard.classList.add("restaurant-card");

                restaurantCard.innerHTML = `
                    <h2>${restaurant.name}</h2>
                    <img src="${restaurant.image}" class="restaurant-image" alt="${restaurant.name}">
                    <h3>Menu</h3>
                    <ul class="menu-list">
                        ${restaurant.menu.map(item => `
                            <li>
                                ${item.name} - $${item.price} 
                                <button class="order-btn" data-item='${JSON.stringify(item)}'>Order Now</button>
                            </li>
                        `).join('')}
                    </ul>
                `;

                restaurantsContainer.appendChild(restaurantCard);
            });

            // Handle order button clicks
            const orderList = document.getElementById("order-list");
            const totalPriceEl = document.getElementById("total-price");
            let totalPrice = 0;

            document.querySelectorAll(".order-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const item = JSON.parse(this.getAttribute("data-item"));

                    // Add item to order summary
                    const orderItem = document.createElement("li");
                    orderItem.textContent = `${item.name} - $${item.price}`;
                    orderList.appendChild(orderItem);

                    // Update total price
                    totalPrice += item.price;
                    totalPriceEl.textContent = `Total: $${totalPrice}`;
                });
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
