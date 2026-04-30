document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Empty check
  if (!name || !email || !password) {
    alert("Please fill all fields");
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
    alert("User already registered!");
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

  alert("Registration successful!");

  // Redirect to login page
  window.location.href = "index.html";
});