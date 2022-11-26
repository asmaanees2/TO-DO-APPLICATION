//Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqW_-RZe7WkapZbJoJN7IvUR3klAV_MsY",
  authDomain: "to-do-app-d2f35.firebaseapp.com",
  projectId: "to-do-app-d2f35",
  storageBucket: "to-do-app-d2f35.appspot.com",
  messagingSenderId: "936978988868",
  appId: "1:936978988868:web:59791e50c8e53350f0e111",
  measurementId: "G-64JHF0PCXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();



var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var password = document.getElementById("password");


window.signup = function (e) {
  e.preventDefault();
  var obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };


  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      console.log(success.user.uid)
      alert("Signup Sucessfully ")
      window.location.assign('login.html')
    })
    .catch(function (err) {
      alert(err)
    });


  console.log(obj);
};

