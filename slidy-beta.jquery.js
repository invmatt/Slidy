/*
* slidy-beta.jquery.js
* Slidy Beta is not meant for production deployment
* Version 2.0.0-b1
* https://github.com/invmatt/Slidy

IMPORTANT: Breaks backwards compatibility

*********************************************
* Beta versions may include bugs or features
* that don't work as intended. Use the stable
* version if required for production.
*********************************************

Slidy is now called using:
$('#selector').slidy({items: 5});
*/

(function($){
	$.fn.extend({ 
		slidy: function(options) {

			//Settings list and the default values
			var defaults = {
				'auto': false, // If the scroller should move automatically
				'autoTime': "5000", // Set time in ms to scroll by
				'nav': false, // Show previous/next links
				'navPosition': "inside", // inside / outside
				'paging': false, // Show paging
				'items': '3', // How many items to show
				'scroll': '1', // How many items to scroll by
				'scrollTime': '1000'
			};
			
			var options = $.extend(defaults, options);
		
    		return this.each(function() {

			var o = options	
			, obj = $(this)
			// Classes
			, oBtnPrev = 'slidy-prev'
			, oBtnNext = 'slidy-next'
			, oBtnGnrl = 'slidy-nav'
			, objChild = obj.children('ul')
			// Helpers
			, oItem = $("li", obj)
			, oUnitWidth = ($(obj).outerWidth() / o.items)
			, count = 0
			, iCount = $(oItem).size()
			, oContainWidth = oUnitWidth * iCount
			, timesRun = 0 // This needs removing, just use count instead.
			;
				  
		// Set item widths
		$(oItem).css('width', '' + oUnitWidth + 'px').addClass("slidy-item").parent().addClass("slidy-contain").attr("data-plugin", "slidy");
		$(objChild).css({
			width : ''+ oContainWidth +'',
			left : '0'
		});


		var oLeft = parseFloat(objChild.css('left'));

		// Left / Right navigation
		if (o.nav === true) {


			if (o.navPosition === "outside") {
				$(obj).append('<a class="' + oBtnPrev + ' ' + oBtnGnrl + '">Previous</a><a class="' + oBtnNext + ' ' + oBtnGnrl + '">Next</a>');
			}

			if (o.navPosition === "inside") {
				$(objChild).append('<a class="' + oBtnPrev + ' ' + oBtnGnrl + '">Previous</a><a class="' + oBtnNext + ' ' + oBtnGnrl + '">Next</a>');
			}

			$('.' + oBtnPrev + '').click(function() {

				/*console.log('Left: ' + oLeft);
				console.log('UL: ' + objChild.width());
				console.log('DIV: ' + obj.width());*/

				if (oLeft == 0) return;

				var currentScroll = $(oItem).parent().css('left').replace('px', '');
				var scrollAmount = parseFloat(currentScroll) + (oUnitWidth * o.scroll);

				$(objChild).animate({
					left: "" + scrollAmount + "px"
				}, o.scrollTime);
				oLeft = parseInt(scrollAmount);

			});

			$('.' + oBtnNext + '').click(function() {

				var currentScroll = parseFloat($(oItem).parent().css('left').replace('px', ''));

				if ((objChild.width() + currentScroll) <= obj.width()) return;

				var scrollAmount = currentScroll - (oUnitWidth * o.scroll);

				$(objChild).animate({
					left: "" + scrollAmount + "px"
				}, o.scrollTime);

				oLeft = parseInt(scrollAmount);

			});

		}

		// Paging
		if (o.paging === true) {

			$(obj).append('<ul id="paging-container"></ul>');
			$(oItem).each(function() {
				count++;
				$("#paging-container").append('<li id="paging-' + count + '" class="page-item">' + count + '</li>');

			});
			$(".page-item:first-child").addClass("current");
			$('.page-item').click(function() {
				var index = $(this).attr("id").replace('paging-', '');
				$(".page-item").removeClass("current");
				$(this).addClass("current");
				//objChild.css('left', '-' + (oUnitWidth * index - oUnitWidth) + 'px');
				$(objChild).animate({
					left: '-' + (oUnitWidth * index - oUnitWidth) + 'px'
				}, o.scrollTime);

			});
		}

		// Auto scroll - currently works in one direction (RTL)
		if (o.auto === true) {

			function autoRotate() {
				var autoCalc = oContainWidth - (oUnitWidth * o.scroll);
				var currentScroll = $(oItem).parent().css('left').replace('px', '');
				var scrollAmount = parseFloat(oUnitWidth * timesRun);
				$(objChild).animate({
					left: "-" + scrollAmount + "px"
				}, o.scrollTime);
				var pagingSwitch = timesRun + 1;
				$(".page-item").removeClass('current');
				$("#paging-" + pagingSwitch + "").addClass("current");
			}

			var timesRun = 0;
			var interval = setInterval(function() {
				timesRun += 1;
				if (timesRun === iCount / o.items - o.scroll) {
					clearInterval(interval);
				}
				window.setInterval(autoRotate);
			}, o.autoTime);

		}
				
    		});
    	}
	});
})(jQuery);
