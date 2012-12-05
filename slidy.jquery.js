/*
*	Slidy.jquery.js
*	Version 1.0.0
*	https://github.com/invmatt
*	Development release
*	TODO:
*	+ Auto scroll needs finishing
*	+ Paging needs finishing
*	+ Animate the scroll
*/

(function($) {
	$.slidy = function(selector, settings) {
		var config = {
			'auto': false, 				// WIP - Doesn't work
			'autoTime': "5000",
			'nav': false, 				// Show previous/next links
			'navPosition': "inside", // inside / outside
			'paging': false, 			// WIP - Doesn't work
			'items': '3', 				// How many items to show
			'scroll': '1'				// How many items to scroll by
		};

		if (settings) { $.extend(config, settings); }

		// Set some basic vars
		var obj = $(selector);
		var oSelf = this
			, oBtnPrev = 'slidy-prev'
			, oBtnNext = 'slidy-next'
			, oBtnGnrl = 'slidy-nav'
			, oItem = $("li", obj)
			, oUnitWidth = ($(obj).outerWidth() / config.items)
			, currentScroll = 0
			, count = 0
			, iCount = $(oItem).size()
			, oContainWidth = oUnitWidth * iCount
		;

		// Set item widths

		$(oItem).css('width', '' + oUnitWidth + 'px').addClass("slidy-item").parent().addClass("slidy-contain");
		$(oItem).parent().css('width', '' + oContainWidth + '');

		if (config.nav == true) {

			if (config.navPosition == "outside") {
				$(obj).parent().append('<a class="' + oBtnPrev + ' ' + oBtnGnrl + '">Previous</a><a class="' + oBtnNext + ' ' + oBtnGnrl + '">Next</a>');
			}

			if (config.navPosition == "inside") {
				$(obj).append('<a class="' + oBtnPrev + ' ' + oBtnGnrl + '">Previous</a><a class="' + oBtnNext + ' ' + oBtnGnrl + '">Next</a>');
			}

			$('.' + oBtnPrev + '').click(function() {
				var currentScroll = $(oItem).parent().css('left').replace('px', '');
				scrollAmount = parseFloat(currentScroll) + (oUnitWidth * config.scroll);
				//console.log('Prev: ' + scrollAmount);
				$(oItem).parent().css('left', scrollAmount + 'px');

			});

			$('.' + oBtnNext + '').click(function() {
					var currentScroll = $(oItem).parent().css('left').replace('px', '');
					scrollAmount = parseFloat(currentScroll) - (oUnitWidth * config.scroll);
					//console.log('Next: ' + scrollAmount);
					$(oItem).parent().css('left', scrollAmount + 'px');
					//console.log('Count: ' + iCount);

			});

		}

		if (config.auto == true) {

			function autoRotate() {
				var currentScroll = $(oItem).parent().css('left').replace('px', '');
				scrollAmount = parseFloat(currentScroll) - (oUnitWidth * config.scroll);
				//console.log('Next: ' + scrollAmount);
				$(oItem).parent().css('left', scrollAmount + 'px');
				//console.log('Count: ' + iCount);
			}

			var timesRun = 0;
			var interval = setInterval(function() {
				timesRun += 1;
				if (timesRun === iCount / config.items + 1) {
					clearInterval(interval);
				}
				window.setInterval(autoRotate);
			}, config.autoTime);

		}

		return this;
	};

})(jQuery);