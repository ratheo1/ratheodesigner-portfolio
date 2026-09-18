const params = new URLSearchParams(window.location.search);
const serviceId = params.get("id");

// Éléments HTML
const titleElement = document.querySelector("#service-title");
const numberElement = document.querySelector("#service-number");
const priceElement = document.querySelector("#service-price");
const imageElement = document.querySelector("#service-image");
const descriptionElement = document.querySelector("#service-description");
const includedElement = document.querySelector("#service-included");
const deadlineElement = document.querySelector("#service-deadline");
const ctaTitleElement = document.querySelector("#service-cta-title");
const ctaDescriptionElement = document.querySelector("#service-cta-description");

// Créer ou mettre à jour une balise meta
function setMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);

    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
}

// Créer ou mettre à jour la balise canonical
function setCanonical(url) {
    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);
}

// Charger les services
fetch("../data/services.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Impossible de charger les services.");
        }

        return response.json();
    })
    .then((services) => {
        const service = services.find((item) => item.id === serviceId);

        // Si le service n'existe pas
        if (!service) {
            document.title = "Service introuvable";

            setMetaTag(
                "description",
                "Le service demandé est introuvable. Découvrez les services de design graphique proposés."
            );

            return;
        }

        /*
         * SEO dynamique depuis services.json
         */
        document.title =
            service.seoTitle ||
            service.title ||
            "Service de design graphique";

        setMetaTag(
            "description",
            service.metaDescription ||
            service.description ||
            "Découvrez nos services de design graphique."
        );

        setCanonical(
            `https://ratheodesigner.site/pages/service.html?id=${encodeURIComponent(service.id)}`
        );

        /*
         * Contenu de la page
         */
        if (titleElement) {
            titleElement.textContent = service.title || "";
        }

        if (numberElement) {
            numberElement.textContent = service.number || "";
        }

        if (priceElement) {
            priceElement.textContent = service.price || "";
        }

        if (descriptionElement) {
            descriptionElement.textContent = service.description || "";
        }

        if (deadlineElement) {
            deadlineElement.textContent = service.deadline || "";
        }

        if (imageElement) {
            imageElement.src = service.image || "";
            imageElement.alt = service.title || "Service de design graphique";
            imageElement.loading = "lazy";
            imageElement.decoding = "async";
        }

        if (ctaTitleElement) {
            ctaTitleElement.textContent = service.ctaTitle || "";
        }

        if (ctaDescriptionElement) {
            ctaDescriptionElement.textContent = service.ctaDescription || "";
        }

        /*
         * Liste des éléments inclus
         */
        if (includedElement) {
            includedElement.innerHTML = (service.included || [])
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
        }

        console.log("Service chargé :", service.title);
        console.log("SEO title :", service.seoTitle);
        console.log("Meta description :", service.metaDescription);
    })
    .catch((error) => {
        console.error("Erreur lors du chargement du service :", error);
    });
