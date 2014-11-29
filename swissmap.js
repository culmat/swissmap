var query = decodeURIComponent(window.location.href.split('?')[1])
if(query == 'undefined') {
	location.href= location.href + '?lerchenstrasse 79 4059 basel 2701 basel ch bs'	
}

function loadFeature(res){
		console.log(res)
		$.ajax({
			url : "https://api3.geo.admin.ch/rest/services/api/MapServer/"+res.layerBodId+"/"+res.featureId,
			jsonp : "callback",
			dataType : "jsonp",
			success : function(response) {
				var geom = response.feature.geometry;
				console.log(geom);
				var wgs = CH2WGS(geom.y,geom.x,0)
				console.log(wgs)
				var coords = [wgs.B, wgs.L]
				map.setView(coords, 15);
				console.log(res.label)
				L.marker(coords).addTo(map)
				.bindPopup(res.label).openPopup();
			}
		});	
}



$(function() {
	
	$.ajax({
		url : "http://api3.geo.admin.ch/rest/services/api/SearchServer",
		jsonp : "callback",
		dataType : "jsonp",
		data : {
			searchText : query,
			origins : "address",
			type : "locations"
		},
		success : function(response) {
			loadFeature(response.results[0].attrs);
		}
	});
	
});

