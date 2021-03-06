import * as validator from "./verification.js";
import * as postApi from "./api/blogsApi.js";
import * as loginApi from "./api/loginApi.js";

let postId;

const newBlogForm = document.querySelector("#newBlogForm");
const newBlogImg = newBlogForm.elements["blog-img"];
const newBlogBody = newBlogForm.elements["blog-body"];
const newBlogTitle = newBlogForm.elements["title"];
const newBlogAuthor = newBlogForm.elements["blog-author"];
const blogImage = document.getElementById("blogImage");

newBlogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let titleValid = validator.nameVerification(newBlogTitle, 45);
  let bodyValid = validator.nameVerification(newBlogBody);
  let authorValid = validator.nameVerification(newBlogAuthor);
  if (titleValid && bodyValid && authorValid) {
    let post = {
      title: newBlogTitle.value,
      body: newBlogBody.value,
      author: newBlogAuthor.value,
    };
    if (newBlogImg.files.length !== 0) {
      post.image = newBlogImg.files[0];
    }
    await postBlogData(post);
  }
});

const renderBlog = async () => {
  const params = new URLSearchParams(window.location.search);
  postId = params.get("id");

  const post = await postApi.getOneBlog(postId);
  blogImage.setAttribute("src", post.image);

  newBlogTitle.setAttribute("value", post.title);
  newBlogBody.innerText = post.body;
  newBlogAuthor.setAttribute("value", post.author);
};

const postBlogData = async (post) => {
  let postForm = new FormData();
  Object.keys(post).forEach((key) => {
    postForm.append(key, post[key]);
  });
  const res = await postApi.updatePost(postId, postForm);
  if (res === "success") {
    location.href = "admin.html";
    return;
  } else {
    alert(res);
  }
};

window.onload = await renderBlog();
