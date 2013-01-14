Slidy
=====

Slidy Carousel is a lightweight jQuery carousel for sliding html based content.

<h3>Current status</h3>

<pre>Stable - development release
<a href="https://github.com/invmatt/Slidy/wiki/Known-issues"> List of known issues</a>
</pre>

<h3>Usage</h3>

<pre>
'auto'			default: false		If the carousel should automatically rotate
'autoTime'		default: 5000		How many MilliSeconds the carousel should automatically rotate
'nav'			default: false		Shows previous/next links
'navPostion'	default: inside	    (options: inside/outside) where the nav links should appear
'paging'	    default: false		add paging to the carousel
'items'			default: 3		    How many items to show
'scroll'		default: 1		    How many items to scroll each click or auto rotate
'scrollTime'	default: 1000		The time in MilliSeconds to scroll the items
</pre>

<h3>CSS (Minimal)</h3>
<pre>
.slidy {
	overflow: hidden;
}

	.slidy-contain {
		position: relative;
	}
	
		.slidy-item {
			float: left;
		}
</pre>

<p>Call the plugin (Example)</p>
<p>The selector you call should be on the element directly above the UL</p>

<pre>
$(document).ready(function() {
	$.slidy('.slidy', {
		nav: true,
		navPosition: "outside",
		auto: false
	});
});
</pre>
