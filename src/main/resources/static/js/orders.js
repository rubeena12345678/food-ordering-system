const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const ordersContainer =
    document.getElementById("ordersContainer");


/* =====================================
   LOGIN CHECK
===================================== */

if (!token || !userId) {

    window.location.href =
        "login.html";

}


/* =====================================
   FOOD IMAGE
===================================== */

function getFoodImage(foodName) {

    const images = {

        "Chicken Biryani":
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",

        "Mutton Biryani":
            "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=800&q=80",

        "Veg Biryani":
            "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",

        "Egg Biryani":
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",

        "Paneer Biryani":
            "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",

        "Margherita Pizza":
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",

        "Chicken Pizza":
            "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=800&q=80",

        "Paneer Pizza":
            "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",

        "Farmhouse Pizza":
            "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",

        "Chicken Burger":
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",

        "Veg Burger":
            "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80",

        "Cheese Burger":
            "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",

        "Paneer Burger":
            "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?auto=format&fit=crop&w=800&q=80",

        "Chicken Noodles":
            "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80",

        "Veg Noodles":
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",

        "Chicken Fried Rice":
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",

        "Veg Fried Rice":
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",

        "Chicken 65":
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",

        "Chicken Manchurian":
            "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",

        "Paneer Tikka":
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",

        "Gobi Manchurian":
            "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=800&q=80",

        "French Fries":
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",

        "Chicken Nuggets":
            "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=800&q=80",

        "Garlic Bread":
            "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=800&q=80",

        "Chocolate Cake":
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",

        "Gulab Jamun":
            "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",

        "Brownie":
            "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80",

        "Vanilla Ice Cream":
            "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80",

        "Coke":
            "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",

        "Fresh Lime Soda":
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"

    };


    return images[foodName] ||
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80";
}


/* =====================================
   LOAD ORDERS
===================================== */

async function loadOrders() {

    try {

        const response =
            await fetch(
                "/orders",
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
                "Unable to load orders."
            );

        }


        const allOrders =
            await response.json();


        /*
        Get only current user's orders
        */

        const userOrders =
            allOrders.filter(function(order) {

                return order.userId ===
                    Number(userId);

            });


        /*
        No orders
        */

        if (userOrders.length === 0) {

            ordersContainer.innerHTML = `

                <div class="empty-orders">

                    <div style="font-size: 55px;">
                        🍽️
                    </div>

                    <h3>
                        No orders yet
                    </h3>

                    <p class="text-muted">
                        You haven't placed any orders yet.
                    </p>

                    <a
                        href="foods.html"
                        class="btn browse-btn">

                        Browse Food

                    </a>

                </div>

            `;

            return;
        }


        /*
        Display orders
        */

        ordersContainer.innerHTML = "";


        for (const order of userOrders) {

            /*
            Get food details
            */

            const foodResponse =
                await fetch(
                    "/foods/" + order.foodId,
                    {
                        headers: {
                            "Authorization":
                                "Bearer " + token
                        }
                    }
                );


            let foodName =
                "Food";

            let foodImage =
                getFoodImage("Food");


            if (foodResponse.ok) {

                const food =
                    await foodResponse.json();

                foodName =
                    food.name;

                foodImage =
                    getFoodImage(food.name);

            }


            /*
            Create order card
            */

            ordersContainer.innerHTML += `

                <div class="order-card">

                    <div
                        class="d-flex
                               justify-content-between
                               align-items-start
                               flex-wrap
                               gap-3">

                        <div
                            class="d-flex
                                   align-items-center
                                   gap-3">

                            <img
                                src="${foodImage}"
                                class="food-image"
                                alt="${foodName}">

                            <div>

                                <div class="order-id">

                                    Order #${order.id}

                                </div>

                                <div class="food-name">

                                    ${foodName}

                                </div>

                            </div>

                        </div>


                        <span class="status">

                            ${order.status}

                        </span>

                    </div>


                    <hr>


                    <div
                        class="d-flex
                               justify-content-between
                               align-items-center
                               flex-wrap
                               gap-3">

                        <div class="order-info">

                            Quantity:
                            <strong>
                                ${order.quantity}
                            </strong>

                        </div>


                        <div class="price">

                            ₹${order.totalPrice}

                        </div>

                    </div>

                </div>

            `;

        }

    }

    catch (error) {

        console.error(error);

        ordersContainer.innerHTML = `

            <div class="alert alert-danger">

                ${error.message}

            </div>

        `;

    }

}


/* =====================================
   START
===================================== */

loadOrders();