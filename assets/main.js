function initMap() {

	var laboratoriaChile = {lat: -33.418878299999996, lng: -70.64229580000001};

	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 18,
		center: laboratoriaChile
	});

	var markadorLaboratoria = new google.maps.Marker({
		position: laboratoriaChile,
		map: map
	});

	 function buscar(){
	 	if(navigator.geolocation) {
	 		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	 	}
	 };

	 var latitud,longitud;
	 var funcionExito = function(posicion) {
	 	latitud = posicion.coords.latitude;
	 	longitud = posicion.coords.longitude;
	 }; 

	 var miUbicacion = new google.maps.Marker({
	 	position: {lat:latitud, lng:longitud},
	 	map: map
	 });

	 map.setZoom(18);
	 map.setCenter({lat:latitud, lng:longitud});

	 var funcionError = function (error) {
	 	alert("Tenemos un problema con encontrar tu ubicacion");
	 };

	 document.getElementById("encuentrame").addEventListener("click",buscar);

	 var inputPartida = document.getElementById("punto-partida");
	 var inputDestino = document.getElementById("punto-destino");

	 new google.maps.places.Autocomplete(inputPartida);
	 new google.maps.places.Autocomplete(inputDestino);

	 var directionsService = new google.maps.DirectionsService;
	 var directionsDisplay = new google.maps.DirectionsRenderer;

	 var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
	 	directionsService.route({
	 		origin: inputPartida.value,
	 		destination: inputDestino.value,
	 		travelMode: 'DRIVING'
	 	}, function(response, status) {
	 	if (status === 'OK') {
	 	directionsDisplay.setDirections(response);
	 	} else {
	 	window.alert("No encontramos una ruta");

	 	}
	});
}

	 directionsDisplay.setMap(map);

	 var trazarRuta = function() {
	 	calculateAndDisplayRoute(directionsService, directionsDisplay);
	 };

	 document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);	


};//funcion init NO BORRAR
