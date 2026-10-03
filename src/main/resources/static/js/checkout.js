const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const orderNowFoodId =
    localStorage.getItem("orderNowFoodId");

const addressForm =
    document.getElementById("addressForm");

const message =
    document.getElementById("message");

const subtotalElement =
    document.getElementById("subtotal");

const totalElement =
    document.getElementById("total");


/* =====================================
   LOGIN CHECK
===================================== */

if (!token || !userId) {

    window.location.href = "login.html";

}


/* =====================================
   DELIVERY FEE
===================================== */

const DELIVERY_FEE = 40;


/* =====================================
   LOAD CHECKOUT
===================================== */

async function loadCheckout() {

    try {

        /*
        =================================
        ORDER NOW
        =================================
        */

        if (orderNowFoodId) {

            await loadOrderNowCheckout();

            return;
        }


        /*
        =================================
        CART CHECKOUT
        =================================
        */

        await loadCartCheckout();

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
   ORDER NOW CHECKOUT
===================================== */

async function loadOrderNowCheckout() {

    const response =
        await fetch(
            "/foods/" + orderNowFoodId,
            {
                headers: {
                    "Authorization":
                        "Bearer " + token
                }
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
            "Unable to load selected food."
        );

    }


    const food =
        await response.json();


    /*
    Direct order quantity = 1
    */

    const subtotal =
        food.price;


    const total =
        subtotal + DELIVERY_FEE;


    /*
    Display summary
    */

    subtotalElement.textContent =
        "₹" + subtotal;

    totalElement.textContent =
        "₹" + total;


    /*
    Store selected food information
    */

    localStorage.setItem(
        "orderNowFoodPrice",
        food.price
    );

    localStorage.setItem(
        "orderNowFoodName",
        food.name
    );

}


/* =====================================
   CART CHECKOUT
===================================== */

async function loadCartCheckout() {

    const cartResponse =
        await fetch(
            "/cart",
            {
                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );


    if (
        cartResponse.status === 401 ||
        cartResponse.status === 403
    ) {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        window.location.href =
            "login.html";

        return;
    }


    if (!cartResponse.ok) {

        throw new Error(
            "Unable to load cart."
        );

    }


    const allCartItems =
        await cartResponse.json();


    const userCart =
        allCartItems.filter(function(item) {

            return item.userId ===
                Number(userId);

        });


    if (userCart.length === 0) {

        message.innerHTML = `

            <div class="alert alert-warning">

                🛒 Your cart is empty.

                <br><br>

                <a
                    href="foods.html"
                    class="btn btn-success">

                    Browse Food

                </a>

            </div>

        `;

        return;
    }


    let subtotal = 0;


    /*
    Calculate cart subtotal
    */

    for (const cartItem of userCart) {

        const foodResponse =
            await fetch(
                "/foods/" + cartItem.foodId,
                {
                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


        if (!foodResponse.ok) {

            continue;

        }


        const food =
            await foodResponse.json();


        subtotal +=
            food.price *
            cartItem.quantity;

    }


    const total =
        subtotal + DELIVERY_FEE;


    /*
    Display summary
    */

    subtotalElement.textContent =
        "₹" + subtotal;

    totalElement.textContent =
        "₹" + total;

}


/* =====================================
   SUBMIT ADDRESS
===================================== */

addressForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        try {

            /*
            =================================
            CREATE ADDRESS OBJECT
            =================================
            */

            const address = {

                userId:
                    Number(userId),

                houseNo:
                    document.getElementById(
                        "houseNo"
                    ).value.trim(),

                street:
                    document.getElementById(
                        "street"
                    ).value.trim(),

                city:
                    document.getElementById(
                        "city"
                    ).value.trim(),

                state:
                    document.getElementById(
                        "state"
                    ).value.trim(),

                pincode:
                    document.getElementById(
                        "pincode"
                    ).value.trim()

            };


            /*
            =================================
            SAVE ADDRESS
            =================================
            */

            const addressResponse =
                await fetch(
                    "/addresses",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body:
                            JSON.stringify(
                                address
                            )

                    }
                );


            if (
                addressResponse.status === 401 ||
                addressResponse.status === 403
            ) {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "userId"
                );

                window.location.href =
                    "login.html";

                return;
            }


            if (!addressResponse.ok) {

                const errorData =
                    await addressResponse.json();

                message.innerHTML = `

                    <div class="alert alert-danger">

                        ${
                            errorData.message ||
                            "Unable to save address."
                        }

                    </div>

                `;

                return;
            }


            /*
            =================================
            ORDER NOW
            =================================
            */

            if (orderNowFoodId) {

                await createDirectOrder();

                return;
            }


            /*
            =================================
            CART ORDER
            =================================
            */

            await createCartOrders();

        }

        catch (error) {

            console.error(error);

            message.innerHTML = `

                <div class="alert alert-danger">

                    ${
                        error.message ||
                        "Something went wrong."
                    }

                </div>

            `;

        }

    }
);


/* =====================================
   CREATE DIRECT ORDER
===================================== */

async function createDirectOrder() {

    const foodResponse =
        await fetch(
            "/foods/" + orderNowFoodId,
            {
                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );


    if (!foodResponse.ok) {

        throw new Error(
            "Unable to get food details."
        );

    }


    const food =
        await foodResponse.json();


    /*
    Create order
    */

    const orderResponse =
        await fetch(
            "/orders",
            {

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
                        Number(orderNowFoodId),

                    quantity:
                        1,

                    totalPrice:
                        food.price,

                    status:
                        "PLACED"

                })

            }
        );


    if (
        orderResponse.status === 401 ||
        orderResponse.status === 403
    ) {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        window.location.href =
            "login.html";

        return;
    }


    if (!orderResponse.ok) {

        const errorData =
            await orderResponse.json();

        throw new Error(
            errorData.message ||
            "Unable to place order."
        );

    }


    const order =
        await orderResponse.json();


    /*
    Save order ID
    */

    localStorage.setItem(
        "orderId",
        order.id
    );


    /*
    Remove direct-order temporary data
    */

    localStorage.removeItem(
        "orderNowFoodId"
    );

    localStorage.removeItem(
        "orderNowFoodPrice"
    );

    localStorage.removeItem(
        "orderNowFoodName"
    );


    /*
    Go to payment
    */

    window.location.href =
        "payment.html";

}


/* =====================================
   CREATE CART ORDERS
===================================== */

async function createCartOrders() {

    const cartResponse =
        await fetch(
            "/cart",
            {
                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );


    if (
        cartResponse.status === 401 ||
        cartResponse.status === 403
    ) {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        window.location.href =
            "login.html";

        return;
    }


    if (!cartResponse.ok) {

        throw new Error(
            "Unable to load cart."
        );

    }


    const allCartItems =
        await cartResponse.json();


    const userCart =
        allCartItems.filter(function(item) {

            return item.userId ===
                Number(userId);

        });


    if (userCart.length === 0) {

        throw new Error(
            "Your cart is empty."
        );

    }


    let lastOrderId = null;


    /*
    Create orders for cart items
    */

    for (const cartItem of userCart) {

        const foodResponse =
            await fetch(
                "/foods/" + cartItem.foodId,
                {
                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


        if (!foodResponse.ok) {

            continue;

        }


        const food =
            await foodResponse.json();


        const itemTotal =
            food.price *
            cartItem.quantity;


        const orderResponse =
            await fetch(
                "/orders",
                {

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
                            cartItem.foodId,

                        quantity:
                            cartItem.quantity,

                        totalPrice:
                            itemTotal,

                        status:
                            "PLACED"

                    })

                }
            );


        if (!orderResponse.ok) {

            throw new Error(
                "Unable to create order."
            );

        }


        const order =
            await orderResponse.json();


        lastOrderId =
            order.id;


        /*
        Remove cart item
        */

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

    }


    /*
    Save last order ID
    */

    localStorage.setItem(
        "orderId",
        lastOrderId
    );


    /*
    Go to payment
    */

    window.location.href =
        "payment.html";

}


/* =====================================
   START CHECKOUT
===================================== */

loadCheckout();