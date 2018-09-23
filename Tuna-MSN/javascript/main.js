

let btn_google = document.querySelector('#btn_google');

    
  function writeUserData(id, name, email, imageUrl) {

    var firebaseDB = firebase.database().ref('TunaUsers/usuario/'+ id).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }



( function() {

  // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            let userInfo = authResult.additionalUserInfo.profile;
            let userName = userInfo.name;
            let userEmail = userInfo.email;
            let userProfileImage = userInfo.picture;
            let userId = userInfo.id;
            
            writeUserData(userId, userName, userEmail, userProfileImage);
            setTimeout(cambiarIndex, 5000);
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return false;
          },
          uiShown: () => document.getElementById('loader').style.display = 'none'
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
    

  function cambiarIndex () {
    firebase.auth().onAuthStateChanged(function(user) {
          //If user is ! empty (userlogged)
          if (user) {
            //change index or location html
            window.location.replace('../html/chat_Room.html');
            // User is signed in.
          } 
      });
  }
}());



  
  