function start(){

	var debug =  document.getElementById("debug");
	var debug_1 =  document.getElementById("debug_1");
	var debug_2 =  document.getElementById("debug_2");
	var debug_3 =  document.getElementById("debug_3");
	var debug_4 =  document.getElementById("debug_4");
	
	clock();
	
	
	
}

var fields = document.getElementsByClassName("field");
var selected_field = "none";

var clock_value = 0,
    gold = 100;
	
	
function clock(){
	setTimeout(function(){
		//zählt clock hoch
		clock_value++;
		//zeigtr alle values
		show_values();
		//endless loop
		clock();
	
	},1000);
}

function field_select(field){
	
	for(var i = 0; i< fields.length; i++){
		fields[i].classList.remove("selected");
	}
	field.classList.add("selected");
	selected_field = field.id;
	
	debug.value = field.id;
	debug_1.value = selected_field;
	debug_3.value = getjson(field).preis;
	
	
	
	
}

function getjson(field){
	
	var output = "none";
	if(field.id == "field_0"){
		output = field_0;
	}else if(field.id =="field_1"){
		output = field_1;
	}else if(field.id =="field_2"){
		output = field_2;
	}else if(field.id =="field_3"){
		output = field_3;
	}else if(field.id =="field_4"){
		output = field_4;
	}else if(field.id =="field_5"){
		output = field_5;
	}else if(field.id =="field_6"){
		output = field_6;
	}else if(field.id =="field_7"){
		output = field_7;
	}else if(field.id =="field_8"){
		output = field_8;
	}
	
	return output;
}

function kaufen(){
	document.getElementById(selected_field).classList.add("gekauft");
}

function show_values(){
	//zeigt alle werte 
	document.getElementById("clock_value").value = clock_value;
	document.getElementById("gold").value = gold;
}

