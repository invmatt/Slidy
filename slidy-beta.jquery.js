/*
* slidy-beta.jquery.js
* Slidy Beta is not meant for production deployment
* Version 2.0.0-b1
* https://github.com/invmatt/Slidy
*/

// IMPORTANT: Breaks backwards compatibility

// *********************************************
// * Beta versions may include bugs or features
// * that don't work as intended. Use the stable
// * version if required for production.
// *********************************************

(function($) {
    $.fn.slidy = function (options) {
  	var config = $.extend({
	'auto': false,		// If the scroller should move automatically
	'autoTime': "5000",	// Set time in ms to scroll by
	'nav': false,		// Show previous/next links
	'paging': false,	// Show paging
	'items': '3',		// How many items to show
	'scroll': '1',		// How many items to scroll by
	'scrollTime': '1000',
	before: function () {},
	after: function () {}
  	}, options);

	// Helpers
	var obj = $(this)
	, objChild = obj.children('ul')
	, oItem = $("li", obj)
	, oUnitWidth = ($(obj).outerWidth() / config.items)
	, count = 0
	, iCount = $(oItem).size()
	, oContainWidth = oUnitWidth * iCount
	
	// Classes
	, oBtnPrev = 'slidy-prev'
	, oBtnNext = 'slidy-next'
	, oBtnGnrl = 'slidy-nav'
	;

	// Set item widths + add default left value
	$(oItem).css('width', '' + oUnitWidth + 'px').addClass("slidy-item").parent().addClass("slidy-contain").attr("data-plugin", "slidy");
	$(objChild).css({
		width : ''+ oContainWidth +'',
		left : '0'
	});

	var oLeft = parseFloat(objChild.css('left'));

	// Left / Right navigation
	if (options.nav) {

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
	if (options.paging) {

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
	if (options.auto) {

		function autoRotate() {
			var autoCalc = oContainWidth - (oUnitWidth * config.scroll);
			var currentScroll = $(oItem).parent().css('left').replace('px', '');
			var scrollAmount = parseFloat(oUnitWidth * timesRun);
			$(objChild).animate({
				left: "-" + scrollAmount + "px"
			}, config.scrollTime);
			var pagingSwitch = count + 1;
			$(".page-item").removeClass('current');
			$("#paging-" + pagingSwitch + "").addClass("current");
		}
		var interval = setInterval(function() {
			count += 1;
			if (count === iCount / config.items - config.scroll) {
				clearInterval(interval);
			}
			window.setInterval(autoRotate);
		}, config.autoTime);

	}

		return this;
	};

})(jQuery);
