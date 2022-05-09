import * as postApi from "./api/blogsApi.js";
import * as queryApi from "./api/queriesApi.js";

// ================================================================

const postsCount = document.getElementById("postsCount");

const renderBlogs = async () => {
  const blogsList = document.getElementById("blogList");

  const posts = await postApi.getBlogs();
  postsCount.innerText = posts.length;

  let html = "";

  posts.forEach((post) => {
    const htmlSegment = `          
          <div class="blog__card">
            <img class="blog__img" src="${post.image}" alt="" />
            <div class="blog__data">
              <div class="blog__summary">
                <h3 class="blog__title">${post.title}</h3>
                <p class="blog__description">
                  ${post.summary}
                </p>
              </div>
            </div>
            <div class="blog__options">
              <a href="blog-edit.html?id=${post._id}">
                <div class="icon-container">
                  <span
                    class="iconify icon"
                    data-icon="bi:pencil-square"
                  ></span>
                </div>
              </a>

                <div class="icon-container" id="deleteBtn" data-id="${post._id}">
                  <span
                    class="iconify icon"
                    data-icon="ant-design:delete-filled"
                  ></span>
                </div>
            </div>
          </div>`;

    html += htmlSegment;
  });

  blogsList.innerHTML = html;
  return;
};

const renderMessages = async () => {
  const messagesList = document.getElementById("messageList");

  const queries = await queryApi.getQueries();

  queriesCount.innerText = queries.length;

  let html = "";

  queries.forEach((query) => {
    const htmlSegment = `
          <div class="media">
            <div class="media__body">
              <h3 class="media__title">Name: ${query.name}</h3>
              <p class="media__mail">Email: ${query.email}</p>
              <h4>Subject: ${query.subject}</h4>
              <p>
                ${query.body}
              </p>
            </div>
          </div>`;

    html += htmlSegment;
  });

  messagesList.innerHTML = html;
  return;
};

const deletePost = async (postId) => {
  const res = await postApi.deletePost(postId);
  if (res === "success") {
    location.reload();
  }
  return;
};

const renderPage = async () => {
  await renderBlogs();
  await renderMessages();

  return;
};

window.onload = await renderPage();

const deleteBtns = document.querySelectorAll("#deleteBtn");

deleteBtns.forEach(async (deleteBtn) => {
  deleteBtn.addEventListener("click", async () => {
    const postId = deleteBtn.getAttribute("data-id");
    await deletePost(postId);
  });
});

// =================================================================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  while (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
  location.href = "blogs.html";
});
