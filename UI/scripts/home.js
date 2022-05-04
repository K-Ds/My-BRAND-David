import * as validator from "./verification.js";
import { getBlogs } from "./api/blogsApi.js";

let contactForm = document.querySelector("#contact-form");
let contactName = contactForm.elements["name"];
let contactEmail = contactForm.elements["email"];
let contactSubject = contactForm.elements["subject"];
let contactMessage = contactForm.elements["message"];

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameValid = validator.nameVerification(contactName, 45);
  let emailValid = validator.emailVerification(contactEmail);
  let subjectValid = validator.nameVerification(contactSubject);
  let messageValid = validator.nameVerification(contactMessage);

  if (nameValid && emailValid && subjectValid && messageValid) {
    alert("Form submitted");
  }
});

const renderBlogs = async () => {
  const sectionBlogs = document.getElementById("sectionBlogs");

  const blogs = await getBlogs();
  let html = "";

  blogs.forEach((post) => {
    let htmlSegment = ` <div class="blog__card">
          <div class="card__img">
            <img src="${post.image}" alt="post image" />
          </div>
          <div class="card__data">
            <h3 class="card__title">${post.title}</h3>
            <p class="card__description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Veritatis unde placeat neque nulla, adipisci nisi?
            </p>
          </div>
          <a class="btn btn--accent" href="blog-individual.html?id=${post._id}" alt="Visit Blog">Read more</a>
        </div>`;

    html += htmlSegment;
  });

  sectionBlogs.innerHTML = html;
};

window.onload = renderBlogs();
