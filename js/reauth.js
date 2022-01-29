import { app } from './script.js';
import * as auth from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

window.onload = () => {
  auth.onAuthStateChanged(auth.getAuth(app), (user) => {
    if (!user) {
      window.location.replace("./");
    }

    else {
      document.getElementById("#cover").style.display = "none";
    }
  });
};

function reauth() {
  const authState = auth.getAuth(app);
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  // const remember = document.querySelector("#remember-auth").checked;

  if (!email || !password) {
    alert("Please complete the fields");
    return;
  }

  auth.signInWithEmailAndPassword(authState, email, password)
  .then((userCredential) => {
    // Reauthenticated
    window.location.replace("./edit.html");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
}

document.querySelector("#auth-btn").addEventListener("click", reauth);