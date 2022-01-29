import { app, auth, firestore } from './script.js';

window.onload = () => {
  auth.onAuthStateChanged(auth.getAuth(app), async (user) => {
    if (user) {
      const db = await firestore.getFirestore(app);
      const snap = await firestore.getDoc(firestore.doc(db, "users", user.uid));
      
      if (snap) {
        let data = snap.data();

        if (data.role != "ADMIN") {
          document.querySelector("#admin-btn").style.display = "none";
        }

        let list = "";

        let history = data.history.reverse();

        history.forEach((log, i) => {
          list += "<div class='content' style='text-align: start' id='" + i + "'>";
          list += "<h3>" + new Date(log.start).toDateString() + "</h3>";
          list += "<b>Check In: " + new Date(log.start).toTimeString() + "</b><br>";
          if (log.stop != -1) list += "<b>Check Out: " + new Date(log.stop).toTimeString() + "</b>";
          else list += "<b>Check Out: -</b>";
          list += "</div>"
        });

        if (history.length > 0) {
          document.querySelector("#main").innerHTML = list;
          document.querySelector("#main").classList.remove("centered");
          attachRecord(user.uid);
        }
      }

      document.getElementById("#cover").style.display = "none";
    }

    else {
      window.location.replace("./");
    }
  });
};

function attachRecord(id) {
  let contents = document.querySelectorAll(".content");

  contents.forEach((content) => {
    content.addEventListener("click", () => {
      window.location.href = "log.html?id=" + id + "&index=" + content.id;
    })
  });
}