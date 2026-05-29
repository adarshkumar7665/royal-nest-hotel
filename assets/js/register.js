document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Empty check
  if (!name || !email || !password) {
   showToast(
  "Please fill all fields",
  "warning"
);
    return;
  }

  // Get existing users
  let users = [];
  try {
    users = JSON.parse(localStorage.getItem("users")) || [];
  } catch {
    users = [];
  }

  // Check if email already exists
  const userExists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (userExists) {
    showToast("User already registered!", "error");
    return;
  }

  // Create new user
  const newUser = {
    name,
    email,
    password
  };

  users.push(newUser);

  // Save to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("registerPopup").classList.add("active");

  // Redirect to login page
 setTimeout(() => {
  window.location.href = "index.html";
}, 1800);
});
function showToast(message, type = "success") {

  const toastBox =
    document.getElementById("toastBox");

  const toast =
    document.createElement("div");

  toast.classList.add("toast", type);

  toast.innerHTML = `
    <i class="fas fa-circle-check"></i>
    ${message}
  `;

  toastBox.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}