
if ( "undefined" == typeof(xd.jq) || !xd.jq ) {
	xd.jq = {};
}

/// samples:
///	<img data-img-src="/sleep?sleep=1000&type=gif&expires=1&last=-1&redir=0&t=1"/>
///	<div data-img-class="imgclass" style="width:400px;height:400px;"></div>
///

xd.image = (function() {
	var i = {};

	var options = {
		img: 'data-img-src',
		bg: 'data-bg-url',
		css: 'data-img-class',
		delay: 300
	};

	function loadimg(b) {
		if (!b) {
			var win = $(window);
			var top = win.scrollTop();
			var height = win.height();
		}

		$('img[data-img-src]').each(function(){
			var ele = $(this);
			if (!b) {
				var etop = ele.offset().top;
				var eh = ele.height();
			}
			if (b || (etop > top - eh && etop < top + height)) {
				ele.attr('src', ele.data('img-src')).on('load', function(){
					$(this).removeAttr('data-img-src');
				});
			}
		});
	}

	function loadcss(b) {
		if (!b) {
			var win = $(window);
			var top = win.scrollTop();
			var height = win.height();
		}
		$('['+options.css+']').each(function(){
			var ele = $(this);
			if (!b) {
				var etop = ele.offset().top;
				var eh = ele.height();
			}
			if (b || (etop > top - eh && etop < top + height)) {
				ele.addClass(ele.data('img-class'));
				ele.removeAttr(options.css);
			}
		});
	}

	var toid = null;
	var toid2 = null;

	i.img = function() {
		loadimg();
		$(window).on('scroll', function() {
			if (toid) {
				window.clearTimeout(toid);
			}

			toid = window.setTimeout(function() {loadimg();}, options.delay);
		});
	};

	i.css = function() {
		loadcss();
		$(window).on('scroll', function() {
			if (toid2) {
				window.clearTimeout(toid2);
			}

			toid2 = window.setTimeout(function() {loadcss();}, options.delay);
		});
	};

	return i;
})();
