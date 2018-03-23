


  
  function pilotHappyPath(data) {

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

    assureBizNature("_PILOT_",bizNature);
  }

  
  
  function errData(errDetails) {
    console.log(errDetails);

    alert("Error !!  " + errDetails);

  }


  function validateBizNature(){// check if the biz nature is set, if not, set it to "pilot"

    var userId = firebase.auth().currentUser.uid;
    var db = firebase.database();
    var usersRef = db.ref('users/' + userId);

    usersRef.on('value' , pilotHappyPath , errData);

  }



  function loadData(){
      validateBizNature();

      

  }

    

  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
  function initApp() {
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        
        loadData();

      } else {
        // No user is signed in.
          alert('Please login before you go to this page');

      }
    }); 
          
  }



