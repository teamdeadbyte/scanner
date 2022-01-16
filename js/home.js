import { app, auth } from './script.js';

window.onload = () => {
  auth.onAuthStateChanged(auth.getAuth(), (user) => {
    if (user) {
      document.getElementById("#cover").style.display = "none";
    }

    else {
      window.location.replace("./");
    }
  });
};