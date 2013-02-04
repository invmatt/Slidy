/*
* Slidy.jquery.js
* Version 1.0.4-r2
* Development release
* https://github.com/invmatt/Slidy
*/

(function($) {
    $.slidy = function(selector, settings) {
		var config = {
			'auto': false, // If the scroller should move automatically
			'autoTime': "5000", // Set time in ms to scroll by
			'nav': false, // Show previous/next links
			'navPosition': "inside", // inside / outside
			'paging': false, // Show paging
			'items': '3', // How many items to show
			'scroll': '1', // How many items to scroll by
			'scrollTime': '1000'
		};

		if (settings) { $.extend(config, settings); }

		// Set some basic vars
		var obj = $(selector)
		, oBtnPrev = 'slidy-prev'
		, oBtnNext = 'slidy-next'
		, oBtnGnrl = 'slidy-nav'
		, objChild = obj.children('ul')
		, oItem = $("li", obj)
		, oUnitWidth = ($(obj).outerWidth() / config.items)
		, count = 0
		, iCount = $(oItem).size()
		, oContainWidth = oUnitWidth * iCount
		, timesRun = 0 // This needs removing, just use count instead.
		;

		// Set item widths
		$(oItem).css('width', '' + oUnitWidth + 'px').addClass("slidy-item").parent().addClass("slidy-contain").attr("data-plugin", "slidy");
		$(objChild).css('width', '' + oContainWidth + '');

		var oLeft = parseFloat(objChild.css('left'));

		// Left / Right navigation
		if (config.nav === true) {


			if (config.navPosition === "outside") {
				$(obj).append('<a class="' + oBtnPrev + ' ' + oBtnGnrl + '">Previous</a><a class="' + oBtnNext + ' ' + oBtnGnrl + '">Next</a>');
			}

			if (config.navPosition === "inside") {
				$(objChild).append('<a class="' + oBtnPrev + ' ' + oBtnGnrl + '">Previous</a><a class="' + oBtnNext + ' ' + oBtnGnrl + '">Next</a>');
			}

			$('.' + oBtnPrev + '').click(function() {

				/*console.log('Left: ' + oLeft);
				console.log('UL: ' + objChild.width());
				console.log('DIV: ' + obj.width());*/

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
		if (config.paging === true) {

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
				}, config.scrollTime);

			});
		}

		// Auto scroll - currently works in one direction (RTL)
		if (config.auto === true) {

			function autoRotate() {
				var autoCalc = oContainWidth - (oUnitWidth * config.scroll);
				var currentScroll = $(oItem).parent().css('left').replace('px', '');
				var scrollAmount = parseFloat(oUnitWidth * timesRun);
				$(objChild).animate({
					left: "-" + scrollAmount + "px"
				}, config.scrollTime);
				var pagingSwitch = timesRun + 1;
				$(".page-item").removeClass('current');
				$("#paging-" + pagingSwitch + "").addClass("current");
			}

			var timesRun = 0;
			var interval = setInterval(function() {
				timesRun += 1;
				if (timesRun === iCount / config.items - config.scroll) {
					clearInterval(interval);
				}
				window.setInterval(autoRotate);
			}, config.autoTime);

		}

		return this;
	};

})(jQuery);
