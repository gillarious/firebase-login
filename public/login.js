var config = {
  apiKey: "AIzaSyBsv6ygZoA2vvJ7KR3JSc-5hevzpjMKTCY",
  authDomain: "basic-firebase-login.firebaseapp.com",
  databaseURL: "https://basic-firebase-login.firebaseio.com",
  projectId: "basic-firebase-login",
  storageBucket: "basic-firebase-login.appspot.com",
  messagingSenderId: "821779637910"
};
firebase.initializeApp(config);

// variables for html elements
const user = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirmPass');
const signUpButton = document.getElementById('signUp');
const signUpForm = document.getElementById('signUpForm');

const logininfo = document.getElementById('emaillogin');
const loginpass = document.getElementById('passwordlogin');
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('login');

const forms = document.getElementById('forms');

const success = document.getElementById('success');
const userinfo = document.getElementById('userinfo');
const signOutButton = document.getElementById('signout');

var currentUser;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    forms.style.display = 'none';
    success.style.display = "block";
    userinfo.innerHTML = user.displayName + " (" + user.email + ")"; 
  } 
  else {
    success.style.display = "none";
  }
});



const createUser = function(username,email,password){
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
    var id = firebase.auth().currentUser.uid;

    firebase.auth().currentUser.updateProfile({
      displayName: username
    }).catch(function(error) {
      // An error happened.
    });

    firebase.database().ref('users/' + id).set({
      username: username,
      email: email
    }, function(error){
      if (error) { 
        console.log(error);
      } else {
        location.reload();
      }
    });

  }).catch(function(error){
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ": " + errorMessage);
    // ...
  });
}


signUpButton.onclick = function(){

  let newUser = user.value;
  let newEmail = email.value;
  let newPassword = password.value;
  let newConfirm = confirmPass.value;

  //TODO: Add more validity checks for sign up info
  if( newPassword != newConfirm ){
    //TODO: throw error for password confirmation
    console.log("Not matching");

  }
  //sign in user once validated
  else{
    createUser(newUser,newEmail,newPassword);
  }
};

loginButton.onclick = function(){
  loginUser(logininfo.value, loginpass.value);
}

const loginUser = function(info,password){
  firebase.auth().signInWithEmailAndPassword(info, password).catch(function(error) {
    // Handle Errors here.
    if(error.code == "auth/invalid-email" || error.code == "auth/user-not-found"){
      var found = false;

      firebase.database().ref('users').once('value').then(function(snapshot) {
        var data = snapshot.val();
        Object.keys(data).forEach(function(key) {
          if(data[key].username == info){
            loginUser(data[key].email,password);
            found = true;
          }
        });
      }).then(function() {
        if(!found){
          //TODO: User does not exist message
          console.log("User not found!");
        }
      });

    }
    else{
      console.log(error.code + ": " + error.message);
      // ...
      //TODO: Show error with login
    }

  });
}

signOutButton.onclick = function(){
  firebase.auth().signOut();
  forms.style.display = 'block';
  success.style.display = "none";
}