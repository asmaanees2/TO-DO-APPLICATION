// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
    getDatabase,
    ref,
    set,
    push,
    onChildAdded,
    onValue,
    remove,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import {
    getAuth,
    signOut, 
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
const database = getDatabase();
const auth = getAuth();



var inp = document.getElementById("task")

window.sendtodo = function () {
    var obj = {
        task: inp.value,
        date: JSON.stringify(new Date())
    };
    const keyRef = ref(database, 'todo')
    obj.id=push(keyRef).key;
    const refrences = ref(database, `todo/${obj.id}/`);


    set(refrences,obj)
        console.log(obj.id)
        console.log(obj)

}
var list = []
var editid;

function renderData(){
    const refrences = ref(database, `todo/`);
    var parent = document.getElementById('parent')
    parent.innerHTML = "";
    for(var i=0;  i<list.length; i++){
        parent.innerHTML += `<li id="li" ><span class="task"> ${list[i].task}</span></br><span class='chip'>${list[i].date}<button onclick="delTask()" class="delete">Delete</button><button onclick="editTodo()" class="delete">Edit</button></span></li></br></br>`;
    }
}


window.getdata = function () {

  onValue(ref(database, '/todo /'), (snapshot) => {
    console.log(snapshot.val())
  
  });


  const taskRef =ref(database,'todo/');
  onChildAdded(taskRef, function(data){
   list.push(data.val());
      console.log(data.val());
      renderData();
  })
 
};
window.delTask = function (){
    remove(ref(database , "todo/"))
    .then(() => {
        alert("Todo sucessfully deleted")
    })
    .catch((error) => {
        alert("error"+ error)
    })
    event.target.parentNode.parentNode.
    remove()
}

window.logout = function(){
    const auth = getAuth();
signOut(auth).then(() => {
  console.log(auth)
  alert('Sign-out successful.')
  window.location.replace('login.html')
}).catch((error) => {
  console.log(error)
});
}                
window.editTodo = function(task , id ){
console.log(task , id);
inp.value = task;
 editid = id
}

















// var list = document.getElementById("list");

// function addTask(){
//     var todoapp = document.getElementById("todoapp")

//     var key = firebase.database().ref('todos').push().key;
//     console.log(key)

//     //list items (create li tag with text node)
//     var li = document.createElement("li")
//     var listText = document.createTextNode(todoapp.value)
//     li.appendChild(listText)

//     // Remove Btn
//     var deleteBtn = document.createElement("button")
//     var deleteText = document.createTextNode("Remove")
//     deleteBtn.setAttribute("id","btn")
//     deleteBtn.setAttribute("onclick","deleteItem(this)")
//     deleteBtn.appendChild(deleteText)

//     //Edit Btn
//     var editBtn = document.createElement("button")
//     var editText = document.createTextNode("Edit")
//     editBtn.setAttribute("id","btn")
//     editBtn.setAttribute("onclick","editItem(this)")

//     editBtn.appendChild(editText)

//     li.appendChild(deleteBtn)
//     li.appendChild(editBtn)

//     list.appendChild(li)
//     todoapp.value = ""
//     console.log(li)
// }

// function deleteItem(e){
//     e.parentNode.remove()
//     console.log(e)
// }

// function editItem(e){
//  console.log(e.parentNode.firstChild.nodeValue)
//  var val = prompt("Edit Text",e.parentNode.firstChild.nodeValue)
//  e.parentNode.firstChild.nodeValue = val;
// }

// function deletelist(){
//     list.innerHTML = ""
// }