let sidebar = document.querySelector(".sidebar");
let sidebar__btn = document.querySelector(".sidebar__btn");
sidebar__btn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebar__btn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else sidebar__btn.classList.replace("bx-menu-alt-right", "bx-menu");
};
