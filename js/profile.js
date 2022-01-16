import { app, auth } from './script.js';

window.onload = () => {
  auth.onAuthStateChanged(auth.getAuth(), (user) => {
    if (user) {
      document.getElementById("#cover").style.display = "none";
    }

    else {
      window.location.replace("../");
    }
  });
};

function signout() {
  const authState = auth.getAuth();
  
  auth.signOut(authState)
  .then(() => {
    // Signed Out
    window.location.replace("../");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
}

document.querySelector("#logout-btn").addEventListener("click", signout);