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
      }

      document.getElementById("#cover").style.display = "none";
    }

    else {
      window.location.replace("./");
    }
  });
};

async function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
  window.alert("Successfully scanned: " + decodedText);

  let uid = auth.getAuth().currentUser.uid;
  const db = await firestore.getFirestore(app);

  if (decodedText == "CHECK IN") {
    const snap = await firestore.getDoc(firestore.doc(db, "users", uid));
    const data = snap.data();
    
    let newHistory = data.history;
    newHistory.push({
      start: new Date().getTime(),
      stop: -1,
      logs: []
    });

    await firestore.setDoc(firestore.doc(db, "users", uid),
    {
      history: newHistory
    }, {merge: true});
  }

  else if (decodedText == "CHECK OUT") {
    const snap = await firestore.getDoc(firestore.doc(db, "users", uid));
    const data = snap.data();
    
    let newHistory = data.history;
    newHistory[newHistory.length - 1].stop = new Date().getTime();

    await firestore.setDoc(firestore.doc(db, "users", uid),
    {
      history: newHistory
    }, {merge: true});
  }

  else {
    const snap = await firestore.getDoc(firestore.doc(db, "users", uid));
    const data = snap.data();
    
    let newHistory = data.history;
    newHistory[newHistory.length - 1].logs.push({
      act: decodedText,
      time: new Date().getTime()
    });

    await firestore.setDoc(firestore.doc(db, "users", uid),
    {
      history: newHistory
    }, {merge: true});
  }
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: {width: 250, height: 250} },
  /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
