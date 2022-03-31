import * as validator from "./verification.js";

function loginError(field) {
  field.classList.add("error");
  field.querySelector("#invalid").innerText = "Invalid Email or Password";

  return;
}

let loginForm = document.querySelector("#loginForm");
let loginEmail = loginForm.elements["email"];
let loginPassword = loginForm.elements["password"];

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let emailValid = validator.emailVerification(loginEmail);
  let passwordValid = validator.nameVerification(loginPassword);
  if (emailValid && passwordValid) {
    location.href = "admin.html";
  }
});
