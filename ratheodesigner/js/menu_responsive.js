const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");

menuButton.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");
    menuButton.setAttribute("aria-expanded", !isOpen);
});
