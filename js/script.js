import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
import * as auth from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import * as storage from "https://www.gstatic.com/firebasejs/9.6.5/firebase-storage.js";
import * as firestore from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPsCeUIdTuPGv29FjBNKyX0bl-qQjNOdI",
  authDomain: "dfx-test-project.firebaseapp.com",
  projectId: "dfx-test-project",
  storageBucket: "dfx-test-project.appspot.com",
  messagingSenderId: "521741123465",
  appId: "1:521741123465:web:7e6ad5502d2f975f10eb58",
  measurementId: "G-4HJH0G8NET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, auth, storage, firestore };