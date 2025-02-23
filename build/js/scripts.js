document.addEventListener("DOMContentLoaded", function () {
  // Handle Navigation Active State
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
      link.addEventListener("click", function (event) {
          // Remove active class from all links
          navLinks.forEach(item => {
              item.classList.remove("text-[#43A047]", "font-semibold", "border-[#43A047]");
              item.classList.add("text-gray-700", "border-transparent", "hover:text-[#43A047]", "hover:border-[#43A047]");
          });

          // Add active class to the clicked link
          this.classList.remove("text-gray-700", "border-transparent", "hover:text-[#43A047]", "hover:border-[#43A047]");
          this.classList.add("text-[#43A047]", "font-semibold", "border-b-2", "border-[#43A047]");

          // Prevent default navigation if using anchor links
          event.preventDefault();
      });
  });

  // // Handle Language Toggle
  // const langToggle = document.getElementById("togglelang");
  // if (langToggle) {
  //     langToggle.addEventListener("click", function () {
  //         const currentLang = document.documentElement.lang;
  //         const newLang = currentLang === "ar" ? "en" : "ar";

  //         // Update language attribute
  //         document.documentElement.lang = newLang;
  //         document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";

  //         // Update button text
  //         langToggle.innerHTML = newLang === "ar" ? "English" : "العربيــة";

  //         // Reload page to apply language change
  //         window.location.href = newLang === "ar" ? "/dist/ar/index.html" : "/dist/en/index.html";
  //     });
  // }
});
