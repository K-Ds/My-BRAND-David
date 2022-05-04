import * as validator from "../verification.js";

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
