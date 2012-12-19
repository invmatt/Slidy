/*
*     Slidy.jquery.js
*     Version 1.0.2
*     https://github.com/invmatt
*     Development release
*     TODO:
*     + Paging needs finishing
*/

(function($) {
    $.slidy = function(selector, settings) {
        var config = {
            'auto': false,                      // WIP
            'autoTime': "5000",     // Set time in ms to scroll by
            'nav': false,                       // Show previous/next links
            'navPosition': "inside", // inside / outside
            'paging': false,              // WIP - Doesn't work
            'items': '3',                       // How many items to show
            'scroll': '1',                            // How many items to scroll by
            'scrollTime': '1000'
        };

        if (settings) { $.extend(config, settings); }

        // Set some basic vars
        
        // Set some basic vars
        var obj = $(selector);
        var oBtnPrev = 'slidy-prev';
        var oBtnNext = 'slidy-next';
        var oBtnGnrl = 'slidy-nav';
        var objChild = obj.children('ul');
        var oItem = $("li", obj);
        var oUnitWidth = ($(obj).outerWidth() / config.items);
        var count = 0;
        var iCount = $(oItem).size();
        var oContainWidth = oUnitWidth * iCount;
        var timesRun = 0;

        // Set item widths

        $(oItem).css('width', '' + oUnitWidth + 'px').addClass("slidy-item").parent().addClass("slidy-contain");
        $(objChild).css('width', '' + oContainWidth + '');
        $(objchild).css('left', '0');

        var oLeft = parseFloat(objChild.css('left'));

        // Left / Right navigation
        if (config.nav === true) {


            if (config.navPosition === "outside") {
                $(objChild).parent().append('<a class="' + oBtnPrev + ' ' + oBtnGnrl + '">Previous</a><a class="' + oBtnNext + ' ' + oBtnGnrl + '">Next</a>');
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

        // Auto scroll - currently works in one direction (RTL)
        if (config.auto === true) {

            function autoRotate() {
                var currentScroll = $(oItem).parent().css('left').replace('px', '');
                var scrollAmount = parseFloat(currentScroll) - (oUnitWidth * config.scroll);
                $(objChild).animate({
                    left: "" + scrollAmount + "px"
                }, 1500);
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
