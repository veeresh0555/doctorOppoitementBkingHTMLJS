//User Registration
addUser=()=> {
	debugger;
	let role = document.getElementById('role').value;
    let fullName=document.getElementById('fullname').value; 
    let email = document.getElementById('email').value; 
    let mobileNo = document.getElementById('mobileno').value;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let pattern = '[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)';
    let password = Math.random().toString(36).slice(-8);
    console.log(password);
    if (role === '-1') {
    	alert('Please Select Role');
    	name.focus();
    	return false;
    }
    if (fullName === '') {
    	window.alert('Please Enter Full Name');
    	fullName.focus();
    	return false;
    }
    if (email === '' || !email.match(mailformat) || !email.match(pattern)) {
    	alert('Please Enter a valid Mail Address(ex: abc@dbs.com (or) abc@hcl.com )');
    	email.focus();
    	return false;
    }
    
    if (mobileNo === '' || mobileNo.length !=10) {
    	alert('Please Enter a valid Mobile Number');
    	mobileNo.focus();
    	return false;
    }
    
	//let obj = {fullname : fullName, email : email, password:password, mobileno:mobileNo, role:role};
	let obj = {fullName,email,password, mobileNo, role};
    console.log(obj);
    let httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
    	httpReq = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return new Promise(function (resolve, reject) {
    httpReq.onreadystatechange = function() {
    	if (this.readyState === 4) {
            if (this.status != 201) {
                reject(`User Registration Failed! Error Response Code: ${this.status}`);
            } else {
            console.log('response: '+this.response);
            resolve(`User Register Successfully! Password :${password}`);
            window.location.assign('index.html');
        }
    	}
    }
    
    const url='http://localhost:3000/users';
    
    httpReq.open('POST',url , true);
    httpReq.setRequestHeader('Content-type','application/json');
    httpReq.send(JSON.stringify(obj));
    });
}

//User Login:User can able to login his valid credentials [email id ,password and role->doctor/patient]
userLogin=()=>{
	debugger;
	let emailId = document.getElementById('emailid').value;
	let password = document.getElementById('pass').value;
	let role = document.getElementById('urole').value;
	let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let pattern = '[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)';
	 
	if (emailId === '' || !emailId.match(mailformat) || !emailId.match(pattern)) {
	 alert('Please Enter Valid Mail Address');
	 emailId.focus();
	 return false;
	}
	else if (password === '') {
	alert('Please Enter Valid Password');
	password.focus();
	return false;
	}
	else if (role === '-1') {
	alert('Please Enter Valid Role');
	role.focus();
	return false;
	}
	debugger;
	let httpRequest;
	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	} else {
		httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
	}
	return new Promise(function (resolve, reject) {
	httpRequest.onreadystatechange = function() {
		if (this.readyState === 4 ) { //&& this.status === 200
			 if (this.status != 200) {
                 reject(` Login Failed! Response Code: ${this.status}`);
             } else {
			debugger;
			let data = JSON.parse(this.response);
			debugger;
			let len = data.length;
			if (len > 0) {
				let role = data[0].role;
				console.log(role);
				if (role === 'patient') {
					window.location.assign('patientHome.html');
				} else if (role === 'doctor') {
					window.location.assign('doctorHome.html');
				} else {
					alert('Invalid Role Type');
				}
			debugger;
			let uname=data[0].uname;
			console.log('Stringify: '+JSON.stringify(this.response));
			console.log('JSONParse: '+JSON.parse(JSON.stringify(this.response)));
			sessionStorage.setItem('email', emailId);
			sessionStorage.setItem('uname', uname);
			console.log('Before redirecting url');
	    } else {
	      alert('Invalid Credentials');
	    }
	    }
	    }
	}
	//var url = 'http://localhost:3000/users?email='+emailId+'&password='+password+'&role='+role;
	const url = `http://localhost:3000/users?email=${emailId}&password=${password}&role=${role}`;
	console.log(url);
	httpRequest.open('GET', url, true);
	httpRequest.send();	
	});//promise end 
	
}


//Logout - > when user click on logout button user able to logout and clear session.
logout=()=>{
	sessionStorage.clear();
	alert('Your Successfully Logout');
	window.location.assign('index.html');
}