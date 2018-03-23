
    function writeUserData() {
      var user = firebase.auth().currentUser;

      _email = user.email;
      _userId = user.uid;
      var someDate = new Date().toString() ;

      firebase.database().ref('users/' + _userId).set({
        email: _email,
        ts: someDate
      });
    }    
    

    function happyPath(data) {

    	var bizNature = "--";
    	var userDetails = data.val();

    	if(userDetails == null){
    		writeUserData();
    		return;	
    	}

		var userDetailsKeys = Object.keys(userDetails);

		console.log(data);

		for (var i =0 ; i < userDetailsKeys.length ; i++){
			if(userDetailsKeys[i]){
				if(userDetailsKeys[i] == "bizNature"){
					bizNature = userDetails[userDetailsKeys[i]];
				}
			}
		}

		if (bizNature){// check if biz nature is defined
         
	        if(bizNature == "_DRIVER_"){
	            //After successful login, user will be redirected to userSettings.html 
	            window.location = 'driverSettings.html';
	        
	        }else if(bizNature == "_PILOT_"){
	            //After successful login, user will be redirected to userSettings.html 
	            window.location = 'pilotSettings.html'; 
	        
	        }else if(bizNature == "_RIDER_"){
	            //After successful login, user will be redirected to userSettings.html 
	            window.location = 'riderSettings.html';
	        
	        }else {
	        	// biz nature is not accepted 
	        	//After successful login, user will be redirected to bizNature.html
	      		window.location = 'bizNature.html'; 
	        }
	    }else{
	    	// biz nature is not defined yet
	    	//After successful login, user will be redirected to bizNature.html
	      	window.location = 'bizNature.html'; 
	    }

	}

	
	function errData(errDetails) {
		console.log(errDetails);

		alert("Error !!  " + errDetails);

    }



    function goToSuitablePage() {// if user defined his nature, go to settings, if not go to user definition.

  		var userId = firebase.auth().currentUser.uid;

      	var db = firebase.database();
  		var usersRef = db.ref('users/' + userId);

  		usersRef.on('value' , happyPath , errData);

    }


    /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      // alert('toggleSignIn()');
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // alert('toggleSignIn()');
        // [END signout]
      } else {
      // alert('toggleSignIn()');
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }

      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
      // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }

    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }

      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }

    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }

    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }

    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]

      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.

          //alert('user user ');

          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'You Are Currently: Signed In';
          //writeUserData();
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          //document.getElementById('quickstart-account-details').textContent = '';
          if (!emailVerified) {
            document.getElementById('quickstart-verify-email').disabled = false;
          }

          //After successful login, user will be redirected to the Suitable Page for next action 
          goToSuitablePage();  
          

          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'You Are Currently: Signed Out';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          //document.getElementById('quickstart-account-details').textContent = 'signed out';

          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]

      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }