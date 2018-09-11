

let btn_google = document.querySelector('#btn_google');

// btn_google.addEventListener('click', useGoogle);

//inicializa Firebase

// function useGoogle() {
//     var provider = new firebase.auth.GoogleAuthProvider();

//   firebase.auth().languageCode = 'es';
//   firebase.auth().signInWithRedirect(provider);
//   firebase.auth().getRedirectResult().then(function(result) {
    
//     if (result.credential) {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = result.credential.accessToken;
//       // ...
//     }
//     // The signed-in user info.
//     var user = result.user;
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });

// }

var config = {
    apiKey: "AIzaSyBexbcRcDKztO96S8Q2wg8JuC8tzU4gUBI",
    authDomain: "chat-tiempo-real-cbef6.firebaseapp.com",
    databaseURL: "https://chat-tiempo-real-cbef6.firebaseio.com",
    projectId: "chat-tiempo-real-cbef6",
    storageBucket: "chat-tiempo-real-cbef6.appspot.com",
    messagingSenderId: "758868887029"
  };
firebase.initializeApp(config);



    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '../html/chat_Room.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ]
      };

      // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);





  
  