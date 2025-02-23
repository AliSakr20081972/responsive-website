function updateNavbar() {
    const screenWidth = window.innerWidth;
    const headerContainer = document.getElementById("hero-container");
    let headerFile = "";

    if (screenWidth >= 1024) {
        headerFile = "hero/hero-desktop.html";
    } else if (screenWidth >= 768) {
        headerFile = "hero/hero-desktop.html";
    } else {
        headerFile = "hero/hero-desktop.html";
    }
    fetch(headerFile)
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;
        })
        .catch(error => console.error("Error loading header:", error));
}
document.addEventListener("DOMContentLoaded", updateNavbar);
window.addEventListener("resize", updateNavbar);
