import * as validator from "./verification.js";

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
