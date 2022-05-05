import { getBlogs } from "./api/blogsApi.js";

const renderBlogs = async () => {
  const sectionBlogs = document.getElementById("sectionBlogs");

  const blogs = await getBlogs();
  let html = "";

  blogs.forEach((post) => {
    let htmlSegment = `<a href="blog-individual.html?id=${post._id}" class="blog__link">
        <div class="blog__card">
        <div class="blog__img"><img src="${post.image}" alt="" /></div>
          
          <div class="blog__data">
            <div class="blog__summary">
              <h3 class="blog__title">${post.title}</h3>
              <p class="blog__description">
                ${post.summary}
              </p>
            </div>
            <div class="blog__reactions">
              <div class="blog__reaction">
                <span
                  class="iconify icon"
                  data-icon="ant-design:heart-filled"
                ></span>
                <span>${post.likes}</span>
              </div>
              <div class="blog__reaction">
                <span
                  class="iconify icon"
                  data-icon="bxs:message-alt-detail"
                ></span>
                <span>${post.comments.length} comments</span>
              </div>
            </div>
          </div>
        </div>
      </a>`;

    html += htmlSegment;
  });

  sectionBlogs.innerHTML = html;
};

window.onload = renderBlogs();
