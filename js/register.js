import { app, auth } from './script.js';

window.onload = () => {
  auth.onAuthStateChanged(auth.getAuth(), (user) => {
    if (user) {
      window.location.replace("./home.html");
    }

    else {
      document.getElementById("#cover").style.display = "none";
    }
  });
};

function signup() {
  const authState = auth.getAuth();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const repeat = document.querySelector("#repeat-pw").value;
  const agree = document.querySelector("#agree").checked;

  if (!name || !email || !password || !repeat || (password != repeat) || !agree) {
    alert("Please complete the fields");
    return;
  }

  auth.createUserWithEmailAndPassword(authState, email, password)
  .then((userCredential) => {
    // Signed in
    window.location.replace("./home.html");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
}

document.querySelector("#register-btn").addEventListener("click", signup);