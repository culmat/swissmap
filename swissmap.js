
function loadFeature(query){
	    console.log(query)
		$.ajax({
			url : "http://nominatim.openstreetmap.org/search/"+query+"?format=json",
			jsonp : "json_callback",
			dataType : "jsonp",
			success : function(response) {
				console.log(response);
				var geom = response[0];
				console.log(geom)
				var coords = [geom.lat, geom.lon]
				map.setView(coords, 15);
				L.marker(coords).addTo(map)
				.bindPopup(geom.display_name).openPopup();
			}
		});	
}


$(function() {
	var query = decodeURIComponent(window.location.href.split('?')[1])
	if(query == 'undefined') {
		location.href= location.href + '?lerchenstrasse 79 basel'	
	}
	console.log("bonjour thomas")
	loadFeature(query);
	
});

