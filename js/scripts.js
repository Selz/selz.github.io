

// as the page loads, call these scripts
jQuery(document).ready(function($) {
	var $body = $("body"),
		$html = $("html");

	// Sharing buttons
	// Map classes and actions for "custom" networks
	// Default is "Share"
	var className = {
		"googlePlus":	"google"
	};
	var action = {
		"googlePlus":	"+1",
		"twitter":		"Tweet",
		"pinterest":	"Pin it"
	};
		
	// Replace js fallbacks with the proper real deal pimped ones
	$("[data-share-network]").each(function () { 
		var $this = $(this), 
			$container = $this.parents("[data-share-url]"),
			network = $(this).data("share-network"),
			url = $container.data("share-url"),
			text = $container.data("share-text"),
			image = $container.data("share-image"),
			twitterId = $container.data("twitter-id"),
			share = {},
			cssClass = (network in className ? className[network] : network),
			actionVerb = (network in action ? action[network] : "Share");
		
		// Set the network to share to
		share[network] = true;
					
		$this.sharer({
			share: share,
			template: "<button type='button' class='btn btn-" + cssClass + " btn-small'><span class='icon-social-" + cssClass + "' aria-hidden='true'></span>" + actionVerb + "</button>" + (network !== "googlePlus" ? "<span class='btn-count'>{total}</span>" : ""),
			buttons: { 
				twitter: { 
					via: twitterId
				},
				pinterest: { 
					description: text.replace(/#/g,"%23"), 
					media: image
				}
			},
			enableCounter: (network === "googlePlus" ? false : true),
			url: url,
			text: text,
			enableHover: false,
			enableTracking: true, 
			//urlCurl: "", // TODO: We need to create a script to act as a proxy to get counts
			click: function(api) {
				api.simulateClick(); // Adds one to the count
				api.openPopup(network);
			}
		});
	});
 
}); /* end of as page load scripts */

