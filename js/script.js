
function start(){

	var debug =  document.getElementById("debug");
	var debug_1 =  document.getElementById("debug_1");
	var debug_2 =  document.getElementById("debug_2");
	var debug_3 =  document.getElementById("debug_3");
	var debug_4 =  document.getElementById("debug_4");
	var debug_5 =  document.getElementById("debug_5");
	var debug_6 =  document.getElementById("debug_6");
	var debug_7 =  document.getElementById("debug_7");
	var debug_8 =  document.getElementById("debug_8");
	var debug_9 =  document.getElementById("debug_9");
	var debug_10 =  document.getElementById("debug_10");
	
	
	
	arraytest();
	clock();
	
}

function create_field(id_nummer) {
  return {
	 "id":"field_"+id_nummer,
	 "data":{
		"preis":id_nummer*100,
		"fruit":{
			"preis":0,
			"wert":0,
			"id":"none"
		}
	 }
	};
};

var alle_felder = document.getElementsByClassName("field");
var selected_field = "none";

var clock_value = 0,
    gold = 100;

var test = 0;


function arraytest(){
	for(var i =0;i<=9;i++){
		var id_nummer = fields.length;
		fields.push(create_field(id_nummer));
	}
}

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
	
	for(var i = 0; i< alle_felder.length; i++){
		alle_felder[i].classList.remove("selected");
	}
	
	field.classList.add("selected");
	for(var i = 0; i< alle_felder.length; i++){
		if(alle_felder[i].classList.contains("selected") == true){
			test = i;
		}
	}
	
	debug.value = fields[test].id;
	debug_1.value = fields[test].id;
	debug_3.value = fields[test].data.preis;	
}

function kaufen(){
	document.getElementById(selected_field).classList.add("gekauft");
}

function show_values(){
	//zeigt alle werte 
	document.getElementById("clock_value").value = clock_value;
	document.getElementById("gold").value = gold;
}

