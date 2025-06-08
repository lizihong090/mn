import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// ✅ 初始化 Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const colRef = collection(db, "records");

// 🔑 登入與註冊
const loginPage = document.getElementById("loginPage");
const mainPage = document.getElementById("mainPage");
const loginMessage = document.getElementById("loginMessage");

document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .catch(e => loginMessage.textContent = e.message);
};

document.getElementById("signupBtn").onclick = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => loginMessage.textContent = "註冊成功，請重新登入")
    .catch(e => loginMessage.textContent = e.message);
};

document.getElementById("logoutBtn").onclick = () => {
  signOut(auth);
};

// 🧠 使用者狀態改變時
onAuthStateChanged(auth, user => {
  if (user) {
    loginPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
    initAccounting(); // 初始化記帳功能
  } else {
    loginPage.classList.remove("hidden");
    mainPage.classList.add("hidden");
  }
});
