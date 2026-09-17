const contactForm = document.querySelector("#contact-form");
const successMessage = document.querySelector("#form-success");
const errorMessage = document.querySelector("#form-error");
const submitButton = document.querySelector("#form-submit");
const submitText = document.querySelector("#form-submit-text");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        successMessage.classList.add("hidden");
        errorMessage.classList.add("hidden");

        submitButton.disabled = true;
        submitText.textContent = "Envoi en cours...";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                successMessage.classList.remove("hidden");
                contactForm.reset();

                submitText.textContent = "Message envoyé";

                // Retour au texte initial après quelques secondes
                setTimeout(() => {
                    submitText.textContent = "Envoyer le message";
                    submitButton.disabled = false;
                }, 4000);
            } else {
                throw new Error("Erreur lors de l'envoi");
            }
        } catch (error) {
            console.error("Erreur :", error);

            errorMessage.classList.remove("hidden");
            submitText.textContent = "Réessayer";
            submitButton.disabled = false;
        }
    });
}