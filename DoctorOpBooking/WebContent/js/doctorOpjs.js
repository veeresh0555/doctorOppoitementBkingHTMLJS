//User Registration

function addUser() {
	debugger;
	var role = document.getElementById("role").value;
    var fullName=document.getElementById("fullname").value; 
    var email = document.getElementById("email").value; 
    var mobileNo = document.getElementById("mobileno").value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var pattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    
    var password = Math.random().toString(36).slice(-8);
    console.log(password);
    
   
    if (role == "-1") {
    	alert("Please Enter Role");
    	name.focus();
    	return false;
    }
    if (fullName == "") {
    	window.alert("Please Enter Full Name");
    	fullName.focus();
    	return false;
    }
    if (email == "" || !email.match(mailformat) || !email.match(pattern)) {
    	alert("Please Enter a valid Mail Address");
    	email.focus();
    	return false;
    }
    
    if (mobileNo == "" || mobileNo.length !=10) {
    	alert("Please Enter a valid Mobile Number");
    	mobileNo.focus();
    	return false;
    }
    
    var obj = {fullname : fullName, email : email, password:password, mobileno:mobileNo, role:role};
    console.log(obj);
    var httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
        httpReq = new ActiveXObject("")
    }
    httpReq.onreadystatechange = function() {
        if(this.readyState ===4 && this.status === 201){ 
            console.log("response: "+this.response);
            alert("User Register Successfully!!!")
            window.location.assign("index.html");
        }
    }
    httpReq.open('post', 'http://localhost:3000/users', true);
    httpReq.setRequestHeader("Content-type","application/json");
    httpReq.send(JSON.stringify(obj));
}

function userLogin(){
	
	debugger;
	var emailId = document.getElementById("emailid").value;
	var password = document.getElementById("pass").value;
	var role = document.getElementById("urole").value;
	 
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var pattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
	 
	if (emailId == "" || !emailId.match(mailformat) || !emailId.match(pattern)) {
	 alert("Please Enter Valid Mail Address");
	 emailId.focus();
	 return false;
	}
	else if (password == "") {
	alert("Please Enter Valid Password");
	password.focus();
	return false;
	}
	else if (role == "-1") {
	alert("Please Enter Valid Role");
	role.focus();
	return false;
	}
	
	debugger;
	var httpRequest;
	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	} else {
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	httpRequest.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var data = JSON.parse(this.response);
			console.log("data: "+data);
			var role = data[0].role;
			console.log(role);
			debugger;
			var len = data.length;
			if (len > 0) {
				if (role == 'patient') {
					window.location.assign("PatientHome.html");
				} else if (role == 'doctor') {
					window.location.assign("DoctorHome.html");
				} else {
						 alert("Invalid Role Type");
					  }
		sessionStorage.setItem('email', emailId);
		console.log("Before redirecting url");
	    } else {
	      alert("Invalid User");
	    }
	    }
	    }
	var url = "http://localhost:3000/users?email="+emailId+"&password="+password+"&role="+role;
	console.log(url);
	httpRequest.open("get", url, true);
	httpRequest.send();	
}

//Available Slots for patient
function availableSlots(){
	 var httpRequest;
	    if (window.XMLHttpRequest) {
	        httpRequest = new XMLHttpRequest()
	    } else {
	        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    httpRequest.onreadystatechange = function () {
	        if (this.readyState === 4 && this.status == 200) {

	            var tableEl = document.getElementsByTagName('table');
	            if (tableEl[0] !== undefined) {
	                tableEl[0].remove()
	            }
		var body = document.getElementsByTagName('body')[0];
		var table = document.createElement('table');
		table.setAttribute("id", "tab01");
		
	    var tbody = document.createElement('tbody');
	    var thead = document.createElement('thead');
	    var headTr = document.createElement('tr');
	    
	    
	    var headTd1 = document.createElement('td');
	    var headTd1text = document.createTextNode ("Id");
	    headTd1.appendChild(headTd1text);
	    
	    var headTd2 = document.createElement('td');
	    var headTd2text = document.createTextNode ("Doctor Mail Id");
	    headTd2.appendChild(headTd2text);
	    
	    var headTd3 = document.createElement('td');
	    var headTd3text = document.createTextNode("Date");
	    headTd3.appendChild(headTd3text);

	    var headTd4 = document.createElement('td');
	    var headTd4text = document.createTextNode("Time");
	    headTd4.appendChild(headTd4text);
	    
	    var headTd5 = document.createElement('td');
	    var headTd5text = document.createTextNode("Specialist");
	    headTd5.appendChild(headTd5text);
	    
	    
	    var headTd6 = document.createElement('td');
	    var headTd6text = document.createTextNode ("Action");
	    headTd6.appendChild(headTd6text);

	    headTr.appendChild(headTd1);
	    headTr.appendChild(headTd2);
	    headTr.appendChild(headTd3);
	    headTr.appendChild(headTd4);
	    headTr.appendChild(headTd5);
	    headTr.appendChild(headTd6);
	    
	    thead.appendChild(headTr);
	    
	    var data = JSON.parse(this.response);
	    var len = data.length;
	    
	    if(len > 0 ){
	    for(var i=0; i<len;i++){
	        var tbodyTr = document.createElement('tr');

	        var td1 = document.createElement('td');
	        var td1Text = document.createTextNode(data[i].id);
	        td1.appendChild(td1Text);

	        var td2 = document.createElement('td');
	        var td2Text = document.createTextNode(data[i].demail);
	        td2.appendChild(td2Text);

	        var td3 = document.createElement('td');
	        var td3Text = document.createTextNode(data[i].date);
	        td3.appendChild(td3Text);
	        
	        var td4 = document.createElement('td');
	        var td4Text = document.createTextNode(data[i].time);
	        td4.appendChild(td4Text);

	        var td5 = document.createElement('td');
	        var td5Text = document.createTextNode(data[i].specialist);
	        td5.appendChild(td5Text);
	        //BookAppointment
	        var td6=document.createElement('td');
	        var bt1=document.createElement('button');
	        bt1.setAttribute("class", "ubutton");
	        var bt1txt=document.createTextNode("Book Slot");
	        bt1.addEventListener("click",function(){
	        	alert("SlotBooking");
	        	var useremail=JSON.parse(JSON.stringify(sessionStorage.getItem("email")));
	        	var data=this.parentElement.parentElement.cells;
	        	console.log("data: "+data[0].innerHTML+" "+data[1].innerHTML+"  "+data[2].innerHTML+" "+data[3].innerHTML+" "+data[4].innerHTML);
	        	var obj={demail:data[1].innerHTML ,date:data[2].innerHTML,time: data[3].innerHTML,specialist: data[4].innerHTML,pemail: useremail };
	        	console.log("Object: "+obj);
	        	 var httpReq;
	        	    if(window.XMLHttpRequest) {
	        	        httpReq = new XMLHttpRequest();
	        	    }
	        	    else{
	        	        httpReq = new ActiveXObject("");
	        	    }
	        	    httpReq.onreadystatechange = function() {
	        	        if(this.readyState ===4 && this.status === 201){ 
	        	            console.log("response: "+this.response);
	        	            alert("Your Appoitement placed Successfully! ");
	        	            window.location.assign("PatientAppoitements.html");
	        	        }
	        	    }
	        	    httpReq.open('post', 'http://localhost:3000/appointment', true);
	        	    httpReq.setRequestHeader("Content-type","application/json");
	        	    httpReq.send(JSON.stringify(obj));
	        	//window.location.assign("updateuser.html");
	        })
	        
	        bt1.appendChild(bt1txt);
	        td6.appendChild(bt1);
	        tbodyTr.appendChild(td1);
	        tbodyTr.appendChild(td2);
	        tbodyTr.appendChild(td3);
	        tbodyTr.appendChild(td4);
	        tbodyTr.appendChild(td5);
	        tbodyTr.appendChild(td6);
	        tbody.appendChild(tbodyTr); 
	    }
	    }
	    else{
	        var data = document.createElement("h4");
	        var noData = document.createTextNode("No data Found")
	        data.appendChild(noData);
	        tbody.appendChild(data);
	    }
	    table.appendChild(thead);
	    table.appendChild(tbody);
	    body.appendChild(table);
    }
    }
	    httpRequest.open("get", "http://localhost:3000/slots", true);
	    httpRequest.send();
	
}

//Display list of appointment booked patient -Doctor
function appointmentList(){
	 var httpRequest;
	    if (window.XMLHttpRequest) {
	        httpRequest = new XMLHttpRequest()
	    } else {
	        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    httpRequest.onreadystatechange = function () {
	        if (this.readyState === 4 && this.status == 200) {

	            var tableEl = document.getElementsByTagName('table');
	            if (tableEl[0] !== undefined) {
	                tableEl[0].remove()
	            }
		var body = document.getElementsByTagName('body')[0];
		var table = document.createElement('table');
		table.setAttribute("id", "tab01");
		
	    var tbody = document.createElement('tbody');
	    var thead = document.createElement('thead');
	    var headTr = document.createElement('tr');
	    
	    var headTd1 = document.createElement('td');
	    var headTd1text = document.createTextNode ("Id");
	    headTd1.appendChild(headTd1text);
	    
	    var headTd2 = document.createElement('td');
	    var headTd2text = document.createTextNode ("Demail");
	    headTd2.appendChild(headTd2text);
	    
	    var headTd3 = document.createElement('td');
	    var headTd3text = document.createTextNode("Date");
	    headTd3.appendChild(headTd3text);

	    var headTd4 = document.createElement('td');
	    var headTd4text = document.createTextNode("Time");
	    headTd4.appendChild(headTd4text);
	    
	    var headTd5 = document.createElement('td');
	    var headTd5text = document.createTextNode("Specialist");
	    headTd5.appendChild(headTd5text);
	    
	    
	    var headTd6 = document.createElement('td');
	    var headTd6text = document.createTextNode ("Pemail");
	    headTd6.appendChild(headTd6text);

	    headTr.appendChild(headTd1);
	    headTr.appendChild(headTd2);
	    headTr.appendChild(headTd3);
	    headTr.appendChild(headTd4);
	    headTr.appendChild(headTd5);
	    headTr.appendChild(headTd6);
	    thead.appendChild(headTr);
	    
	    var data = JSON.parse(this.response);
	    var len = data.length;
	    
	    if(len > 0 ){
	    for(var i=0; i<len;i++){
	        var tbodyTr = document.createElement('tr');

	        var td1 = document.createElement('td');
	        var td1Text = document.createTextNode(data[i].id);
	        td1.appendChild(td1Text);

	        var td2 = document.createElement('td');
	        var td2Text = document.createTextNode(data[i].demail);
	        td2.appendChild(td2Text);

	        var td3 = document.createElement('td');
	        var td3Text = document.createTextNode(data[i].date);
	        td3.appendChild(td3Text);
	        
	        var td4 = document.createElement('td');
	        var td4Text = document.createTextNode(data[i].time);
	        td4.appendChild(td4Text);

	        var td5 = document.createElement('td');
	        var td5Text = document.createTextNode(data[i].specialist);
	        td5.appendChild(td5Text);
	        
	        var td6 = document.createElement('td');
	        var td6Text = document.createTextNode(data[i].pemail);
	        td6.appendChild(td6Text);
	       
	        tbodyTr.appendChild(td1);
	        tbodyTr.appendChild(td2);
	        tbodyTr.appendChild(td3);
	        tbodyTr.appendChild(td4);
	        tbodyTr.appendChild(td5);
	        tbodyTr.appendChild(td6);
	        tbody.appendChild(tbodyTr); 
	    }
	    }
	    else{
	        var data = document.createElement("h4");
	        var noData = document.createTextNode("No data Found")
	        data.appendChild(noData);
	        tbody.appendChild(data);
	    }
	    table.appendChild(thead);
	    table.appendChild(tbody);
	    body.appendChild(table);
   }
   }
	httpRequest.open("get", "http://localhost:3000/appointment", true);
	httpRequest.send();
	

	
	
}