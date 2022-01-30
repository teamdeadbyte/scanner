import { app, auth, firestore } from './script.js';

let userData;

window.onload = () => {
  auth.onAuthStateChanged(auth.getAuth(app), async (user) => {
    if (user) {
      const db = await firestore.getFirestore(app);
      let snap = await firestore.getDoc(firestore.doc(db, "users", user.uid));

      if (snap) {
        let data = snap.data();

        if (data.role != "ADMIN") {
          document.querySelector("#admin-btn").style.display = "none";
          window.location.replace("./");
        }
      }

      let searchParam = new URLSearchParams(window.location.search);

      if (searchParam.has("id")) {
        let uid = searchParam.get("id");
        snap = await firestore.getDoc(firestore.doc(db, "users", uid));
        let data = snap.data();

        document.querySelector("#name").innerHTML = data.name;
        document.querySelector("#uid").innerHTML = data.id;
        document.querySelector("#role").innerHTML = data.role;
        document.querySelector("#phone").innerHTML = data.phone;
      }

      snap = await firestore.getDoc(firestore.doc(db, "users", searchParam.get("id")));

      let list = "";

      if (snap) {
        let data = snap.data();

        data.history.reverse().forEach((log, idx) => {
          let i = data.history.length - idx - 1;
          list += "<div class='content' style='text-align: start' id='" + i + "'>";
          list += "<h3>" + new Date(log.start).toDateString() + "</h3>";
          list += "<b>Check In: " + new Date(log.start).toTimeString() + "</b><br>";
          if (log.stop != -1) list += "<b>Check Out: " + new Date(log.stop).toTimeString() + "</b>";
          else list += "<b>Check Out: -</b>";
          list += "</div>"
        });

        if (data.history.length > 0) {
          let main = document.querySelector("#main");
          main.classList.remove("centered");
          main.innerHTML = list;
          attachRecord();
        }
      }

      document.getElementById("#cover").style.display = "none";
    }

    else {
      window.location.replace("./");
    }
  });
};

function attachRecord() {
  let contents = document.querySelectorAll(".content");
  let searchParam = new URLSearchParams(window.location.search);

  contents.forEach((content) => {
    content.addEventListener("click", () => {
      window.location.href = "log.html?id=" + searchParam.get("id") + "&index=" + content.id;
    })
  });
}

async function changeRole() {
  let newRole = window.prompt("Enter the new role.");
  let searchParam = new URLSearchParams(window.location.search);

  if (searchParam.has("id")) {
    let uid = searchParam.get("id");

    if (newRole) {
      const db = await firestore.getFirestore(app);

      await firestore.setDoc(firestore.doc(db, "users", uid),
        {
          role: newRole
        }, { merge: true });
      
      window.location.reload();
    }
  }
}

document.querySelector("#ch-role").addEventListener("click", changeRole);
