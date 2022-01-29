import { app, auth, firestore } from './script.js';

let unsub = auth.onAuthStateChanged(auth.getAuth(app), (user) => {
  if (user) {
    window.location.replace("./home.html");
  }

  else {
    document.getElementById("#cover").style.display = "none";
  }
});

unsub();

function signup() {
  const authState = auth.getAuth(app);
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
      auth.onAuthStateChanged(auth.getAuth(app), async (user) => {
        if (user) {
          try {
            const db = await firestore.getFirestore(app);

            const res = await firestore.setDoc(firestore.doc(db, "users", user.uid), {
              email: email,
              name: name,
              id: user.uid,
              phone: "N/A",
              role: "STAFF",
              history: []
            }, { merge: true });

            window.location.replace("./home.html");
          } catch (err) {
            window.alert(err);
          }
        }
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

document.querySelector("#register-btn").addEventListener("click", signup);