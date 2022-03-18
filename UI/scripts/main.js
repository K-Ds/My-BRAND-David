let navMenu = document.querySelector(".nav__menu");
let navList = document.querySelector(".nav__toggler");
let navIcons = document.querySelectorAll(".nav__menu-icon");

console.log(navIcons);
navMenu.addEventListener("click", hideMenu);

function hideMenu() {
  navList.classList.toggle("open");
  navIcons.forEach((icon) => {
    icon.classList.toggle("hidden");
  });
  console.log("hello");
}
