
function start(){
	
	
	arraytest();
	clock();
	
}

function create_field(id_nummer) {
  return {
	 "id":"field_"+id_nummer,
	 "data":{
		"preis":id_nummer*100,
		"fruit":{
			"preis":123,
			"wert":12,
			"id":"dick"
		}
	 }
	};
};

var alle_felder = document.getElementsByClassName("field");
var selected_field = "none";
var selected_field_array_index = 0;

var clock_value = 0,
    gold = 1000;

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
	
	for(var i = 0; i < alle_felder.length; i++){
		alle_felder[i].classList.remove("selected");
		
	}
	field.classList.add("selected");
	selected_field = field.id;
	
	for(var i = 0; i< alle_felder.length; i++){
		if(alle_felder[i].classList.contains("selected") == true){
			selected_field_array_index = i;
		}
	}
	

	//zeigtr alle values
	show_values();
	
}

function kaufen(){
	if(gold >= fields[selected_field_array_index].data.preis){
		gold = gold-fields[selected_field_array_index].data.preis;
		document.getElementById(selected_field).classList.remove("locked");
		document.getElementById(selected_field).classList.add("gekauft");
	}
	
}

function show_values(){
	//zeigt alle werte 
	document.getElementById("clock_value").value = clock_value;
	document.getElementById("gold").value = gold;
	document.getElementById("array_index").value = selected_field_array_index;
	document.getElementById("preis").value = fields[selected_field_array_index].data.preis;
	
	fruit_2();
}


function swag(){
	zeile = document.getElementById("test");
	
	if(zeile.classList.contains("hide") == true){
		zeile.classList.remove("hide");
	}else{
		zeile.classList.add("hide");
	}
	
}

function swag_2(){
	zeile = document.getElementById("test_2");
	
	if(zeile.classList.contains("hide") == true){
		zeile.classList.remove("hide");
	}else{
		zeile.classList.add("hide");
	}
	
}

function change_function(){
	document.getElementById("button").setAttribute("onclick","swag_2()");
}


function fruit_2(){
	document.getElementById("fruit_id").value = salat.id;
	document.getElementById("fruit_preis").value = salat.preis;
	document.getElementById("fruit_wert").value = salat.wert;
	
	document.getElementById("ffruit_id").value = fields[selected_field_array_index].data.fruit.id;
	document.getElementById("ffruit_preis").value = fields[selected_field_array_index].data.fruit.preis;
	document.getElementById("ffruit_wert").value = fields[selected_field_array_index].data.fruit.wert;
}

function pflanze_salat(){
	fields[selected_field_array_index].data.fruit.id = fruit.salat.id;
	fields[selected_field_array_index].data.fruit.preis = fruit.salat.preis;
	fields[selected_field_array_index].data.fruit.wert = fruit.salat.wert;
	fruit_2();
}

function pflanze_mohre(){
	fields[selected_field_array_index].data.fruit.id = fruit.mohre.id;
	fields[selected_field_array_index].data.fruit.preis = fruit.mohre.preis;
	fields[selected_field_array_index].data.fruit.wert = fruit.mohre.wert;
	fruit_2();
}



