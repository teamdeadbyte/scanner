import { app } from './script.js';
import * as auth from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

window.onload = () => {
  auth.onAuthStateChanged(auth.getAuth(app), (user) => {
    if (user) {
      window.location.replace("./home.html");
    }

    else {
      document.getElementById("#cover").style.display = "none";
    }
  });
};

async function forget() {
  const authState = auth.getAuth(app);
  const email = document.querySelector("#email").value;

  if (!email) {
    alert("Please complete the fields");
    return;
  }

  await auth.sendPasswordResetEmail(authState, email)
  .then(() => {
    window.alert("Password reset email sent.");
    window.location.replace("./");
  })
  .catch((error) => {
    window.alert(error.code);
    console.log(error);
  });
}

document.querySelector("#reset-btn").addEventListener("click", forget);