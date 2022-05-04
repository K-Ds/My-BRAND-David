import * as validator from "../verification.js";

let newBlogForm = document.querySelector("#newBlogForm");
let newBlogImg = newBlogForm.elements["blog-img"];
let newBlogBody = newBlogForm.elements["blog-body"];
let newBlogTitle = newBlogForm.elements["title"];

newBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let titleValid = validator.nameVerification(newBlogTitle, 45);
  let bodyValid = validator.nameVerification(newBlogBody);

  let imageValid = validator.nameVerification(newBlogImg);
  console.log(newBlogImg.value);
  if (titleValid && bodyValid && imageValid) {
    postBlogData(newBlogTitle, newBlogBody, newBlogImg);
    location.href = "admin.html";
  }
});
