const sidebar = document.querySelector(".sidebar");
const sidebar__btn = document.querySelector(".sidebar__btn");

sidebar__btn.onclick = () => {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebar__btn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else sidebar__btn.classList.replace("bx-menu-alt-right", "bx-menu");
};
