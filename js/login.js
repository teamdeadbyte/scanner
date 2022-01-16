import { app } from './script.js';
import * as auth from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

window.onload = () => {
  auth.onAuthStateChanged(auth.getAuth(), (user) => {
    if (user) {
      window.location.replace("../home.html");
    }

    else {
      document.getElementById("#cover").style.display = "none";
    }
  });
};

function signin() {
  const authState = auth.getAuth();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  //const remember = document.querySelector("#remember-auth").value;

  if (!email || !password) {
    alert("Please complete the fields");
    return;
  }

  auth.signInWithEmailAndPassword(authState, email, password)
  .then((userCredential) => {
    // Signed in
    window.location.replace("../home.html");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
}

document.querySelector("#login-btn").addEventListener("click", signin);