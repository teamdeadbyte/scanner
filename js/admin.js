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

      snap = await firestore.getDocs(firestore.collection(db, "users"));

      let list = "";

      if (snap) {
        snap.forEach((doc) => {
          let user = doc.data();
          list += "<div class='content' style='text-align: start' id='" + user.id + "'>";
          list += "<b>Name: " + user.name + "</b><br>";
          list += "<b>ID: " + user.id + "</b><br>";
          list += "<b>Role: " + user.role + "</b><br>";
          list += "<b>Phone: " + user.phone + "</b>";
          list += "</div>"
        });

        let main = document.querySelector("#main");
        main.classList.remove("centered");
        main.innerHTML = list;
        attachRecord();
      }

      document.getElementById("#cover").style.display = "none";
    }

    else {
      window.location.replace("./");
    }
  });
};

async function search() {
  const db = await firestore.getFirestore(app);
  let key = document.querySelector("#searchkey").value;

  if (key) {
    let snap = await firestore.getDoc(firestore.doc(db, "users", key));

    if (snap.exists()) {
      let user = snap.data();
      let list = "<div class='content' style='text-align: start' id='" + user.id + "'>";
      list += "<b>Name: " + user.name + "</b><br>";
      list += "<b>ID: " + user.id + "</b><br>";
      list += "<b>Role: " + user.role + "</b><br>";
      list += "<b>Phone: " + user.phone + "</b>";
      list += "</div>"

      document.querySelector("#main").innerHTML = list;
      attachRecord();
    } else {
      let list = '<div id="message" class="content"><b>There\'s no users available.</b></div>';
      document.querySelector("#main").innerHTML = list;
      document.querySelector("#main").classList.add("centered");
    }
  } else {
    let snap = await firestore.getDocs(firestore.collection(db, "users"));

    let list = "";

    if (snap) {
      snap.forEach((doc) => {
        let user = doc.data();
        list += "<div class='content' style='text-align: start' id='" + user.id + "'>";
        list += "<b>Name: " + user.name + "</b><br>";
        list += "<b>ID: " + user.id + "</b><br>";
        list += "<b>Role: " + user.role + "</b><br>";
        list += "<b>Phone: " + user.phone + "</b>";
        list += "</div>"
      });

      document.querySelector("#main").innerHTML = list;
      document.querySelector("#main").classList.remove("centered");

      attachRecord();
    }

    document.getElementById("#cover").style.display = "none";
  }
}

function attachRecord() {
  let contents = document.querySelectorAll(".content");

  contents.forEach((content) => {
    content.addEventListener("click", () => {
      window.location.href = "record.html?id=" + content.id;
    })
  });
}

document.querySelector("#search").addEventListener("click", search);