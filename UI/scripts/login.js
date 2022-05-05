import * as validator from "./verification.js";
import * as api from "./api/loginApi.js";

function loginError() {
  const message = document.getElementById("invalid");
  const fields = document.querySelectorAll("input");

  fields.forEach((field) => {
    field.classList.add("error");
  });

  message.classList.add("error");
  message.innerText = "Invalid Email or Password";

  return;
}

let loginForm = document.querySelector("#loginForm");
let loginEmail = loginForm.elements["email"];
let loginPassword = loginForm.elements["password"];

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let emailValid = validator.emailVerification(loginEmail);
  let passwordValid = validator.nameVerification(loginPassword);
  if (emailValid && passwordValid) {
    await login({
      email: loginEmail.value,
      password: loginPassword.value,
    });
  }
  return;
});

const login = async (creds) => {
  const res = await api.login(creds);

  if (res === "success") {
    location.href = "admin.html";
    return;
  } else {
    loginError();
  }
};
