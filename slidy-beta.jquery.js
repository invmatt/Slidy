/*
* slidy-beta.jquery.js
* Slidy Beta is not meant for production deployment
* Version 2.0.0-b3
* https://github.com/invmatt/Slidy

IMPORTANT: Partially backwards compatible. Requires call be changed

*********************************************
* Beta versions may include bugs or features
* that don't work as intended. Use the stable
* version if required for production.
*********************************************

Slidy is now called using:
$('#selector').slidy({items: 5});
*/

(function($) {
	$.fn.extend({
		slidy: function(options) {

			//Settings list and the default values
			var defaults = {
				'auto': false, // If the scroller should move automatically
				'scrollTime': "5000", // Set time in ms to scroll by
				'loop': false, // If auto enabled should it loop through the items
				'nav': false, // Show previous/next links
				'paging': false, // Show paging
				'items': '3', // How many items to show
				'scroll': '1' // How many items to scroll by
			};

			var options = $.extend(defaults, options);

			return this.each(function() {

		var config = options
		, obj = $(this)
		// Classes
		, oBtnPrev = 'slidy-prev'
		, oBtnNext = 'slidy-next'
		, oBtnGnrl = 'slidy-nav'
		, pageClass = 'page-item'
		// Helpers
		, objChild = obj.children('ul')
		, oItem = $("li", obj)
		, oUnitWidth = parseInt(($(obj).outerWidth() / config.items))
		, count = 0
		, iCount = $(oItem).size()
		, oContainWidth = oUnitWidth * iCount
		;

				// Set item widths and default classes
				$(oItem).css('width', '' + oUnitWidth + 'px').addClass("slidy-item");
				$(objChild).addClass("slidy-contain");
				$(objChild).css({
					width: '' + oContainWidth + '',
					left: '0'
				});


				var oLeft = parseFloat(objChild.css('left'));

				// Left / Right navigation
				if (config.nav) {
					$(obj).append('<a class="' + oBtnPrev + ' ' + oBtnGnrl + '">Previous</a><a class="' + oBtnNext + ' ' + oBtnGnrl + '">Next</a>');

					$('.' + oBtnPrev + '').click(function() {

						if (oLeft == 0) return;

						var currentScroll = $(oItem).parent().css('left').replace('px', '');
						var scrollAmount = parseFloat(currentScroll) + (oUnitWidth * config.scroll);

						$(objChild).animate({
							left: "" + scrollAmount + "px"
						}, config.scrollTime);
						oLeft = parseInt(scrollAmount);

					});

					$('.' + oBtnNext + '').click(function() {

						var currentScroll = parseFloat($(oItem).parent().css('left').replace('px', ''));

						if ((objChild.width() + currentScroll) <= obj.width()) return;

						var scrollAmount = currentScroll - (oUnitWidth * config.scroll);

						$(objChild).animate({
							left: "" + scrollAmount + "px"
						}, config.scrollTime);

						oLeft = parseInt(scrollAmount);

					});

				}

				// Paging
				if (config.paging) {
					$(obj).append('<ul id="paging-container"></ul>');
					$(oItem).each(function() {
						count++;
						$("#paging-container").append('<li id="paging-' + count + '" class="' + pageClass + '">' + count + '</li>');

					});
					$("." + pageClass + ":first-child").addClass("current");
					$('.' + pageClass + '').click(function() {
						var index = $(this).attr("id").replace('paging-', '');
						$("." + pageClass + "").removeClass("current");
						$(this).addClass("current");
						//objChild.css('left', '-' + (oUnitWidth * index - oUnitWidth) + 'px');
						$(objChild).animate({
							left: '-' + (oUnitWidth * index - oUnitWidth) + 'px'
						}, config.scrollTime);

					});
				}

				// Auto scroll - currently works in one direction (RTL)
				if (config.auto) {

					function autoRotate() {
						var autoCalc = oUnitWidth * config.scroll * (count - 1);
						$(objChild).animate({
							left: "-" + autoCalc + "px"
						}, config.scrollTime);

						var pagingSwitch = count + 1;
						$("." + pageClass + "").removeClass('current');
						$("#paging-" + pagingSwitch + "").addClass("current");
					}

					var interval = setInterval(function() {
						count++
						if (count === parseInt(iCount / config.scroll)) {
							if (config.loop) {
								//console.log("loop enabled");
							}
							if (!config.loop) {
								clearInterval(interval);
								//console.log("loop disabled");
							}
						}
						window.setInterval(autoRotate);
					}, config.scrollTime);

				}

			});
		}
	});
})(jQuery);
