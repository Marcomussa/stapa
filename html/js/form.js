const contactForm = document.getElementById("contact-form-data")
const nameForm = document.getElementById("name-form")
const email = document.getElementById("email-form")
const message = document.getElementById("text-form")
const submitBTN = document.getElementById("submit-mainSection");

const serviceID = "service_68yu6nh"
const templateID = "template_27p7nbn"

emailjs.init("w0qdp6mhuSS8BSVoY");

document.addEventListener("DOMContentLoaded", () => {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault()

        var response = grecaptcha.getResponse();
        if (response.length === 0) {
            let timerInterval;
            Swal.fire({
                title: "Por favor, completa el reCAPTCHA antes de enviar el formulario.",
                html: "Me cerrare en <b></b> milisegundos",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        } else {
            submitBTN.innerText = "Enviando...";
            submitBTN.setAttribute("data-text", "Enviando...");

            const templateParams = {
                nameForm: nameForm.value,
                email: email.value,
                message: message.value,
            };

            emailjs.send(serviceID, templateID, templateParams)
                .then(function (response) {
                    Swal.fire({
                        title: "¡El correo electrónico se ha enviado con éxito!",
                        text: "En breve nos comunicaremos con usted",
                        icon: "success",
                        confirmButtonText: "Listo",
                    });

                    submitBTN.innerText = "Enviado!";
                    submitBTN.setAttribute("data-text", "Enviado!");

                    nameForm.value = "";
                    email.value = "";
                    message.value = "";
                    grecaptcha.reset();

                }, function (error) {
                    Swal.fire({
                        title: "¡Ha ocurrido un error!",
                        text: "Contactese con marcomussa567@gmail.com",
                        icon: "error",
                        confirmButtonText: "Listo",
                    });

                    submitBTN.innerText = "Error";
                    submitBTN.setAttribute("data-text", "Error");

                    console.log(error)
                });
        }

    });
})
