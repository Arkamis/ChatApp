
let btn_signOut = document.querySelector('#btn_signOut');

btn_signOut.addEventListener('click', desconectar);


firebase.auth().onAuthStateChanged(function(user) {

    let user_id = null;
    if (user) {
      // User is signed in.
      user_id = user.uid;
    } else {
        user_id = null;
        window.location.replace('../html/index.html');
    }
});


function desconectar() {
    firebase.auth().signOut();
}