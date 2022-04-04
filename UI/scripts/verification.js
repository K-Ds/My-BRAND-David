export function showMessage(field, message, type) {
  if (type == "error") {
    field.classList.add("error");
    field.parentNode.querySelector("small").innerText = message;
  } else if (type == "success") {
    field.classList = "success";
    field.parentNode.querySelector("small").innerText = message;
  }
  return;
}

export function emptyField(field) {
  if (field.value.trim() === "") {
    return true;
  }
  return false;
}

export function nameVerification(field, limitCharacters = 0) {
  if (emptyField(field)) {
    showMessage(field, "Field Empty", "error");
    return false;
  } else if (
    limitCharacters !== 0 &&
    field.value.trim().length > limitCharacters
  ) {
    showMessage(field, "Invalid Name", "error");
    return false;
  }
  showMessage(field, "", "success");
  return true;
}

export function emailVerification(field) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emptyField(field)) {
    showMessage(field, "Enter your Email", "error");
    return false;
  } else if (!emailRegex.test(field.value.trim())) {
    showMessage(field, "Invalid Email", "error");
    return false;
  }
  showMessage(field, "", "success");

  return true;
}
