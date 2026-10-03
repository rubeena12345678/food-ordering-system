const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    try {

        const response = await fetch("/users", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone
            })

        });

        const data = await response.json();

        if (response.ok) {

            message.innerHTML =
                `<div class="alert alert-success">
                    Registration successful!
                    <br>
                    Please login.
                </div>`;

            registerForm.reset();

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1500);

        } else {

            let errorMessage = "Registration failed.";

            if (data.message) {
                errorMessage = data.message;
            }

            message.innerHTML =
                `<div class="alert alert-danger">
                    ${errorMessage}
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