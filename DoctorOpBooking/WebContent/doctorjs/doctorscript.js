/**
 *Doctor-> Add slot  
 * After doctor login,Add his availablity.
 */
addSlot=()=>{
	debugger;
	const demail = document.getElementById('demail').value;
    const date=document.getElementById('date').value; 
    const time = document.getElementById('time').value; 
    const specialist = document.getElementById('specialist').value;

    if(demail ==='' ||demail===null){
    	alert('Email Id Cannot Be Null');
    	return false;
    }
    if(date==='' || date===null){
    	alert('Please Select /Enter Date');
    	return false;
    }
    if(time===''|| time===null){
    	alert('Please Enter Time');
    	return false;
    }
    if(specialist==='' || specialist===null){
    	alert('Please Enter Specialist');
    	return false;
    }
    
    /**
     *  Enahance Object
     */
    let obj = {demail, date, time, specialist};
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
                reject('Slot Not Added ! Error Response Code: ' + this.status)
            } else {
            alert('Slot Added Successfully');
            window.location.assign('doctorHome.html');
        }
    }
    }
    const url='http://localhost:3000/slots';
    httpReq.open('POST',url , true);
    httpReq.setRequestHeader('Content-type','application/json');
    httpReq.send(JSON.stringify(obj));
    });
}

/**
 * Display list of Appoitment booked patient -Doctor
 * This Appoitment list display to the doctor which are patients booked his Appointment
 */
appointmentList=()=>{
	let httpRequest;
	    if (window.XMLHttpRequest) {
	        httpRequest = new XMLHttpRequest()
	    } else {
	        httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
	    }
	    return new Promise(function (resolve, reject) {
	    httpRequest.onreadystatechange = function () {
	    	if (this.readyState === 4) {
              if (this.status != 200) {
                  reject('Appoitment Data Not Found ! Error Response Code:  ' + this.status)
              } else {

	            const tableEl = document.getElementsByTagName('table');
	            if (tableEl[0] != undefined) {
	                tableEl[0].remove()
	            }
		let body = document.getElementsByTagName('body')[0];
		let table = document.createElement('table');
		table.setAttribute('id', 'tab01');
	    let tbody = document.createElement('tbody');
	    let thead = document.createElement('thead');
	    let headTr = document.createElement('tr');
	    let headTd1 = document.createElement('td');
	    let headTd1text = document.createTextNode ('Id');
	    headTd1.appendChild(headTd1text);
	    let headTd2 = document.createElement('td');
	    let headTd2text = document.createTextNode ('Doctor Email Id');
	    headTd2.appendChild(headTd2text);
	    let headTd3 = document.createElement('td');
	    let headTd3text = document.createTextNode('Date');
	    headTd3.appendChild(headTd3text);
	    let headTd4 = document.createElement('td');
	    let headTd4text = document.createTextNode('Time');
	    headTd4.appendChild(headTd4text);
	    let headTd5 = document.createElement('td');
	    let headTd5text = document.createTextNode('Specialist');
	    headTd5.appendChild(headTd5text);
	    let headTd6 = document.createElement('td');
	    let headTd6text = document.createTextNode ('patient Email Id');
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
	    	let i;
	    	for(i=0; i<len;i++){
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
	        let data = document.createElement('h4');
	        let noData = document.createTextNode('No Data Found')
	        data.appendChild(noData);
	        tbody.appendChild(data);
	    }
	    table.appendChild(thead);
	    table.appendChild(tbody);
	    body.appendChild(table);
 }
 }
	 }
	const url='http://localhost:3000/appointment';
	httpRequest.open('GET',url , true);
	httpRequest.send();
});
}

