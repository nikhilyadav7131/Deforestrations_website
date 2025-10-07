// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 🧩 Signup
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const msg = document.getElementById("signup-message");

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        msg.style.color = "green";
        msg.textContent = "Signup successful! Redirecting...";
        setTimeout(() => window.location.href = "index.html", 1500);
      })
      .catch((err) => {
        msg.style.color = "red";
        msg.textContent = err.message;
      });
  });
}

// 🔑 Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const msg = document.getElementById("login-message");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        msg.style.color = "green";
        msg.textContent = "Login successful! Redirecting...";
        setTimeout(() => window.location.href = "index.html", 1500);
      })
      .catch((err) => {
        msg.style.color = "red";
        msg.textContent = "Invalid credentials: " + err.message;
      });
  });
}

// 🚪 Logout + Auth Check
const logoutBtn = document.getElementById("logout-btn");
const loginLink = document.getElementById("login-link");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth);
  });
}

onAuthStateChanged(auth, (user) => {
  if (user && logoutBtn && loginLink) {
    logoutBtn.style.display = "inline-block";
    loginLink.style.display = "none";
  } else if (logoutBtn && loginLink) {
    logoutBtn.style.display = "none";
    loginLink.style.display = "inline-block";
  }
});