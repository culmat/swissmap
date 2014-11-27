var query = decodeURIComponent(window.location.href.split('?')[1])
console.log(query)

function loadFeature(res){
		console.log(res)
		$.ajax({
			url : "https://api3.geo.admin.ch/rest/services/api/MapServer/"+res.layerBodId+"/"+res.featureId,
			jsonp : "callback",
			dataType : "jsonp",
			success : function(response) {
				console.log(response.feature.geometry);
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

