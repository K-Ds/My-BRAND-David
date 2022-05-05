import * as validator from "./verification.js";
import * as postApi from "./api/blogsApi.js";
import * as queryApi from "./api/queriesApi.js";

let contactForm = document.querySelector("#contact-form");
let contactName = contactForm.elements["name"];
let contactEmail = contactForm.elements["email"];
let contactSubject = contactForm.elements["subject"];
let contactMessage = contactForm.elements["message"];

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nameValid = validator.nameVerification(contactName, 45);
  let emailValid = validator.emailVerification(contactEmail);
  let subjectValid = validator.nameVerification(contactSubject);
  let messageValid = validator.nameVerification(contactMessage);

  if (nameValid && emailValid && subjectValid && messageValid) {
    await submitMessage({
      name: contactName.value,
      email: contactEmail.value,
      subject: contactSubject.value,
      body: contactMessage.value,
    });
    return;
  }
});

const renderBlogs = async () => {
  const sectionBlogs = document.getElementById("sectionBlogs");

  const blogs = await postApi.getBlogs();
  let html = "";

  blogs.forEach((post) => {
    let htmlSegment = ` <div class="blog__card">
          <div class="card__img">
            <img src="${post.image}" alt="post image" />
          </div>
          <div class="card__data">
            <h3 class="card__title">${post.title}</h3>
            <p class="card__description">
             ${post.summary}
            </p>
          </div>
          <a class="btn btn--accent" href="blog-individual.html?id=${post._id}" alt="Visit Blog">Read more</a>
        </div>`;

    html += htmlSegment;
  });

  sectionBlogs.innerHTML = html;
};

const submitMessage = async (query) => {
  const contactMessage = document.getElementById("contactMessage");
  const res = await queryApi.postQuery(query);

  if (res === "success") {
    location.reload();
  } else {
    contactMessage.innerText = res.error;
  }
  return;
};

window.onload = renderBlogs();
