fetch("data/projects.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Impossible de charger les projets");
    }
    return response.json();
  })
  .then(projects => {
    const grid = document.getElementById("projects-grid");

    const projectsArray = Object.entries(projects);

    grid.innerHTML = projectsArray.map(([id, project]) => `
      <a
        href="pages/projet.html?id=${id}"
        class="group relative block min-w-0 overflow-hidden"
      >

        <!-- Image -->
        <img
          src="${project.cover}"
          alt="${project.title}"
          loading="lazy"
          class="block aspect-[4/3] w-full max-w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        >

        <!-- Overlay -->
        <div
          class="absolute inset-0 flex items-end bg-black/0 p-6 transition-colors duration-500 group-hover:bg-black/30"
        >
          <div>
            <p class="mb-1 translate-y-4 text-xs uppercase tracking-wider text-white/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              ${project.category}
            </p>

            <h3
              class="translate-y-4 text-xl font-medium text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
            >
              ${project.title}
            </h3>
          </div>
        </div>

      </a>
    `).join("");
  })
  .catch(error => {
    console.error(error);
  });