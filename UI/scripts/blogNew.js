import * as validator from "./verification.js";
import * as postApi from "./api/blogsApi.js";

let postId;

const newBlogForm = document.querySelector("#newBlogForm");
const newBlogImg = newBlogForm.elements["blog-img"];
const newBlogBody = newBlogForm.elements["blog-body"];
const newBlogTitle = newBlogForm.elements["title"];
const newBlogAuthor = newBlogForm.elements["blog-author"];

newBlogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let titleValid = validator.nameVerification(newBlogTitle, 45);
  let bodyValid = validator.nameVerification(newBlogBody);
  let authorValid = validator.nameVerification(newBlogAuthor);
  if (titleValid && bodyValid && authorValid && newBlogImg.files.length !== 0) {
    const post = {
      title: newBlogTitle.value,
      body: newBlogBody.value,
      author: newBlogAuthor.value,
      image: newBlogImg.files[0],
    };

    await postBlogData(post);
  }
});

const postBlogData = async (post) => {
  let postForm = new FormData();

  Object.keys(post).forEach((key) => {
    postForm.append(key, post[key]);
  });

  const res = await postApi.newPost(postForm);
  if (res === "success") {
    location.href = "admin.html";
    return;
  } else {
    alert(res);
  }
};
