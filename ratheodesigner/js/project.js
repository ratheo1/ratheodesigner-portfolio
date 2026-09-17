document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");

    const cover = document.getElementById("project-cover");
    const title = document.getElementById("project-title");
    const category = document.getElementById("project-category");
    const year = document.getElementById("project-year");
    const livrables = document.getElementById("project-deliverables");
    const description = document.getElementById("project-description");
    const gallery = document.getElementById("project-gallery");

    // Vérifier si un ID est présent
    if (!projectId) {
        document.title = "Projet introuvable — Rathéo Design";
        title.textContent = "Projet introuvable";
        return;
    }

    try {
        // Charger les données JSON
        const response = await fetch("../data/projects.json");

        if (!response.ok) {
            throw new Error("Impossible de charger les projets.");
        }

        const projects = await response.json();

        // Récupérer le projet correspondant à l'ID
        const project = projects[projectId];

        if (!project) {
            document.title = "Projet introuvable — Rathéo Design";
            title.textContent = "Projet introuvable";

            description.innerHTML = `
                <p class="text-white/50">
                    Le projet demandé n'existe pas.
                </p>
            `;

            return;
        }

        // =========================
        // SEO
        // =========================

        // Utiliser le titre SEO s'il existe,
        // sinon utiliser le titre du projet par défaut
        document.title =
            project.seoTitle ||
            `${project.title} — Rathéo Design`;

        // Mettre à jour la meta description
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );

        if (metaDescription && project.seoDescription) {
            metaDescription.setAttribute(
                "content",
                project.seoDescription
            );
        }

        // =========================
        // Image principale
        // =========================

        cover.src = project.cover;
        cover.alt = project.coverAlt || project.title;

        // =========================
        // Informations du projet
        // =========================

        title.textContent = project.title;
        category.textContent = project.category;
        year.textContent = project.year;
        livrables.textContent = project.livrables;

        // =========================
        // Description
        // =========================

        description.innerHTML = project.description
            .map(
                paragraph =>
                    `<p class="mb-6 last:mb-0">${paragraph}</p>`
            )
            .join("");

        // =========================
        // Galerie
        // =========================

        gallery.innerHTML = "";

        // Nombre de colonnes défini dans le JSON
        // Valeur par défaut : 2
        const columns = Number(project.col) || 2;

        // Limiter le nombre de colonnes entre 1 et 3
        const validColumns = Math.min(
            Math.max(columns, 1),
            3
        );

        // Appliquer les classes de la grille
        gallery.className = `
            mx-auto
            grid
            max-w-7xl
            grid-cols-1
            gap-6
            md:grid-cols-${validColumns}
        `;

        // =========================
        // Ratios disponibles
        // =========================

        const aspectClasses = {
            "16/9": "aspect-[16/9]",
            "4/3": "aspect-[4/3]",
            "3/4": "aspect-[3/4]",
            "1/1": "aspect-square",
            "square": "aspect-square"
        };

        // Ratio défini dans le JSON
        // Si aucun ratio n'est indiqué,
        // l'image conserve sa hauteur naturelle
        const aspectClass =
            aspectClasses[project.aspect] || "";

        // =========================
        // Générer les images de la galerie
        // =========================

        project.gallery.forEach((image, index) => {
            const imageWrapper = document.createElement("div");

            imageWrapper.className =
                "min-w-0 overflow-hidden";

            const img = document.createElement("img");

            // Permet d'utiliser soit une simple URL,
            // soit un objet avec src et alt personnalisé
            if (typeof image === "string") {
                img.src = image;
                img.alt =
                    `${project.title} — Image ${index + 1}`;
            } else {
                img.src = image.src;
                img.alt =
                    image.alt ||
                    `${project.title} — Image ${index + 1}`;
            }

            img.loading = "lazy";
            img.decoding = "async";
            img.draggable = false;

            // Appliquer le ratio uniquement s'il est défini
            if (aspectClass) {
                img.className =
                    `block h-full w-full ${aspectClass} object-cover`;
            } else {
                img.className =
                    "block h-auto w-full";
            }

            imageWrapper.appendChild(img);
            gallery.appendChild(imageWrapper);
        });

    } catch (error) {
        console.error("Erreur :", error);

        title.textContent = "Une erreur est survenue";

        description.innerHTML = `
            <p class="text-white/50">
                Impossible de charger les informations du projet.
            </p>
        `;
    }
});