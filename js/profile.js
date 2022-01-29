import { app, auth, firestore } from './script.js';

window.onload = () => {
  let nameText = document.querySelector("#name");
  let idText = document.querySelector("#id-no");
  let emailIn = document.querySelector("#email");
  let telIn = document.querySelector("#tel-no");
  let passIn = document.querySelector("#password");

  auth.onAuthStateChanged(auth.getAuth(app), async (user) => {
    if (user) {
      const db = await firestore.getFirestore(app);
      const snap = await firestore.getDoc(firestore.doc(db, "users", user.uid));

      if (snap) {
        let data = snap.data();
        console.log(data);

        if (data.role != "ADMIN") {
          document.querySelector("#admin-btn").style.display = "none";
        }

        nameText.innerHTML = data.name;
        idText.innerHTML = data.id;
        emailIn.placeholder = "Email: " + data.email;
        passIn.placeholder = "Password: ******";
        telIn.placeholder = "Phone Number: " + data.phone;
      }

      document.getElementById("#cover").style.display = "none";
    }

    else {
      window.location.replace("./");
    }
  });
};

function changeEmail() {
  let newEmail = window.prompt("Enter new email");
  const authState = auth.getAuth();

  if (newEmail) {
    auth.updateEmail(authState.currentUser, newEmail)
      .then(async () => {
        const db = await firestore.getFirestore(app);
        await firestore.setDoc(firestore.doc(db, "users", authState.currentUser.uid),
          {
            email: newEmail
          }, { merge: true });

        window.alert("Email changed!");
        window.location.reload();
      })
      .catch((error) => window.alert(error.code));
  }
}

async function changePhone() {
  let newPhone = window.prompt("Enter new phone number");

  if (newPhone) {
    const db = await firestore.getFirestore(app);
    const authState = auth.getAuth();

    await firestore.setDoc(firestore.doc(db, "users", authState.currentUser.uid),
      {
        phone: newPhone
      }, { merge: true });

    window.alert("Phone number changed!");
    window.location.reload();
  }
}

function changePassword() {
  let newPass = window.prompt("Enter new password");
  const authState = auth.getAuth();

  if (newPass) {
    auth.updatePassword(authState.currentUser, newPass)
      .then(async () => {
        window.alert("Password changed!");
        // window.location.reload();
      })
      .catch((error) => window.alert(error.code));
  }
}

function signout() {
  const authState = auth.getAuth(app);

  auth.signOut(authState)
    .then(() => {
      // Signed Out
      window.location.replace("./");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

document.querySelector("#logout-btn").addEventListener("click", signout);
document.querySelector("#ch-email").addEventListener("click", changeEmail);
document.querySelector("#ch-pass").addEventListener("click", changePassword);
document.querySelector("#ch-tel").addEventListener("click", changePhone);