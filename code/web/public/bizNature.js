


	
    function happyPath(data) {

    	var bizNature = "--";
    	var userDetails = data.val();
		var userDetailsKeys = Object.keys(userDetails);

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
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
		// Listening for auth state changes.
		// [START authstatelistener]

	    firebase.auth().onAuthStateChanged(function(user) {
	    if (user) {
	          // User is signed in.
	          goToSuitablePage();
	    } else {
	      alert('Please login before you go to this page');
	      window.location = 'email.html';
	    }
	  });
    }