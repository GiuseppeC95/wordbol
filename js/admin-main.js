jQuery(function($) {
	runStanbol($);
});

function init($) {
	maps.initialize();
	maps.geocode(places);
	$("#wordpress-stanbol-entities > label > div").each(function(i, el) {
		$(el).knubtip("init", {
			'wait-time': 400,
			'info-class': '.wordpress-stanbol-entities-info'
		});
	});
	$(".place_location").click(function(e) {
		var $el = $(e.currentTarget);
		// we have to invert the checked status because the click is executed before the change
		var checked = !$el.parent().prev().prop('checked');
		var resource = $el.data("location");
		placesLocations.forEach(function(el) {
			if (el.resource === resource)
				el.selected = checked;
		});
		maps.configureMapWithPlaces(placesLocations);
	});
}

function runStanbol($) {
	window.setTimeout(function() {
		$.ajax({
			url: ajaxurl,
			data: {
				post_id: POST_ID,
				action: "run_stanbol"
			},
			success: function (data) {
				$("#stanbol_content").html(data);
				init($);
			}
		});
	}, 100);
}
