import * as validator from "./verification.js";
import { getOneBlog } from "./api/blogsApi.js";

let commentForm = document.querySelector("#commentForm");
let commentName = commentForm.elements["name"];
let commentMessage = commentForm.elements["message"];

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameValid = validator.nameVerification(commentName, 45);
  let messageValid = validator.nameVerification(commentMessage);

  if (nameValid && messageValid) {
    alert("Form submit");
  }
});

const renderComments = (commentsArray) => {
  const commentsList = document.getElementById("commentsList");

  let html = "";
  commentsArray.forEach((comment) => {
    let htmlSegment = `<div class="comment__card">
            <div class="comment__data">
              <span class="comment__user">${comment.user}</span>
              <p class="comment__message">
                ${comment.content}
              </p>
              <time>${comment.date}</time>
            </div>
          </div>`;

    html += htmlSegment;
  });

  commentsList.innerHTML = html;
  return;
};

const renderBlog = async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  const blogContainer = document.getElementById("blog");
  const blog = await getOneBlog(postId);

  let html = "";

  if (blog) {
    html = `<div class="container">
        <header class="blog__header">
          <h2 class="blog__title">${blog.title}</h2>
          <div class="blog__img">
            <img src="${blog.image}" alt="Blog Poster" />
          </div>
        </header>
        <div class="blog__body">
          ${blog.body}
        </div>
        <div class="blog__reaction">
          <span class="iconify icon" data-icon="ant-design:heart-filled"></span>
          <span>${blog.likes}</span>
        </div>
      </div>`;
  }

  blogContainer.innerHTML = html;
  renderComments(blog.comments);
  return;
};

window.onload = renderBlog();
