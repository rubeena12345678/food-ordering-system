const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });

        const data = await response.json();

        if (response.ok) {

            // Save JWT token
            localStorage.setItem("token", data.token);

            // Save user information
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userEmail", data.email);

            message.innerHTML =
                `<div class="alert alert-success">
                    Login successful!
                </div>`;

            // Go to food page after login
            setTimeout(function () {
                window.location.href = "foods.html";
            }, 1000);

        } else {

            message.innerHTML =
                `<div class="alert alert-danger">
                    ${data.message || "Invalid email or password"}
                </div>`;
        }

    } catch (error) {

        console.error(error);

        message.innerHTML =
            `<div class="alert alert-danger">
                Unable to connect to the server.
            </div>`;
    }

});