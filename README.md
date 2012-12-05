Slidy
=====

Slidy Carousel is a lightweight carousel for sliding html based content. It was built using the javascript jQuery library.

<h3>Current status</h3>

<pre>Unstable - development release</pre>

<h3>Usage</h3>

<pre>
'auto'			default: false		If the carousel should automatically rotate
'autoTime'		default: 5000		How many MilliSeconds the carousel should automatically rotate
'nav'			default: false		Shows previous/next links
'navPostion'	default: inside	    (options: inside/outside) where the nav links should appear
'paging'	    default: false		add paging to the carousel
'items'			default: 3		    How many items to show
'scroll'		default: 1		    How many items to scroll each click or auto rotate
</pre>

<p>Call the plugin (Example)</p>

<pre>
$(document).ready(function() {
	$.slidy('.slidy', {
		nav: true,
		navPosition: "outside",
		auto: false
	});
});
</pre>