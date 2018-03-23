





    
    function isBizNatureNotSetYet(bizNature){

        if (bizNature) {
          return false;
        }
        return true;
    }


    function setBizNature(_bizNature){

      var user = firebase.auth().currentUser;

      _email = user.email;
      _userId = user.uid;
      var someDate = new Date().toString() ;
          
      firebase.database().ref('users/' + _userId).set({
        email: _email,
        bizNature: _bizNature,
        ts: someDate
      });

    }


    function validateBizNature(data){// check if the biz nature is set, if not, set it to "driver"

    	var bizNature = "--";
    	var userDetails = data.val();

    	if(userDetails == null){
    		writeUserData();
    		return;	
    	}

		var userDetailsKeys = Object.keys(userDetails);

		// console.log(data);

		for (var i =0 ; i < userDetailsKeys.length ; i++){
			if(userDetailsKeys[i]){
				if(userDetailsKeys[i] == "bizNature"){
					bizNature = userDetails[userDetailsKeys[i]];
				}
			}
		}

		if (!(bizNature)){	// is null or not set yet
      		setBizNature("_DRIVER_");
      	}

      	syncBasicBizDetails();

		syncBasicBizOrders();


    }

    function syncBasicBizOrders(){
    	var userId = firebase.auth().currentUser.uid;
        var belongs_to_biz_id = firebase.database().ref('users/'+userId +'/Belong_To_Biz_ID').val();
        console.log(belongs_to_biz_id);
        var driverRef = firebase.database().ref('driver/'+userId + '/orders/');
        driverRef.on('value' , syncBasicBizDetalils2 , errData4);
    }


    function syncBasicBizDetalils2(){
		var userId = firebase.auth().currentUser.uid;

		var BizName = document.getElementById("Belong_To_Biz_ID").value;
		var Biz_Phone_1 = document.getElementById("Biz_Phone_1").value;
		var Biz_Phone_2 = document.getElementById("Biz_Phone_2").value;
		var Biz_Address = document.getElementById("Biz_Address").value;

		var driverBizData = data.val();


		if(!(driverBizData)){// no intial data yet.
			setNewInitialDriverBizData(BizName, Biz_Phone_1, Biz_Phone_2, Biz_Address, userId);
			return;
		}

		// console.log(driverBizData);
		
		var dbBizName = driverBizData.BizName;
		if(!(BizName ) && dbBizName){
			BizName = driverBizData.BizName;
		}


		var dbBizPhone1 = driverBizData.BizPhone1;
		if(!(Biz_Phone_1 ) && dbBizPhone1){
			Biz_Phone_1 = driverBizData.BizPhone1;
		}

		var dbBizPhone2 = driverBizData.BizPhone2;
		if(!(Biz_Phone_2 ) && dbBizPhone2){
			Biz_Phone_2 = driverBizData.BizPhone2;
		}

		var dbBizAddress = driverBizData.BizAddress;
		if(!(Biz_Address )&& dbBizAddress){
			Biz_Address = driverBizData.BizAddress;
		}

		document.getElementById("Biz_Name").value = BizName ;
		document.getElementById("Biz_Phone_1").value = Biz_Phone_1 ;
		document.getElementById("Biz_Phone_2").value = Biz_Phone_2;
		document.getElementById("Biz_Address").value = Biz_Address;

		var updates = {};
		updates['/driver/' + userId + "/BizName"] =  BizName ;
		updates['/driver/' + userId + "/BizPhone1"] = Biz_Phone_1  ;
		updates['/driver/' + userId + "/BizPhone2"] = Biz_Phone_2  ;
		updates['/driver/' + userId + "/BizAddress"] = Biz_Address  ;

		firebase.database().ref().update(updates);

    }

    function syncOrderInHandDetails(){
		var userId = firebase.auth().currentUser.uid;

		var BizName = document.getElementById("Belong_To_Biz_ID").value;
		var Biz_Phone_1 = document.getElementById("Biz_Phone_1").value;
		var Biz_Phone_2 = document.getElementById("Biz_Phone_2").value;
		var Biz_Address = document.getElementById("Biz_Address").value;

		var driverBizData = data.val();


		if(!(driverBizData)){// no intial data yet.
			setNewInitialDriverBizData(BizName, Biz_Phone_1, Biz_Phone_2, Biz_Address, userId);
			return;
		}

		// console.log(driverBizData);

		var dbBizName = driverBizData.BizName;
		if(!(BizName ) && dbBizName){
			BizName = driverBizData.BizName;
		}


		var dbBizPhone1 = driverBizData.BizPhone1;
		if(!(Biz_Phone_1 ) && dbBizPhone1){
			Biz_Phone_1 = driverBizData.BizPhone1;
		}

		var dbBizPhone2 = driverBizData.BizPhone2;
		if(!(Biz_Phone_2 ) && dbBizPhone2){
			Biz_Phone_2 = driverBizData.BizPhone2;
		}

		var dbBizAddress = driverBizData.BizAddress;
		if(!(Biz_Address )&& dbBizAddress){
			Biz_Address = driverBizData.BizAddress;
		}

		document.getElementById("Biz_Name").value = BizName ;
		document.getElementById("Biz_Phone_1").value = Biz_Phone_1 ;
		document.getElementById("Biz_Phone_2").value = Biz_Phone_2;
		document.getElementById("Biz_Address").value = Biz_Address;

		var updates = {};
		updates['/driver/' + userId + "/BizName"] =  BizName ;
		updates['/driver/' + userId + "/BizPhone1"] = Biz_Phone_1  ;
		updates['/driver/' + userId + "/BizPhone2"] = Biz_Phone_2  ;
		updates['/driver/' + userId + "/BizAddress"] = Biz_Address  ;

		firebase.database().ref().update(updates);

    }

    function syncBasicDriverBizDetails(){

    	var userId = firebase.auth().currentUser.uid;
    	var driverRef = firebase.database().ref('driver/'+userId);

		driverRef.on('value' , syncBasicDriverBizDetails2 , errData3);

    }

    function syncBasicDriverBizDetails2(data){

    	var userId = firebase.auth().currentUser.uid;

    	var BizName = document.getElementById("Biz_Name").value;
    	var Biz_Phone_1 = document.getElementById("Biz_Phone_1").value;
    	var Biz_Phone_2 = document.getElementById("Biz_Phone_2").value;
    	var Biz_Address = document.getElementById("Biz_Address").value;

    	var driverBizData = data.val();
		
    	
    	if(!(driverBizData)){// no intial data yet.
    		setNewInitialDriverBizData(BizName, Biz_Phone_1, Biz_Phone_2, Biz_Address, userId);
			return;
		}

		// console.log(driverBizData);

		var dbBizName = driverBizData.BizName;
		if(!(BizName ) && dbBizName){
			BizName = driverBizData.BizName;
		}


		var dbBizPhone1 = driverBizData.BizPhone1;
		if(!(Biz_Phone_1 ) && dbBizPhone1){
			Biz_Phone_1 = driverBizData.BizPhone1;
		}

		var dbBizPhone2 = driverBizData.BizPhone2;
		if(!(Biz_Phone_2 ) && dbBizPhone2){
			Biz_Phone_2 = driverBizData.BizPhone2;
		}
		
		var dbBizAddress = driverBizData.BizAddress;
		if(!(Biz_Address )&& dbBizAddress){
			Biz_Address = driverBizData.BizAddress;
		}

		document.getElementById("Biz_Name").value = BizName ;
		document.getElementById("Biz_Phone_1").value = Biz_Phone_1 ;
		document.getElementById("Biz_Phone_2").value = Biz_Phone_2;
		document.getElementById("Biz_Address").value = Biz_Address;

		var updates = {};
  		updates['/driver/' + userId + "/BizName"] =  BizName ;
  		updates['/driver/' + userId + "/BizPhone1"] = Biz_Phone_1  ;
  		updates['/driver/' + userId + "/BizPhone2"] = Biz_Phone_2  ;
  		updates['/driver/' + userId + "/BizAddress"] = Biz_Address  ;

  		firebase.database().ref().update(updates);

    }


    function setNewInitialDriverBizData(BizName, Biz_Phone_1, Biz_Phone_2, Biz_Address, userId){
    	
    	var database = firebase.database();
    	var newKey = userId;
    	database.ref('driver/'+newKey+'/BizName').set(BizName);
    	database.ref('driver/'+newKey+'/BizPhone1').set(Biz_Phone_1);
    	database.ref('driver/'+newKey+'/BizPhone2').set(Biz_Phone_2);
    	database.ref('driver/'+newKey+'/BizAddress').set(Biz_Address);
    	database.ref('driver/'+newKey+'/Owner').set(userId);
    }





    function openTab(evt, tabName) {
	    var i, tabcontent, tablinks;
	    tabcontent = document.getElementsByClassName("tabcontent");

	    for (i = 0; i < tabcontent.length; i++) {
	        tabcontent[i].style.display = "none";
	    }

	    tablinks = document.getElementsByClassName("tablinks");
	    for (i = 0; i < tablinks.length; i++) {
	        tablinks[i].className = tablinks[i].className.replace(" active", "");
	    }

	    document.getElementById(tabName).style.display = "block";
	    evt.currentTarget.className += " active";
	}




    function loadData(data){

    	validateBizNature(data);

    }




    function errData(errDetails) {
		console.log(errDetails);

		alert("Error - 2  !!  " + errDetails);

    }

    function errData3(errDetails) {
		console.log(errDetails);

		alert("Error - 3  !!  " + errDetails);

    }

    function errData4(errDetails) {
		console.log(errDetails);

		alert("Error - 4  !!  " + errDetails);

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
                var userId = firebase.auth().currentUser.uid;

				var db = firebase.database();
				var usersRef = db.ref('users/' + userId);

				usersRef.on('value' , loadData , errData);


            } else {
              // No user is signed in.
                alert('Please login before you go to this page');
                window.location = 'email.html';

            }
        }); 
            
    }
    

    




























