const cartContainer = document.getElementById("cartContainer");
const message = document.getElementById("message");

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");


// Check login
if (!token || !userId) {

    window.location.href = "login.html";

} else {

    loadCart();

}


// Load cart items
async function loadCart() {

    try {

        const response = await fetch("/cart", {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });


        // Token expired
        if (response.status === 401 ||
            response.status === 403) {

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            window.location.href = "login.html";

            return;
        }


        if (!response.ok) {

            throw new Error("Failed to load cart");

        }


        const cartItems = await response.json();


        // Get current user's cart
        const userCart = cartItems.filter(function(item) {

            return String(item.userId) === String(userId);

        });


        // Empty cart
        if (userCart.length === 0) {

            cartContainer.innerHTML = `

                <div class="alert alert-info text-center">

                    🛒 Your cart is empty.

                    <br><br>

                    <a href="foods.html"
                       class="btn btn-success">

                        Browse Foods

                    </a>

                </div>

            `;

            updateSummary(0);

            return;
        }


        cartContainer.innerHTML = "";


        let totalAmount = 0;


        // Load every cart item
        for (const item of userCart) {

            const foodResponse = await fetch(
                "/foods/" + item.foodId,
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


            if (!foodResponse.ok) {

                continue;

            }


            const food = await foodResponse.json();


            const itemTotal =
                food.price * item.quantity;


            totalAmount += itemTotal;


            cartContainer.innerHTML += `

                <div class="cart-card">

                    <div class="d-flex
                                align-items-center
                                justify-content-between
                                flex-wrap
                                gap-3">


                        <!-- Food Details -->

                        <div class="d-flex
                                    align-items-center
                                    gap-3">


                            <img
                                src="https://www.shopitnepal.com/files/uploads/image/43608859-f27f-4e06-b07d-c11075a9768b-s231regen.png"
                                class="food-image"
                                alt="${food.name}"
                            >


                            <div>

                                <div class="food-name">

                                    ${food.name}

                                </div>


                                <div class="food-category">

                                    ${food.category}

                                </div>


                                <div class="price">

                                    ₹${food.price}

                                </div>

                            </div>

                        </div>


                        <!-- Quantity -->

                        <div class="quantity-box">

                            <button
                                class="quantity-btn"
                                onclick="decreaseQuantity(
                                    ${item.id},
                                    ${item.quantity}
                                )">

                                −

                            </button>


                            <span class="quantity">

                                ${item.quantity}

                            </span>


                            <button
                                class="quantity-btn"
                                onclick="increaseQuantity(
                                    ${item.id},
                                    ${item.quantity}
                                )">

                                +

                            </button>

                        </div>


                        <!-- Item Total -->

                        <div class="price">

                            ₹${itemTotal}

                        </div>


                        <!-- Remove -->

                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${item.id})">

                            🗑 Remove

                        </button>

                    </div>

                </div>

            `;

        }


        updateSummary(totalAmount);


    } catch (error) {

        console.error(error);

        message.innerHTML = `

            <div class="alert alert-danger">

                Unable to load your cart.

            </div>

        `;

    }

}



// Increase quantity
async function increaseQuantity(
    cartId,
    currentQuantity
) {

    try {

        const response = await fetch(
            "/cart/" + cartId,
            {

                method: "GET",

                headers: {
                    "Authorization": "Bearer " + token
                }

            }
        );


        if (!response.ok) {

            throw new Error(
                "Unable to get cart item"
            );

        }


        const cartItem = await response.json();


        const newQuantity =
            currentQuantity + 1;


        const updateResponse = await fetch(
            "/cart/" + cartId,
            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " + token

                },

                body: JSON.stringify({

                    userId: cartItem.userId,

                    foodId: cartItem.foodId,

                    quantity: newQuantity

                })

            }
        );


        if (!updateResponse.ok) {

            throw new Error(
                "Unable to update quantity"
            );

        }


        loadCart();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to update quantity."
        );

    }

}



// Decrease quantity
async function decreaseQuantity(
    cartId,
    currentQuantity
) {

    if (currentQuantity <= 1) {

        return;

    }


    try {

        const response = await fetch(
            "/cart/" + cartId,
            {

                method: "GET",

                headers: {
                    "Authorization":
                        "Bearer " + token
                }

            }
        );


        if (!response.ok) {

            throw new Error(
                "Unable to get cart item"
            );

        }


        const cartItem = await response.json();


        const newQuantity =
            currentQuantity - 1;


        const updateResponse = await fetch(
            "/cart/" + cartId,
            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " + token

                },

                body: JSON.stringify({

                    userId: cartItem.userId,

                    foodId: cartItem.foodId,

                    quantity: newQuantity

                })

            }
        );


        if (!updateResponse.ok) {

            throw new Error(
                "Unable to update quantity"
            );

        }


        loadCart();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to update quantity."
        );

    }

}



// Remove item
async function removeFromCart(cartId) {

    const confirmRemove =
        confirm(
            "Are you sure you want to remove this item?"
        );


    if (!confirmRemove) {

        return;

    }


    try {

        const response = await fetch(
            "/cart/" + cartId,
            {

                method: "DELETE",

                headers: {

                    "Authorization":
                        "Bearer " + token

                }

            }
        );


        if (!response.ok) {

            throw new Error(
                "Unable to remove item"
            );

        }


        loadCart();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to remove item."
        );

    }

}



// Update order summary
function updateSummary(subtotal) {

    const deliveryFee =
        subtotal > 0 ? 40 : 0;


    const total =
        subtotal + deliveryFee;


    document.getElementById(
        "subtotal"
    ).innerText =
        "₹" + subtotal;


    document.getElementById(
        "deliveryFee"
    ).innerText =
        "₹" + deliveryFee;


    document.getElementById(
        "total"
    ).innerText =
        "₹" + total;

}