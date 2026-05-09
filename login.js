document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showToast(
  "Please enter email and password",
  "warning"
);
    return;
  }

  let users = [];

  try {
    users = JSON.parse(localStorage.getItem("users")) || [];
  } catch {
    users = [];
  }

  const validUser = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (validUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    document.getElementById("loginPopup").classList.add("active");
   setTimeout(() => {
  window.location.href = "hotel.html";
}, 1800);
  } else {
    showToast(
  "Invalid email or password!",
  "error"
);
  }
});

function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  if (navLinks) {
    navLinks.classList.toggle("active");
  }
}
function openForgotPopup() {

  document
    .getElementById("forgotPopup")
    .classList.add("active");

}

function resetPassword() {

  const email =
    document
      .getElementById("forgotEmail")
      .value
      .trim();

  const newPassword =
    document
      .getElementById("newPassword")
      .value
      .trim();

  if (!email || !newPassword) {

    showToast(
  "Please fill all fields",
  "warning"
);

    return;
  }

  let users =
    JSON.parse(localStorage.getItem("users")) || [];

  const userIndex =
    users.findIndex(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

  if (userIndex === -1) {

    showToast(
  "Email not found!",
  "error"
);
    return;
  }

  users[userIndex].password = newPassword;

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  showToast(
  "Password Updated Successfully!",
  "success"
);

  document
    .getElementById("forgotPopup")
    .classList.remove("active");

}
function closeForgotPopup() {

  document
    .getElementById("forgotPopup")
    .classList.remove("active");

}
function showToast(message, type = "success") {

  const toastBox =
    document.getElementById("toastBox");

  const toast =
    document.createElement("div");

  toast.classList.add("toast", type);

  let icon = "fa-circle-check";

  if (type === "error") {
    icon = "fa-circle-xmark";
  }

  if (type === "warning") {
    icon = "fa-triangle-exclamation";
  }

  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    ${message}
  `;

  toastBox.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}