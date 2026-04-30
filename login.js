document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
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
    alert("Login successful!");
    window.location.href = "hotel.html";
  } else {
    alert("Invalid email or password!");
  }
});

function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  if (navLinks) {
    navLinks.classList.toggle("active");
  }
}