
var firebase_app = {};


(function (){
    var config = {
        apiKey: "AIzaSyBexbcRcDKztO96S8Q2wg8JuC8tzU4gUBI",
        authDomain: "chat-tiempo-real-cbef6.firebaseapp.com",
        databaseURL: "https://chat-tiempo-real-cbef6.firebaseio.com/",
        projectId: "chat-tiempo-real-cbef6",
        storageBucket: "chat-tiempo-real-cbef6.appspot.com",
        messagingSenderId: "758868887029"
      };
    firebase.initializeApp(config);

      firebase_app = config;
}());