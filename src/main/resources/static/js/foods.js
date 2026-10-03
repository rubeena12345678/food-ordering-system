const token =
    localStorage.getItem("token");

const userId =
    localStorage.getItem("userId");

const foodContainer =
    document.getElementById("foodContainer");

const message =
    document.getElementById("message");

const searchInput =
    document.getElementById("searchInput");

let allFoods = [];

let selectedCategory = "All";

let userCart = [];


if (!token || !userId) {

    window.location.href =
        "login.html";

}


/* =====================================
   FOOD IMAGES
===================================== */

function getFoodImage(foodName) {

    const name =
        foodName.toLowerCase().trim();


    if (name === "chicken biryani") {
        return "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "mutton biryani") {
        return "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "veg biryani") {
        return "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "egg biryani") {
        return "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "paneer biryani") {
        return "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80";
    }


    if (name === "margherita pizza") {
        return "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "chicken pizza") {
        return "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "paneer pizza") {
        return "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "farmhouse pizza") {
        return "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80";
    }


    if (name === "chicken burger") {
        return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "veg burger") {
        return "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "cheese burger") {
        return "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "paneer burger") {
        return "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?auto=format&fit=crop&w=800&q=80";
    }


    if (name === "chicken noodles") {
        return "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "veg noodles") {
        return "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80";
    }


    if (name === "chicken fried rice") {
        return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "veg fried rice") {
        return "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80";
    }


    if (name === "chicken 65") {
        return "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "chicken manchurian") {
        return "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "paneer tikka") {
        return "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "gobi manchurian") {
        return "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=800&q=80";
    }


    if (name === "french fries") {
        return "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "chicken nuggets") {
        return "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "garlic bread") {
        return "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=800&q=80";
    }


    if (name === "chocolate cake") {
        return "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "gulab jamun") {
        return "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "brownie") {
        return "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "vanilla ice cream") {
        return "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80";
    }


    if (name === "coke") {
        return "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80";
    }

    if (name === "fresh lime soda") {
        return "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80";
    }


    return "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80";
}


/* =====================================
   LOAD CART
===================================== */

async function loadCurrentCart() {

    const response =
        await fetch("/cart", {
            headers: {
                "Authorization":
                    "Bearer " + token
            }
        });


    if (
        response.status === 401 ||
        response.status === 403
    ) {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        window.location.href =
            "login.html";

        return false;
    }


    if (!response.ok) {
        return false;
    }


    const allCartItems =
        await response.json();


    userCart =
        allCartItems.filter(function(item) {

            return item.userId ===
                Number(userId);

        });


    return true;
}


/* =====================================
   GET CART ITEM
===================================== */

function getCartItem(foodId) {

    return userCart.find(function(item) {

        return item.foodId === foodId;

    });

}


/* =====================================
   LOAD FOODS
===================================== */

async function loadFoods() {

    try {

        await loadCurrentCart();


        const response =
            await fetch("/foods", {
                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            });


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            window.location.href =
                "login.html";

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Unable to load food items."
            );

        }


        allFoods =
            await response.json();


        displayFoods(allFoods);

    }
    catch (error) {

        console.error(error);

        message.innerHTML = `

            <div class="alert alert-danger">

                ${error.message}

            </div>

        `;

    }

}


/* =====================================
   DISPLAY FOODS
===================================== */

function displayFoods(foods) {

    foodContainer.innerHTML = "";


    if (foods.length === 0) {

        foodContainer.innerHTML = `

            <div class="col-12">

                <div class="no-food">

                    😔 No food items found.

                </div>

            </div>

        `;

        return;
    }


    foods.forEach(function(food) {

        const image =
            getFoodImage(food.name);


        const cartItem =
            getCartItem(food.id);


        const quantity =
            cartItem
                ? cartItem.quantity
                : 0;


        let buttonHTML;


        if (quantity === 0) {

            buttonHTML = `

                <button
                    class="add-cart-btn"
                    onclick="addToCart(${food.id})">

                    🛒 Add to Cart

                </button>

            `;

        }
        else {

            buttonHTML = `

                <div class="quantity-control">

                    <button
                        type="button"
                        class="quantity-btn minus-btn"
                        onclick="decreaseFoodQuantity(${food.id})">

                        −

                    </button>


                    <span class="quantity-number">

                        ${quantity}

                    </span>


                    <button
                        type="button"
                        class="quantity-btn plus-btn"
                        onclick="increaseFoodQuantity(${food.id})">

                        +

                    </button>

                </div>

            `;

        }


        const card =
            document.createElement("div");


        card.className =
            "col-12 col-sm-6 col-lg-4 col-xl-3";


        card.innerHTML = `

            <div class="food-card">

                <img
                    src="${image}"
                    alt="${food.name}"
                    class="food-image"
                >


                <div class="food-content">

                    <div class="food-name">
                        ${food.name}
                    </div>


                    <div class="food-category">
                        ${food.category}
                    </div>


                    <div class="mt-3 mb-3">

                        <div class="food-price">
                            ₹${food.price}
                        </div>

                    </div>


                    <div class="action-row">

                        <div class="cart-action">

                            ${buttonHTML}

                        </div>


                        <button
                            type="button"
                            class="order-now-btn"
                            onclick="orderNow(${food.id})">

                            ⚡ Order Now

                        </button>

                    </div>

                </div>

            </div>

        `;


        foodContainer.appendChild(card);

    });

}


/* =====================================
   ADD TO CART
===================================== */

async function addToCart(foodId) {

    const existing =
        getCartItem(foodId);


    if (existing) {

        await updateCartQuantity(
            existing,
            existing.quantity + 1
        );

        return;
    }


    try {

        const response =
            await fetch("/cart", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " + token

                },

                body: JSON.stringify({

                    userId:
                        Number(userId),

                    foodId:
                        foodId,

                    quantity: 1

                })

            });


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            window.location.href =
                "login.html";

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Unable to add food to cart."
            );

        }


        await loadCurrentCart();

        applyCurrentFilter();

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to add food to cart."
        );

    }

}


/* =====================================
   UPDATE QUANTITY
===================================== */

async function updateCartQuantity(
    cartItem,
    newQuantity
) {

    try {

        if (newQuantity < 1) {
            return;
        }


        const response =
            await fetch(
                "/cart/" + cartItem.id,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body: JSON.stringify({

                        userId:
                            Number(userId),

                        foodId:
                            cartItem.foodId,

                        quantity:
                            newQuantity

                    })

                }
            );


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            window.location.href =
                "login.html";

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Unable to update quantity."
            );

        }


        await loadCurrentCart();

        applyCurrentFilter();

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to update quantity."
        );

    }

}


/* =====================================
   PLUS
===================================== */

async function increaseFoodQuantity(foodId) {

    const cartItem =
        getCartItem(foodId);


    if (!cartItem) {
        return;
    }


    await updateCartQuantity(
        cartItem,
        cartItem.quantity + 1
    );

}


/* =====================================
   MINUS
===================================== */

async function decreaseFoodQuantity(foodId) {

    const cartItem =
        getCartItem(foodId);


    if (!cartItem) {
        return;
    }


    if (cartItem.quantity === 1) {

        await removeFromCart(foodId);

        return;
    }


    await updateCartQuantity(
        cartItem,
        cartItem.quantity - 1
    );

}


/* =====================================
   REMOVE
===================================== */

async function removeFromCart(foodId) {

    const cartItem =
        getCartItem(foodId);


    if (!cartItem) {
        return;
    }


    try {

        const response =
            await fetch(
                "/cart/" + cartItem.id,
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
                "Unable to remove item."
            );

        }


        await loadCurrentCart();

        applyCurrentFilter();

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to remove item."
        );

    }

}


/* =====================================
   SEARCH
===================================== */

searchInput.addEventListener(
    "input",
    function() {

        applyCurrentFilter();

    }
);


/* =====================================
   CATEGORY
===================================== */

function filterCategory(
    category,
    button
) {

    selectedCategory =
        category;


    document
        .querySelectorAll(".category-btn")
        .forEach(function(btn) {

            btn.classList.remove(
                "active"
            );

        });


    button.classList.add("active");


    applyCurrentFilter();

}


/* =====================================
   FILTER
===================================== */

function applyCurrentFilter() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredFoods =
        allFoods.filter(function(food) {

            const matchesSearch =
                food.name
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                selectedCategory === "All" ||
                food.category ===
                    selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayFoods(filteredFoods);

}


/* =====================================
   ORDER NOW
===================================== */

function orderNow(foodId) {

    localStorage.setItem(
        "orderNowFoodId",
        foodId
    );


    window.location.href =
        "checkout.html";

}


/* =====================================
   START
===================================== */

loadFoods();