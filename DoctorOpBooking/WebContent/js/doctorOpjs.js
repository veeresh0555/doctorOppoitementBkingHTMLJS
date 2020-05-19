//User Registration
function addUser() {
	debugger;
	let role = document.getElementById("role").value;
    let fullName=document.getElementById("fullname").value; 
    let email = document.getElementById("email").value; 
    let mobileNo = document.getElementById("mobileno").value;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let pattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    
    let password = Math.random().toString(36).slice(-8);
    console.log(password);
   
    if (role === "-1") {
    	alert("Please Select Role");
    	name.focus();
    	return false;
    }
    if (fullName === "") {
    	window.alert("Please Enter Full Name");
    	fullName.focus();
    	return false;
    }
    if (email === "" || !email.match(mailformat) || !email.match(pattern)) {
    	alert("Please Enter a valid Mail Address(ex: abc@dbs.com (or) abc@hcl.com )");
    	email.focus();
    	return false;
    }
    
    if (mobileNo === "" || mobileNo.length !=10) {
    	alert("Please Enter a valid Mobile Number");
    	mobileNo.focus();
    	return false;
    }
    
    let obj = {fullname : fullName, email : email, password:password, mobileno:mobileNo, role:role};
    console.log(obj);
    let httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
        httpReq = new ActiveXObject("")
    }
    httpReq.onreadystatechange = function() {
        if(this.readyState ===4 && this.status === 201){ 
            console.log("response: "+this.response);
            alert("User Register Successfully! Password :"+password);
            window.location.assign("index.html");
        }
    }
    httpReq.open('post', 'http://localhost:3000/users', true);
    httpReq.setRequestHeader("Content-type","application/json");
    httpReq.send(JSON.stringify(obj));
}

//User Login
function userLogin(){
	
	debugger;
	let emailId = document.getElementById("emailid").value;
	let password = document.getElementById("pass").value;
	let role = document.getElementById("urole").value;
	 
	let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let pattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
	 
	if (emailId === "" || !emailId.match(mailformat) || !emailId.match(pattern)) {
	 alert("Please Enter Valid Mail Address");
	 emailId.focus();
	 return false;
	}
	else if (password === "") {
	alert("Please Enter Valid Password");
	password.focus();
	return false;
	}
	else if (role === "-1") {
	alert("Please Enter Valid Role");
	role.focus();
	return false;
	}
	
	debugger;
	let httpRequest;
	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	} else {
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	httpRequest.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			debugger;
			let data = JSON.parse(this.response);
			
			debugger;
			let len = data.length;
			if (len > 0) {
				let role = data[0].role;
				console.log(role);
				if (role === 'patient') {
					window.location.assign("PatientHome.html");
				} else if (role === 'doctor') {
					window.location.assign("DoctorHome.html");
				} else {
					alert("Invalid Role Type");
				}
			debugger;
			let uname=data[0].uname;
			console.log("Stringify: "+JSON.stringify(this.response));
			console.log("JSONParse: "+JSON.parse(JSON.stringify(this.response)));
			sessionStorage.setItem('email', emailId);
			sessionStorage.setItem('uname', uname);
			console.log("Before redirecting url");
	    } else {
	      alert("Invalid Credentials");
	    }
	    }
	    }
	var url = "http://localhost:3000/users?email="+emailId+"&password="+password+"&role="+role;
	console.log(url);
	httpRequest.open("GET", url, true);
	httpRequest.send();	
}

//Available Slots for patient
function availableSlots(){
	 let httpRequest;
	    if (window.XMLHttpRequest) {
	        httpRequest = new XMLHttpRequest()
	    } else {
	        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    httpRequest.onreadystatechange = function () {
	        if (this.readyState === 4 && this.status === 200) {

	            let tableEl = document.getElementsByTagName('table');
	            if (tableEl[0] !== undefined) {
	                tableEl[0].remove()
	            }
		let body = document.getElementsByTagName('body')[0];
		let table = document.createElement('table');
		table.setAttribute("id", "tab01");
		
	    let tbody = document.createElement('tbody');
	    let thead = document.createElement('thead');
	    let headTr = document.createElement('tr');
	    
	    
	    let headTd1 = document.createElement('td');
	    let headTd1text = document.createTextNode ("Id");
	    headTd1.appendChild(headTd1text);
	    
	    let headTd2 = document.createElement('td');
	    let headTd2text = document.createTextNode ("Doctor Mail Id");
	    headTd2.appendChild(headTd2text);
	    
	    let headTd3 = document.createElement('td');
	    let headTd3text = document.createTextNode("Date");
	    headTd3.appendChild(headTd3text);

	    let headTd4 = document.createElement('td');
	    let headTd4text = document.createTextNode("Time");
	    headTd4.appendChild(headTd4text);
	    
	    let headTd5 = document.createElement('td');
	    let headTd5text = document.createTextNode("Specialist");
	    headTd5.appendChild(headTd5text);
	    
	    
	    let headTd6 = document.createElement('td');
	    let headTd6text = document.createTextNode ("Action");
	    headTd6.appendChild(headTd6text);

	    headTr.appendChild(headTd1);
	    headTr.appendChild(headTd2);
	    headTr.appendChild(headTd3);
	    headTr.appendChild(headTd4);
	    headTr.appendChild(headTd5);
	    headTr.appendChild(headTd6);
	    
	    thead.appendChild(headTr);
	    
	    let data = JSON.parse(this.response);
	    let len = data.length;
	    
	    if(len > 0 ){
	    for(var i=0; i<len;i++){
	        let tbodyTr = document.createElement('tr');

	        let td1 = document.createElement('td');
	        let td1Text = document.createTextNode(data[i].id);
	        td1.appendChild(td1Text);

	        let td2 = document.createElement('td');
	        let td2Text = document.createTextNode(data[i].demail);
	        td2.appendChild(td2Text);

	        let td3 = document.createElement('td');
	        let td3Text = document.createTextNode(data[i].date);
	        td3.appendChild(td3Text);
	        
	        let td4 = document.createElement('td');
	        let td4Text = document.createTextNode(data[i].time);
	        td4.appendChild(td4Text);

	        let td5 = document.createElement('td');
	        let td5Text = document.createTextNode(data[i].specialist);
	        td5.appendChild(td5Text);
	        //BookAppointment
	        let td6=document.createElement('td');
	        let bt1=document.createElement('button');
	        bt1.setAttribute("class", "ubutton");
	        let bt1txt=document.createTextNode("Book Slot");
	        bt1.addEventListener("click",function(){
	        	alert("SlotBooking");
	        	debugger;
	        	let useremail=JSON.parse(JSON.stringify(sessionStorage.getItem("email")));
	        	let data=this.parentElement.parentElement.cells;
	        	console.log("data: "+data[0].innerHTML+" "+data[1].innerHTML+"  "+data[2].innerHTML+" "+data[3].innerHTML+" "+data[4].innerHTML);
	        	let obj={demail:data[1].innerHTML ,date:data[2].innerHTML,time: data[3].innerHTML,specialist: data[4].innerHTML,pemail: useremail };
	        	console.log("Object: "+obj);
	        	 let httpReq;
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
	        let data = document.createElement("h4");
	        let noData = document.createTextNode("No data Found")
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
	 let httpRequest;
	    if (window.XMLHttpRequest) {
	        httpRequest = new XMLHttpRequest()
	    } else {
	        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    httpRequest.onreadystatechange = function () {
	        if (this.readyState === 4 && this.status === 200) {

	            let tableEl = document.getElementsByTagName('table');
	            if (tableEl[0] != undefined) {
	                tableEl[0].remove()
	            }
		let body = document.getElementsByTagName('body')[0];
		let table = document.createElement('table');
		table.setAttribute("id", "tab01");
		
	    let tbody = document.createElement('tbody');
	    let thead = document.createElement('thead');
	    let headTr = document.createElement('tr');
	    
	    let headTd1 = document.createElement('td');
	    let headTd1text = document.createTextNode ("Id");
	    headTd1.appendChild(headTd1text);
	    
	    let headTd2 = document.createElement('td');
	    let headTd2text = document.createTextNode ("Doctor Email Id");
	    headTd2.appendChild(headTd2text);
	    
	    let headTd3 = document.createElement('td');
	    let headTd3text = document.createTextNode("Date");
	    headTd3.appendChild(headTd3text);

	    let headTd4 = document.createElement('td');
	    let headTd4text = document.createTextNode("Time");
	    headTd4.appendChild(headTd4text);
	    
	    let headTd5 = document.createElement('td');
	    let headTd5text = document.createTextNode("Specialist");
	    headTd5.appendChild(headTd5text);
	    
	    
	    let headTd6 = document.createElement('td');
	    let headTd6text = document.createTextNode ("patient Email Id");
	    headTd6.appendChild(headTd6text);

	    headTr.appendChild(headTd1);
	    headTr.appendChild(headTd2);
	    headTr.appendChild(headTd3);
	    headTr.appendChild(headTd4);
	    headTr.appendChild(headTd5);
	    headTr.appendChild(headTd6);
	    thead.appendChild(headTr);
	    
	    let data = JSON.parse(this.response);
	    let len = data.length;
	    
	    if(len > 0 ){
	    for(var i=0; i<len;i++){
	        let tbodyTr = document.createElement('tr');

	        let td1 = document.createElement('td');
	        let td1Text = document.createTextNode(data[i].id);
	        td1.appendChild(td1Text);

	        let td2 = document.createElement('td');
	        let td2Text = document.createTextNode(data[i].demail);
	        td2.appendChild(td2Text);

	        let td3 = document.createElement('td');
	        let td3Text = document.createTextNode(data[i].date);
	        td3.appendChild(td3Text);
	        
	        let td4 = document.createElement('td');
	        let td4Text = document.createTextNode(data[i].time);
	        td4.appendChild(td4Text);

	        let td5 = document.createElement('td');
	        let td5Text = document.createTextNode(data[i].specialist);
	        td5.appendChild(td5Text);
	        
	        let td6 = document.createElement('td');
	        let td6Text = document.createTextNode(data[i].pemail);
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
	        let data = document.createElement("h4");
	        let noData = document.createTextNode("No data Found")
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
//Doctor-> Add slot 
function addSlot(){
	debugger;
	let demail = document.getElementById("demail").value;
    let date=document.getElementById("date").value; 
    let time = document.getElementById("time").value; 
    let specialist = document.getElementById("specialist").value;

    if(demail ==='' ||demail===null){
    	alert("Email Id Cannot Be Null");
    	return false;
    }
    if(date==='' || date===null){
    	alert("Please Select /Enter Date");
    	return false;
    }
    if(time===''|| time===null){
    	alert("Please Enter Time");
    	return false;
    }
    if(specialist==='' || specialist===null){
    	alert("Please Enter Specialist");
    	return false;
    }
    
    let obj = {demail : demail, date : date, time:time, specialist:specialist};
    console.log(obj);
    let httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
        httpReq = new ActiveXObject("")
    }
    httpReq.onreadystatechange = function() {
        if(this.readyState ===4 && this.status === 201){ 
            alert("Slot Added Successfully");
            window.location.assign("DoctorHome.html");
        }
    }
    httpReq.open('POST', 'http://localhost:3000/slots', true);
    httpReq.setRequestHeader("Content-type","application/json");
    httpReq.send(JSON.stringify(obj));
}

//Patient->List of Appointements
function myAppoitement(){

	 let httpRequest;
	    if (window.XMLHttpRequest) {
	        httpRequest = new XMLHttpRequest()
	    } else {
	        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    httpRequest.onreadystatechange = function () {
	        if (this.readyState ===4 && this.status === 200) {

	            let tableEl = document.getElementsByTagName('table');
	            if (tableEl[0] != undefined) {
	                tableEl[0].remove()
	            }
		let body = document.getElementsByTagName('body')[0];
		let table = document.createElement('table');
		table.setAttribute("id", "tab01");
		
	    let tbody = document.createElement('tbody');
	    let thead = document.createElement('thead');
	    let headTr = document.createElement('tr');
	    
	    let headTd1 = document.createElement('td');
	    let headTd1text = document.createTextNode ("Id");
	    headTd1.appendChild(headTd1text);
	    
	    let headTd2 = document.createElement('td');
	    let headTd2text = document.createTextNode ("Doctor Email Id");
	    headTd2.appendChild(headTd2text);
	    
	    let headTd3 = document.createElement('td');
	    let headTd3text = document.createTextNode("Date");
	    headTd3.appendChild(headTd3text);

	    let headTd4 = document.createElement('td');
	    let headTd4text = document.createTextNode("Time");
	    headTd4.appendChild(headTd4text);
	    
	    let headTd5 = document.createElement('td');
	    let headTd5text = document.createTextNode("Specialist");
	    headTd5.appendChild(headTd5text);
	    
	    
	    let headTd6 = document.createElement('td');
	    let headTd6text = document.createTextNode ("patient Email Id");
	    headTd6.appendChild(headTd6text);

	    headTr.appendChild(headTd1);
	    headTr.appendChild(headTd2);
	    headTr.appendChild(headTd3);
	    headTr.appendChild(headTd4);
	    headTr.appendChild(headTd5);
	    headTr.appendChild(headTd6);
	    thead.appendChild(headTr);
	    
	    let data = JSON.parse(this.response);
	    let len = data.length;
	    
	    if(len > 0 ){
	    for(var i=0; i<len;i++){
	        let tbodyTr = document.createElement('tr');

	        let td1 = document.createElement('td');
	        let td1Text = document.createTextNode(data[i].id);
	        td1.appendChild(td1Text);

	        let td2 = document.createElement('td');
	        let td2Text = document.createTextNode(data[i].demail);
	        td2.appendChild(td2Text);

	        let td3 = document.createElement('td');
	        let td3Text = document.createTextNode(data[i].date);
	        td3.appendChild(td3Text);
	        
	        let td4 = document.createElement('td');
	        let td4Text = document.createTextNode(data[i].time);
	        td4.appendChild(td4Text);

	        let td5 = document.createElement('td');
	        let td5Text = document.createTextNode(data[i].specialist);
	        td5.appendChild(td5Text);
	        
	        let td6 = document.createElement('td');
	        let td6Text = document.createTextNode(data[i].pemail);
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
	        let data = document.createElement("h4");
	        let noData = document.createTextNode("No data Found")
	        data.appendChild(noData);
	        tbody.appendChild(data);
	    }
	    table.appendChild(thead);
	    table.appendChild(tbody);
	    body.appendChild(table);
  }
  }
	    debugger;
	const pmailid=JSON.parse(JSON.stringify(sessionStorage.getItem("email")));
	alert("Pmail-Id: "+pmailid);
	console.log("patient Mail Id:  "+pmailid);
	httpRequest.open("get", "http://localhost:3000/appointment?pemail="+pmailid, true);
	httpRequest.send();
	}

//Logout
function logout(){
	sessionStorage.clear();
	alert("Your Successfully Logout");
	window.location.assign("index.html");
}