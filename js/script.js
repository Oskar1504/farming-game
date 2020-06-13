
function start(){
	
	arraytest();
	clock();
}

function create_field(id_nummer) {
  return {
	 "id":"field_"+id_nummer,
	 "growstart":0,
	 "preis":id_nummer*100,
	 "fruit":{
		"preis":0,
		"wert":0,
		"id":"none",
		"growduration":5
	 }
	 
	};
};

var alle_felder = document.getElementsByClassName("field");
var selected_field = "field_0";
var selected_field_array_index = 0;

var alle_shop_button = document.getElementsByClassName("shop_button");
var selected_shop_item = "none";

var clock_value = 0,
    gold = 1000;



function arraytest(){
	for(var i =0;i<=9;i++){
		var id_nummer = fields.length;
		fields.push(create_field(id_nummer));
	}
}

function store(){
	localStorage.setItem('salat',JSON.stringify(salat));
}

function show(){
	
	ausgabe = JSON.parse(localStorage.getItem('salat'));
	
	console.log(ausgabe);
	console.log(ausgabe.wert);
	alert(ausgabe.id + " " +ausgabe.preis);
}

function clock(){
	setTimeout(function(){
		// checks if harvestable
		check_harvestable();
		//zählt clock hoch
		clock_value++;
		//zeigtr alle values
		show_values();
		//endless loop
		clock();
	
	},1000);
}

function check_harvestable(){
	for(var i = 0; i< alle_felder.length; i++){
		
		if( fields[i].growstart + fields[i].fruit.growduration <= clock_value){
			
			if(alle_felder[i].classList.contains("harvestable")==false&&fields[i].fruit.id != "none"){
			alle_felder[i].classList.add("harvestable");
			console.log(fields[i].id + " harvestable");
			
			}
		}
	}
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
	show_details();
}

function shop_select_item(item){
	
	for(var i = 0; i < alle_shop_button.length; i++){
		alle_shop_button[i].classList.remove("selected");
		
	}
	item.classList.add("selected");
	selected_shop_item = item.classList[1];
	shop_table_info();

}

function plant(){
	
	if(document.getElementById(selected_field).classList.contains("locked") == false&&fields[selected_field_array_index].fruit.id == "none"){
		
		//stores fruit values into select field storage
		fields[selected_field_array_index].fruit.id = jsonPathToValue(fruit, selected_shop_item +".id");
		fields[selected_field_array_index].fruit.preis = jsonPathToValue(fruit, selected_shop_item +".preis");
		fields[selected_field_array_index].fruit.wert = jsonPathToValue(fruit, selected_shop_item +".wert");
		fields[selected_field_array_index].fruit.growduration = jsonPathToValue(fruit, selected_shop_item +".growduration");
		// removes cost from gold
		if(gold >=fields[selected_field_array_index].fruit.preis){
			gold = gold-fields[selected_field_array_index].fruit.preis;
		}
		//stores clock_value
		fields[selected_field_array_index].growstart = clock_value;
		
	}else{
		alert("You cant plant on locked fields.\n Or on already planted Fields.");
	}
	show_details();
}

function kaufen(){

	if(gold >= fields[selected_field_array_index].preis && document.getElementById(selected_field).classList.contains("locked") ==true  ){
		gold = gold-fields[selected_field_array_index].preis;
		document.getElementById(selected_field).classList.remove("locked");
		document.getElementById(selected_field).classList.add("gekauft");
	}else{
		alert("Field is already your's.");
	}
	
}



function ernten(){
	if(document.getElementById(selected_field).classList.contains("harvestable") == true){
		//removes harvestable grafik
		document.getElementById(selected_field).classList.remove("harvestable");
		//adds gold
		gold = gold + fields[selected_field_array_index].fruit.wert;
		//resets fields fruit values
		fields[selected_field_array_index].fruit.id = "none";
		fields[selected_field_array_index].fruit.preis = 0;
		fields[selected_field_array_index].fruit.wert = 0;
		fields[selected_field_array_index].fruit.growduration = 0;
		show_details();
	}
}

function show_values(){
	//zeigt alle werte 
	document.getElementById("clock_value").value = clock_value;
	document.getElementById("gold").value = gold;
	document.getElementById("array_index").value = selected_field_array_index;
	document.getElementById("preis").value = fields[selected_field_array_index].preis;
	
}

function show_details(){
	if(document.getElementById("detail_checkbox").checked == true){
		document.getElementById("detail_field_id").value = fields[selected_field_array_index].id;
		document.getElementById("detail_field_preis").value = fields[selected_field_array_index].preis;
		document.getElementById("detail_field_fruit").value = fields[selected_field_array_index].fruit.id;
		document.getElementById("detail_field_growstart").value = fields[selected_field_array_index].growstart;
		
		document.getElementById("detail_fruit_id").value = fields[selected_field_array_index].fruit.id;
		document.getElementById("detail_fruit_preis").value = fields[selected_field_array_index].fruit.preis;
		document.getElementById("detail_fruit_wert").value = fields[selected_field_array_index].fruit.wert;
		document.getElementById("detail_fruit_growduration").value = fields[selected_field_array_index].fruit.growduration;
	}
}


function change_opasity(iziel){
	ziel = document.getElementById(iziel);
	if(ziel.classList.contains("hide") == true){
		ziel.classList.remove("hide");
	}else{
		ziel.classList.add("hide");
	}
	
}


function change_function(ziel){
	document.getElementById(ziel).setAttribute("onclick","debug(\"swag\")");
}

function debug(output){
	console.log(output);
}

function shop_table_info(){
	document.getElementById("shop_table_info").innerHTML = "Id:" + jsonPathToValue(fruit, selected_shop_item +".id") +"\n" +"Preis:"+jsonPathToValue(fruit, selected_shop_item +".preis")+"\n" +"Wert:"+jsonPathToValue(fruit, selected_shop_item +".wert")+"\n" +"Growduration:"+jsonPathToValue(fruit, selected_shop_item +".growduration");
}

function jsonPathToValue(jsonData, path) {
	//function created by George Siggouroglou https://stackoverflow.com/questions/8790607/javascript-json-get-path-to-given-subnode
    if (!(jsonData instanceof Object) || typeof (path) === "undefined") {
        throw "Not valid argument:jsonData:" + jsonData + ", path:" + path;
    }
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    var pathArray = path.split('.');
    for (var i = 0, n = pathArray.length; i < n; ++i) {
        var key = pathArray[i];
        if (key in jsonData) {
            if (jsonData[key] !== null) {
                jsonData = jsonData[key];
            } else {
                return null;
            }
        } else {
            return key;
        }
    }
    return jsonData;
}  
