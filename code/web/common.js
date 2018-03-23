



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


function assureBizNature(expectedValue , actualValue){
    if (actualValue){// check if biz nature is defined
        if(actualValue != expectedValue){
            setBizNature(expectedValue);
        }
    }else {
        setBizNature(expectedValue);
    }
}



