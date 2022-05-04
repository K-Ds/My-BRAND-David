import * as validator from "./verification.js";
import * as api from "./api/blogsApi.js";

let postId;

let commentForm = document.querySelector("#commentForm");
let commentName = commentForm.elements["name"];
let commentMessage = commentForm.elements["message"];

commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nameValid = validator.nameVerification(commentName, 45);
  let messageValid = validator.nameVerification(commentMessage);

  if (nameValid && messageValid) {
    await comment({
      user: commentName.value,
      content: commentMessage.value,
    });
  }
});

const comment = async (comment) => {
  const commentMessage = document.getElementById("commentMessage");
  const res = await api.postComment(postId, comment);

  if (res === "success") {
    location.reload();
  } else {
    commentMessage.innerText = res.error;
  }
};

const hasLiked = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let cookiePair = cookie.split("=");

    if (cookiePair[0].trim() == postId && cookiePair[1] == "true") {
      return true;
    }
  }

  return false;
};

const setLike = (status) => {
  document.cookie = `${postId} = ${status};`;
};

const like = async () => {
  const likeMessage = document.getElementById("likeMessage");
  if (!hasLiked()) {
    const res = await api.postLike(postId);
    if (res === "success") {
      setLike("true");
      location.reload();
      return;
    }
    return;
  } else {
    const res = await api.postDislike(postId);
    if (res === "success") {
      setLike("false");
      location.reload();
      return;
    }
    return;
  }
};

const renderComments = (commentsArray) => {
  const commentsList = document.getElementById("commentsList");

  let html = "";
  if (commentsArray.length !== 0) {
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
  }

  commentsList.innerHTML = html;
  return;
};

const renderBlog = async () => {
  const params = new URLSearchParams(window.location.search);
  postId = params.get("id");

  const blogContainer = document.getElementById("blog");
  const blog = await api.getOneBlog(postId);

  if (blog === "error" || !blog) {
    blogContainer.innerHTML = `<h2 class="blog__title">Brog Not found</h2>`;
    return;
  }
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
        <div class="blog__reaction" id="likeBtn">
          <span class="iconify icon" data-icon="ant-design:heart-filled"></span>
          <span>${blog.likes} likes</span id="likesMessage"><span></span>
        </div>
      </div>`;
  }

  blogContainer.innerHTML = html;
  renderComments(blog.comments);

  console.log("reach");
  return;
};

// document.addEventListener("click", async (e) => {
//   if (e.target && e.target.id == "likeBtn") {
//     console.log("like");
//     await like();
//   }
// });

window.onload = await renderBlog();

const likeBtn = document.getElementById("likeBtn");

likeBtn.addEventListener("click", async (e) => {
  console.log("like");
  await like();
});
