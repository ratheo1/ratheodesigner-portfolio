const params = new URLSearchParams(window.location.search);
const serviceId = params.get("id");

const titleElement = document.querySelector("#service-title");
const numberElement = document.querySelector("#service-number");
const priceElement = document.querySelector("#service-price");
const imageElement = document.querySelector("#service-image");
const descriptionElement = document.querySelector("#service-description");
const includedElement = document.querySelector("#service-included");
const deadlineElement = document.querySelector("#service-deadline");
const ctaTitleElement = document.querySelector("#service-cta-title");
const ctaDescriptionElement = document.querySelector("#service-cta-description");

// Mettre à jour la meta description
function setMetaDescription(content) {
    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", content);
}

fetch("../data/services.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Impossible de charger les services.");
        }

        return response.json();
    })
    .then((services) => {
        const service = services.find((item) => item.id === serviceId);

        if (!service) {
            document.title = "Service introuvable — Rathéo";

            document.querySelector("main").innerHTML = `
                <section class="flex min-h-[70vh] items-center justify-center px-6 text-center">
                    <div>
                        <p class="mb-5 text-sm text-white/40">Erreur 404</p>

                        <h1 class="text-4xl font-medium tracking-tight md:text-6xl">
                            Service introuvable
                        </h1>

                        <a
                            href="../index.html#services"
                            class="mt-8 inline-block border-b border-white/40 pb-2 text-sm text-white/70 transition-colors hover:border-white hover:text-white"
                        >
                            Retour aux services
                        </a>
                    </div>
                </section>
            `;

            return;
        }

        // Titre SEO et meta description depuis services.json
        document.title = service.seoTitle || `${service.title} — Rathéo`;

        setMetaDescription(
            service.metaDescription || service.description
        );

        // Contenu dynamique
        titleElement.textContent = service.title;
        numberElement.textContent = service.number || "01";
        priceElement.textContent = service.price;
        descriptionElement.textContent = service.description;
        deadlineElement.textContent = service.deadline;

        // Image dynamique
        imageElement.src = service.image || "";
        imageElement.alt = `${service.title} — Rathéo`;

        // CTA dynamique
        ctaTitleElement.textContent = service.ctaTitle || "";
        ctaDescriptionElement.textContent = service.ctaDescription || "";

        // Liste des éléments inclus
        includedElement.innerHTML = service.included
            .map(
                (item, index) => `
                    <li class="flex items-start gap-5 border-b border-white/15 py-4">
                        <span class="min-w-8 text-sm text-white/30">
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                        <span class="text-sm leading-relaxed text-white/70 md:text-base">
                            ${item}
                        </span>
                    </li>
                `
            )
            .join("");

        console.log("Included : ", includedElement);
    })
    .catch((error) => {
        console.error("Erreur :", error);
    });

console.log("Élément HTML :", includedElement);
