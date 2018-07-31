var username;
var defaultpicture = "https://image.flaticon.com/icons/svg/149/149071.svg";
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
    //cache images
        db.collection("users").get().then(event => {
            event.forEach(data => {
                localStorage.setItem(data.data().name, data.data().image); 
            })
        });
    //=============
}
//=============



// get user name and picture
function getname() {
    const db = firebase.firestore();
    
    db.collection("users").doc(firebase.auth().currentUser.uid).get().then(event => {
        data = event.data();
        username = data.name;
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
        document.getElementById("headerprofilepic").src = defaultpicture;
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
            console.log(post.id);
            //put in the author info
            var imagelink = localStorage.getItem(data.author) || defaultpicture;
            if (typeof imagelink == "null" || imagelink == "null" || typeof imagelink == 'null' || typeof imagelink == 'undefined' || imagelink == "undefined") {
                imagelink = defaultpicture;
            }            
            // =============================================
            // put in the tag info
            var tag = data.tag;
            if (typeof tag == "null" || tag == "null" || typeof tag == 'null' || typeof tag == 'undefined' || tag == "undefined") {
                tag = "";
            }      
            else {
                tag = ' #'+tag;
            }
            //=====================

            //make delete button on owned posts TESTING FEATURE!
            if (data.author_uid == firebase.auth().currentUser.uid) {
                var deletebutton = '<button class="deletepost" onclick="deletePost(\''+post.id+'\')">delete post</button>';
            }
            else {
                var deletebutton = "";
            }
            //============================


            //ddifferent post structere if  post contains images, add them 
            if(typeof data.image != 'undefined') {
                if(data.image != null) {
                    document.getElementById("containerofallposts").innerHTML += '<div class="post" id="'+post.id+'">'+'<div class="authorofpost">'+'<p>'+data.author+'</p>' +'<img src="'+imagelink+'">'+deletebutton+'</div>'+'<a class="tag">'+tag+'<br>'+'</a>'+'<img src="'+data.image+'">'+'<p>'+data.text+'</p>'+'</div>';
                }
                document.getElementById("containerofallposts").innerHTML += '<div class="post" id="'+post.id+'">'+'<div class="authorofpost">'+'<p>'+data.author+'</p>' +'<img src="'+imagelink+'">'+deletebutton+'</div>'+'<a class="tag">'+tag+'</a>'+'<br>'+'<p>'+data.text+'</p>'+'</div>';
            }
            document.getElementById("containerofallposts").innerHTML += '<div class="post" id="'+post.id+'">'+'<div class="authorofpost">'+'<p>'+data.author+'</p>' +'<img src="'+imagelink+'">'+deletebutton+'</div>'+'<a class="tag">'+tag+'</a>'+'<br>'+'<p>'+data.text+'</p>'+'</div>';
            //============================
        });
    })
}
//=========================

// create posts
function createNewPost() {
    const db = firebase.firestore();
    // make sure post input is not empty
    var posttext = document.getElementById("postcreationclasstext").value;
    if (posttext !== "" ) {
        db.collection("posts").add({
            audience: "public",
            author: username,
            author_uid: firebase.auth().currentUser.uid,
            created: new Date,
            tag: null,
            text: posttext,
            versionCode: 1,
            versionType: "web"
        })
    }
}
//=================================

// delete post when the delete button is clicked
function deletePost(id) {
    const db = firebase.firestore();
    document.getElementsById(id).remove;
    db.collection("posts").doc(id).delete();
}
//==============================================