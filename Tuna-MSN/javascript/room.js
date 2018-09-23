//main room


let btn_Enviar = document.querySelector(".msg_send_btn");

let userInput = document.querySelector('.write_msg');

userInput.addEventListener('keyup', (event) => {

    if (event.which == 13 || event.keyCode == 13) {
        //code to execute here
        enviarMensaje();
        return false;
    }
    return true;
});
btn_Enviar.addEventListener('click', enviarMensaje);

function enviarMensaje() {
    let mensaje = document.querySelector(".write_msg").value;
    document.querySelector(".write_msg").value = "";
    
    let userName, userPic;
    let usuario = firebase.auth().currentUser;

    if(usuario != null)
    {
        userName = usuario.displayName;
        userPic = usuario.photoURL;
    }

    let fecha = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August",
     "September", "October", "November", "December"];

   

    let tiempoMensaje = `${months[fecha.getMonth()]}/${fecha.getDay()}/${fecha.getFullYear()}/${fecha.getHours()}:${fecha.getMinutes()}`;
    
    let db_id = mainEvaluador();
    console.log('pase por ENVIARMENSAJE');
    nuevoMensaje(userName, tiempoMensaje, userPic, mensaje, db_id);
}





function nuevoMensaje(usuario, tiempo, profile_pic, mensaje, id_DataBase) {
    const db_Firebase = firebase.database().ref(`TunaUsers/mensajes/${id_DataBase}`);
    
    let nuevoMensaje = db_Firebase.push();
    nuevoMensaje.set({
        username: usuario,
        tiempo: tiempo,
        profile_pic: profile_pic,
        mensaje: mensaje
    });
    console.log('pase por nuevoMensaje()');
}



(function(){

    //get my database
    const db_TunaObj = firebase.database().ref('TunaUsers');


    //get data from my Database User child
    const db_UserList = db_TunaObj.child('usuario');
    //mostrar Contactos
    db_UserList.orderByChild("username").on("child_added", snapshot => {
        readAllUsers(snapshot);
    });

    //al cargar se crean los usuarios
    function readAllUsers(user) {
        let userKey = user.key;
        user = user.val();
        //Mi tabla de usuarios
        let div_usersChat = document.querySelector('.inbox_chat'); 
        
        //crear Main Div hacerlo clicleable
        let a_chat_list = document.createElement('a');
        a_chat_list.setAttribute('href', '#');
        div_usersChat.appendChild(a_chat_list);
        let div_chat_list = document.createElement('div');
        div_chat_list.setAttribute('class', 'chat_list' );
        div_chat_list.setAttribute('onclick', 'cambiarClase(this)');
        a_chat_list.appendChild(div_chat_list);

        //crear Div usuario
        let div_usuario = document.createElement('div');
        div_usuario.setAttribute('class', 'chat_people');
        div_chat_list.appendChild(div_usuario);

            //div de la foto del usuario
            let div_userPic = document.createElement('div');
            div_userPic.setAttribute('class', 'chat_img');
            let userPicLink = document.createElement('img');
            userPicLink.setAttribute('src', user.profile_picture);
            div_userPic.appendChild(userPicLink);
            div_usuario.appendChild(div_userPic);

        //crear div con info del user
        let div_userInfo = document.createElement('div');
        div_userInfo.setAttribute('class', 'chat_ib');
        div_usuario.appendChild(div_userInfo);

            //h5 con nombre y P con correo
            let atributos = `<h5>${user.username}</h5>`;
            atributos += `<p>${user.email}</p>`;
            div_userInfo.innerHTML = atributos;

    }
    

    
    //Check if the user is signed in
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

}());    

window.onload = mostrarMensajes('grupos/Group&Chat');

function mostrarMensajes(id_tabla) {
    const firebaseDb = firebase.database().ref(`TunaUsers/mensajes/${id_tabla}`);
    const div_mensajes = document.querySelector('.msg_history');
    div_mensajes.innerHTML = "";

    firebaseDb.on("child_added", data => {
                    
        // Prior to getting your messages.
        
        crearConv(data.val());
        let shouldScroll = div_mensajes.scrollTop + div_mensajes.clientHeight === div_mensajes.scrollHeight;
        //After getting your messages.
        if (!shouldScroll) {
            scrollToBottom();
        }else{
            //
        }
        return true;

    });
    console.log('pase por Mostrar mensajes');


        
    function crearConv(datos)
        {
            let mensaje = datos.mensaje;
            let profile_pic = datos.profile_pic;
            let tiempo = datos.tiempo;
            let nombre_usuario = datos.username;

            let usuario = firebase.auth().currentUser;

            //tomamos el div main de msg_history
            let div_mainHistory = document.querySelector('.msg_history');

            //creo 2 divs que siempre se utilizaran
            let div_receptor = document.createElement('div');
            

            let div_mensaje = document.createElement('div');


            let atributos = null;

            atributos = `<p>${mensaje}</p>`;
            atributos += `<span class="time_date">${tiempo}</span>`;


            if(usuario != null)
            {
                if(usuario.displayName == nombre_usuario)
                {
                    div_receptor.setAttribute('class', 'outgoing_msg');
                    div_mensaje.setAttribute('class', 'sent_msg');
                    div_mainHistory.appendChild(div_receptor);
                    div_receptor.appendChild(div_mensaje);
                    div_mensaje.innerHTML = atributos;
                }else{

                    let div_img = document.createElement('div');
                    let img_div = document.createElement('img');
                    img_div.setAttribute('src', profile_pic);
                    div_img.setAttribute('class', 'incoming_msg_img');
                    div_img.appendChild(img_div);


                    div_receptor.appendChild(div_img);

                    div_receptor.setAttribute('class', 'incoming_msg');
                    div_mensaje.setAttribute('class', 'received_msg');

                    let div_mensajeActual = document.createElement('div');
                    div_mensajeActual.setAttribute('class', 'received_withd_msg');

                    div_mensajeActual.innerHTML = atributos;

                    div_mensaje.appendChild(div_mensajeActual);


                    div_mainHistory.appendChild(div_receptor);
                    div_receptor.appendChild(div_mensaje);
                }
            }
        console.log('pasePor DISPLAYDATOS');
    }

    function scrollToBottom() {
        div_mensajes.scrollTop = div_mensajes.scrollHeight;
  
    }   

}


function getBothIds (friendName, myName){
    let db = firebase.database().ref('TunaUsers/usuario');
    let valorAmigo, valorMio = null;
    db.orderByChild('username').equalTo(friendName).once('child_added', snap => {
        valorAmigo = snap.key;
        return true;
    });

    db.orderByChild('username').equalTo(myName).once('child_added', snap => {
        valorMio = snap.key;
        return true;
    })
    console.log('Pase por getbothIds');
    
    return [valorAmigo,valorMio];
}

function mainEvaluador(){

    let id_generado = tomarinfo();
    let listaPrivados;
    const firebaseDb = firebase.database().ref('TunaUsers');
    
    if(id_generado[0] == "Group&Chat" && id_generado[1] == "Group&Chat")
    {
        return 'grupos/Group&Chat';
    }else{
        listaPrivados = firebaseDb.child('mensajes/privados');
    }
    let valorDeKey;
    
    listaPrivados.orderByKey().equalTo(id_generado[0] || id_generado[1]).once('child_added', snap =>{
        valorDeKey = snap.key;
    });
    
    // let key_Utilizar = new Promise( (resolve, reject) => {
    //     listaPrivados.once('value', snapshot => {
                    
    //         if(id_generado[0] == "Group Chat") {
    //             resolve('grupos/Group&Chat');
    //         }else {
    //             resolve(`privados/${(snapshot.hasChild(id_generado[0])) ? id_generado[0] : id_generado[1]}`)
    //         }
    //         })
    //     })
    //     .then( result => valorDeKey = result);
    // debugger;
    return valorDeKey;
}

function tomarinfo() {
    let objeto = document.querySelector('.active_chat');
    let usuario = firebase.auth().currentUser;
    let nombreDelAmigo = objeto.lastElementChild.lastElementChild.firstElementChild.textContent;
    let arrayKeys = getBothIds(nombreDelAmigo, usuario.displayName);

    let llaveGenerada1, llaveGenerada2 = null;

    if(nombreDelAmigo == 'Group Chat')
    {
        llaveGenerada1 = 'Group&Chat';
        llaveGenerada2 = 'Group&Chat';
    }else{
        llaveGenerada1 = `${arrayKeys[0]}&${arrayKeys[1]}`;
        llaveGenerada2 = `${arrayKeys[1]}&${arrayKeys[0]}`;
    }
    console.log('pase por tomarInfo()');
    return [llaveGenerada1, llaveGenerada2];
        
}

function cambiarClase(objeto) {
    let todosLosactuales = document.querySelectorAll('.active_chat');

    todosLosactuales[0].classList.remove('active_chat');
    objeto.classList.toggle('active_chat');

    console.log(objeto);
    console.log('pase por cambiarClase');
    
    objeto.addEventListener('click', mostrarMensajes(mainEvaluador()));
    objeto.removeEventListener('click', mostrarMensajes(mainEvaluador()));
  
}
var global = () => {
    
    mostrarMensajes(mainEvaluador());
};


