





    
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


    function validateBizNature(data){// check if the biz nature is set, if not, set it to "rider"

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
      		setBizNature("_RIDER_");
      	}

      	syncBasicBizDetails();

		syncBasicBizOrders();


    }

    function syncBasicBizOrders(){
    	var userId = firebase.auth().currentUser.uid;
        var belongs_to_biz_id = firebase.database().ref('users/'+userId +'/Belong_To_Biz_ID').val();
        console.log(belongs_to_biz_id);
        var riderRef = firebase.database().ref('rider_orders/'+userId);
        riderRef.on('value' , syncBasicBizOrders2 , errData4);

    }


    function syncBasicBizOrders2(){
		var userId = firebase.auth().currentUser.uid;

		var BizName = document.getElementById("Belong_To_Biz_ID").value;
		var Biz_Phone_1 = document.getElementById("Biz_Phone_1").value;
		var Biz_Phone_2 = document.getElementById("Biz_Phone_2").value;
		var Biz_Address = document.getElementById("Biz_Address").value;

		var riderBizData = data.val();


		if(!(riderBizData)){// no intial data yet.
			setNewInitialWholesaleBizData(BizName, Biz_Phone_1, Biz_Phone_2, Biz_Address, userId);
			return;
		}

		// console.log(riderBizData);
		// var riderBizDataKeys = Object.keys(riderBizData);

		// var dbBizName = riderBizData[riderBizDataKeys[0]].BizName;
		var dbBizName = riderBizData.BizName;
		if(!(BizName ) && dbBizName){
			// BizName = riderBizData[riderBizDataKeys[0]].BizName;
			BizName = riderBizData.BizName;
		}


		// var dbBizPhone1 = riderBizData[riderBizDataKeys[0]].BizPhone1;
		var dbBizPhone1 = riderBizData.BizPhone1;
		if(!(Biz_Phone_1 ) && dbBizPhone1){
			// Biz_Phone_1 = riderBizData[riderBizDataKeys[0]].BizPhone1;
			Biz_Phone_1 = riderBizData.BizPhone1;
		}

		// var dbBizPhone2 = riderBizData[riderBizDataKeys[0]].BizPhone2;
		var dbBizPhone2 = riderBizData.BizPhone2;
		if(!(Biz_Phone_2 ) && dbBizPhone2){
			// Biz_Phone_2 = riderBizData[riderBizDataKeys[0]].BizPhone2;
			Biz_Phone_2 = riderBizData.BizPhone2;
		}

		// var dbBizAddress = riderBizData[riderBizDataKeys[0]].BizAddress;
		var dbBizAddress = riderBizData.BizAddress;
		if(!(Biz_Address )&& dbBizAddress){
			// Biz_Address = riderBizData[riderBizDataKeys[0]].BizAddress;
			Biz_Address = riderBizData.BizAddress;
		}

		document.getElementById("Biz_Name").value = BizName ;
		document.getElementById("Biz_Phone_1").value = Biz_Phone_1 ;
		document.getElementById("Biz_Phone_2").value = Biz_Phone_2;
		document.getElementById("Biz_Address").value = Biz_Address;

		var updates = {};
		updates['/rider/' + userId + "/BizName"] =  BizName ;
		updates['/rider/' + userId + "/BizPhone1"] = Biz_Phone_1  ;
		updates['/rider/' + userId + "/BizPhone2"] = Biz_Phone_2  ;
		updates['/rider/' + userId + "/BizAddress"] = Biz_Address  ;

		firebase.database().ref().update(updates);

    }

    function syncBasicBizDetails(){

    	var userId = firebase.auth().currentUser.uid;
    	var riderRef = firebase.database().ref('rider/'+userId);

		riderRef.on('value' , syncBasicBizDetails2 , errData3);

    }

    function syncBasicBizDetails2(data){

    	var userId = firebase.auth().currentUser.uid;

    	var BizName = document.getElementById("Biz_Name").value;
    	var Biz_Phone_1 = document.getElementById("Biz_Phone_1").value;
    	var Biz_Phone_2 = document.getElementById("Biz_Phone_2").value;
    	var Biz_Address = document.getElementById("Biz_Address").value;

    	var riderBizData = data.val();
		
    	
    	if(!(riderBizData)){// no intial data yet.
    		setNewInitialWholesaleBizData(BizName, Biz_Phone_1, Biz_Phone_2, Biz_Address, userId);
			return;
		}

		// console.log(riderBizData);
		// var riderBizDataKeys = Object.keys(riderBizData);

		// var dbBizName = riderBizData[riderBizDataKeys[0]].BizName;
		var dbBizName = riderBizData.BizName;
		if(!(BizName ) && dbBizName){
			// BizName = riderBizData[riderBizDataKeys[0]].BizName;
			BizName = riderBizData.BizName;
		}


		// var dbBizPhone1 = riderBizData[riderBizDataKeys[0]].BizPhone1;
		var dbBizPhone1 = riderBizData.BizPhone1;
		if(!(Biz_Phone_1 ) && dbBizPhone1){
			// Biz_Phone_1 = riderBizData[riderBizDataKeys[0]].BizPhone1;
			Biz_Phone_1 = riderBizData.BizPhone1;
		}

		// var dbBizPhone2 = riderBizData[riderBizDataKeys[0]].BizPhone2;
		var dbBizPhone2 = riderBizData.BizPhone2;
		if(!(Biz_Phone_2 ) && dbBizPhone2){
			// Biz_Phone_2 = riderBizData[riderBizDataKeys[0]].BizPhone2;
			Biz_Phone_2 = riderBizData.BizPhone2;
		}
		
		// var dbBizAddress = riderBizData[riderBizDataKeys[0]].BizAddress;
		var dbBizAddress = riderBizData.BizAddress;
		if(!(Biz_Address )&& dbBizAddress){
			// Biz_Address = riderBizData[riderBizDataKeys[0]].BizAddress;
			Biz_Address = riderBizData.BizAddress;
		}

		document.getElementById("Biz_Name").value = BizName ;
		document.getElementById("Biz_Phone_1").value = Biz_Phone_1 ;
		document.getElementById("Biz_Phone_2").value = Biz_Phone_2;
		document.getElementById("Biz_Address").value = Biz_Address;

		var updates = {};
  		updates['/rider/' + userId + "/BizName"] =  BizName ;
  		updates['/rider/' + userId + "/BizPhone1"] = Biz_Phone_1  ;
  		updates['/rider/' + userId + "/BizPhone2"] = Biz_Phone_2  ;
  		updates['/rider/' + userId + "/BizAddress"] = Biz_Address  ;

  		firebase.database().ref().update(updates);

    }


    function setNewInitialWholesaleBizData(BizName, Biz_Phone_1, Biz_Phone_2, Biz_Address, userId){
    	
    	var database = firebase.database();
    	var newKey = userId;
    	database.ref('rider/'+newKey+'/BizName').set(BizName);
    	database.ref('rider/'+newKey+'/BizPhone1').set(Biz_Phone_1);
    	database.ref('rider/'+newKey+'/BizPhone2').set(Biz_Phone_2);
    	database.ref('rider/'+newKey+'/BizAddress').set(Biz_Address);
    	database.ref('rider/'+newKey+'/Owner').set(userId);
    }


	function extendOrdersTable(ordersList) {
	    var table = document.getElementById("Orders_table");
	    
	    var row = table.insertRow(-1);

	    var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);

	    cell1.innerHTML = "NEW CELL5555";
	    cell2.innerHTML = "NEW CELL6666";

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


    function openTabGeneric(evt, tabName, _tabContentStr, _noneStr , _tabLinksStr, _activeStr, _blockStr) {
	    var i, tabcontent, tablinks;
	    tabcontent = document.getElementsByClassName(_tabContentStr);

	    for (i = 0; i < tabcontent.length; i++) {
	        tabcontent[i].style.display =  _noneStr;
	    }

	    tablinks = document.getElementsByClassName(_tabLinksStr);
	    for (i = 0; i < tablinks.length; i++) {
	        tablinks[i].className = tablinks[i].className.replace(_activeStr, "");
	    }

	    document.getElementById(tabName).style.display = _blockStr;
	    evt.currentTarget.className += _activeStr;
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
    

    




























