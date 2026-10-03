const token = localStorage.getItem("token");
const orderId = localStorage.getItem("orderId");

const payButton = document.getElementById("payButton");
const message = document.getElementById("message");

if (!token || !orderId) {
    window.location.href = "login.html";
}

payButton.addEventListener("click", async function () {

    const selectedPayment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );

    if (!selectedPayment) {

        message.innerHTML = `
            <div class="alert alert-danger">
                Please select a payment method.
            </div>
        `;

        return;
    }

    const paymentMethod = selectedPayment.value;

    try {

        // Get order details
        const orderResponse = await fetch(
            "/orders/" + orderId,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (orderResponse.status === 401 ||
            orderResponse.status === 403) {

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            window.location.href = "login.html";
            return;
        }

        if (!orderResponse.ok) {
            throw new Error(
                "Unable to get order details."
            );
        }

        const order = await orderResponse.json();


        // Create payment
        const paymentResponse = await fetch(
            "/payments",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({

                    orderId: Number(orderId),

                    amount: order.totalPrice,

                    paymentMethod: paymentMethod,

                    paymentStatus: "SUCCESS"
                })
            }
        );


        if (paymentResponse.status === 401 ||
            paymentResponse.status === 403) {

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            window.location.href = "login.html";
            return;
        }


        if (!paymentResponse.ok) {

            const errorData =
                await paymentResponse.json();

            message.innerHTML = `
                <div class="alert alert-danger">
                    ${errorData.message ||
                    "Payment failed."}
                </div>
            `;

            return;
        }


        // Get payment response
        const payment =
            await paymentResponse.json();


        // Save payment ID
        localStorage.setItem(
            "paymentId",
            payment.id
        );


        // Go to EXISTING order confirmation page
        window.location.href =
            "order-confirmation.html";


    } catch (error) {

        console.error(error);

        message.innerHTML = `
            <div class="alert alert-danger">
                ${error.message ||
                "Unable to process payment."}
            </div>
        `;
    }

});