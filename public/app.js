var username;

document.addEventListener('DOMContentLoaded', function() {
    var app = firebase.app();
    const db = firebase.firestore();

});




// login function
function logIn() {
    const db = firebase.firestore();
    //TODO make authentication use data from this form
    var email = document.getElementById("emailsignin").value;
    var password = document.getElementById("passwordsignin").value;

    //authenticate 
    firebase.auth().signInWithEmailAndPassword("testas@gmail.com", "test123").then(user => {
        // assign username and populate
        getname();
        getposts();
        document.getElementById("loginform").innerHTML = null;
        document.getElementById("loginform").hidden = true;
        //================

    }).catch(function(error) {
        // TODO customize the errors
        document.getElementById("errorwhenlogginin").innerHTML = error;
    });
    //========================
}
//=============



// get user name and picture
function getname() {
    const db = firebase.firestore();
    
    db.collection("users").doc(firebase.auth().currentUser.uid).get().then(event => {
        data = event.data();
        customheader(data.name, data.image);
    });
}
// ==========================



//customize the header
function customheader(name, imagelink) {
    //put profile name in header
    document.getElementById("headername").innerHTML = name;
    // =======================

    //put image in the header!
    if(typeof image != 'undefined') {
        document.getElementById("headerprofilepic").src = imagelink;
    }
    //if user does not have image put in a default one
    else {
        document.getElementById("headerprofilepic").src = "https://image.flaticon.com/icons/svg/149/149071.svg";
    }
    //=================
    //====================
}
//=========================




//retrieve posts
function getposts() {
    const db = firebase.firestore();
    db.collection("posts").where("audience", "==", "public").get().then(allposts => {
        allposts.forEach(post => {
            data = post.data();
            console.log(data.text);
            document.getElementById("containerofallposts").innerHTML += '<div class="post">'
            //if post contains images, add them 
            if(typeof data.image != 'undefined') {
                if(data.image != null) {
                    document.getElementById("containerofallposts").innerHTML += '<img src="'+data.image+'">';
                }
            }
            //============================
            document.getElementById("containerofallposts").innerHTML += data.text;
            document.getElementById("containerofallposts").innerHTML += '</div>'
        });
    })
}
//=========================