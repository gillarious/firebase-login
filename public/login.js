
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

const loginemail = document.getElementById('emaillogin');
const loginpass = document.getElementById('passwordlogin');
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('login');

const forms = document.getElementById('forms');
const success = document.getElementById('success');

const createUser = function(username,email,password){
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ": " + errorMessage);
    // ...
    return false;
  });

  //TODO: save username here
  return true;
};

const login = function(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ": " + errorMessage);
    // ...
    return false;
  });
  
  return true;
};

signUpButton.onclick = function(){

  let newUser = user.value;
  let newEmail = email.value;
  let newPassword = password.value;
  let newConfirm = confirmPass.value;

  //TODO: Add more validity checks for info
  if( newPassword != newConfirm ){
    //TODO: throw error
    console.log("Not matching");

  }
  //sign in user once validated
  else{
    if(createUser(newUser,newEmail,newPassword)){
      forms.style.display = 'none';
      success.innerHTML = "Welcome " + newUser + " (" + newEmail + ")";
    }
  }

};

loginButton.onclick = function(){

  let returningEmail = loginemail.value;
  let returningPassword = loginpass.value;
  if( login(returningEmail, returningPassword) ){
    forms.style.display = 'none';
    success.innerHTML = "Welcome back!";
  }
  
};