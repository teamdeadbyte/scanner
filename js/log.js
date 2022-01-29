import { app, auth, firestore } from './script.js';

window.onload = () => {
  auth.onAuthStateChanged(auth.getAuth(app), async (user) => {
    if (user) {
      const db = await firestore.getFirestore(app);
      let snap = await firestore.getDoc(firestore.doc(db, "users", user.uid));
      let searchParam = new URLSearchParams(window.location.search);

      if (snap) {
        let data = snap.data();

        if (data.role != "ADMIN") {
          document.querySelector("#admin-btn").style.display = "none";
          window.location.replace("./");
        }
      }

      if (searchParam.has("id")) {
        let uid = searchParam.get("id");
        let index = searchParam.get("index");
        snap = await firestore.getDoc(firestore.doc(db, "users", uid));
        let data = snap.data();

        document.querySelector("#timestamp").innerHTML = new Date(data.history[index].start).toDateString();
        document.querySelector("#start").innerHTML = new Date(data.history[index].start).toTimeString();
        if (data.history[index].stop != -1) document.querySelector("#stop").innerHTML = new Date(data.history[index].stop).toTimeString();
      }

      snap = await firestore.getDoc(firestore.doc(db, "users", searchParam.get("id")));

      let list = "";

      if (snap) {
        let data = snap.data();
        let index = searchParam.get("index");

        data.history[index].logs.reverse().forEach((log, i) => {
          list += "<div class='content' style='text-align: start'>";
          list += "<b>" + log.act + "</b><br>";
          list += "<small>Time: " + new Date(log.time).toTimeString() + "</small>";
          list += "</div>"
        });

        let main = document.querySelector("#main");
        main.classList.remove("centered");
        main.innerHTML = list;
      }

      document.getElementById("#cover").style.display = "none";
    }

    else {
      window.location.replace("./");
    }
  });
};