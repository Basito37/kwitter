//YOUR FIREBASE LINKS
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
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: username,
            message: msg,
            likes: 0
      });
      doucment.getElementById("msg").value = "";

}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['likes'];
                        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLikes(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;

                  }
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html"
}
function updateLikes(msg_id){
console.log("You clicked on the like button:"+msg_id);
btn_id=msg_id;
likes=document.getElementById(btn_id).value;
newlikes=Number(likes)+1;
firebase.database().ref(room_name).child(msg_id).update({
likes:newlikes      
});
}