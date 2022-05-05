var firebaseConfig = {
      apiKey: "AIzaSyCR5X7riNMPuZC85bfL3hBS8Z4ezyYxNSY",
      authDomain: "kwitter-ac8ed.firebaseapp.com",
      databaseURL: "https://kwitter-ac8ed-default-rtdb.firebaseio.com",
      projectId: "kwitter-ac8ed",
      storageBucket: "kwitter-ac8ed.appspot.com",
      messagingSenderId: "224821992664",
      appId: "1:224821992664:web:74b9ed2e4dd5a823930bad"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("username");

document.getElementById("user_name").innerHTML = "welcome " + username + ":)";

function addroom() {
      roomname = document.getElementById("room_name").value;
      firebase.database().ref("/").child(roomname).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", roomname);
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("roomname-" + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row

            });
      });
}
getData();

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html"
}

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}