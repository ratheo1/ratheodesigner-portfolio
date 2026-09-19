const servicesList = document.querySelector("#services-list");

if (servicesList) {
    fetch("data/services.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Impossible de charger les services.");
            }

            return response.json();
        })
        .then((services) => {
            servicesList.innerHTML = services
                .map(
                    (service, index) => `
                        <a
                            href="pages/service.html?id=${service.id}"
                            class="group block border-b border-white/15 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:py-10"
                        >
                            <div class="flex items-center gap-6 md:gap-10">

                                <span class="w-8 text-sm text-white/35 transition-colors duration-300 group-hover:text-white">
                                    ${String(index + 1).padStart(2, "0")}
                                </span>

                                <h3
                                    class="flex-1 text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl lg:text-5xl"
                                >
                                    ${service.title}
                                </h3>

                                <span
                                    class="hidden text-sm text-white/40 transition-colors duration-300 group-hover:text-white sm:block"
                                >
                                    ${service.category || ""}
                                </span>

                                <span
                                    class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg text-white/50 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black md:h-12 md:w-12"
                                >
                                    ↗
                                </span>

                            </div>

                            <div class="mt-5 pl-14 md:pl-20 lg:max-w-2xl">
                                <p class="text-sm leading-relaxed text-white/45 md:text-base">
                                    ${service.description}
                                </p>
                            </div>

                        </a>
                    `
                )
                .join("");
        })
        .catch((error) => {
            console.error("Erreur lors du chargement des services :", error);
        });
}
