// xd, size

/// samples:
///	<img data-img-src="/sleep?sleep=1000&type=gif&expires=1&last=-1&redir=0&t=1"/>
///	<div data-img-class="imgclass" style="width:400px;height:400px;"></div>
///
/// xd.image.img(); xd.image.css();

xd.image = (function() {
	var i = {};

	var options = {
		img: 'data-img-src',
		imgData: 'imgSrc',
		css: 'data-img-class',
		cssData: 'imgClass',
		bg: 'data-bg-url',
		delay: 300
	};

	function loadimg() {
		var s = xd.size;
		var height = s.win.h();

		xd.$o('img[' + options.img + ']', function(that) {
			var etop = s.p(that).t;
			var eh = s.s(that).h;

			if (etop > -eh && etop < height) {
				that.src = xd.data(that, options.imgData);
				xd.addhandler(that, "load", function() {
					that.removeAttribute(options.img);
				});
			}
		});
	}

	function loadcss() {
		var s = xd.size;
		var height = s.win.h();

		xd.$o('[' + options.css + ']', function(that){
			var etop = s.p(that).t;
			var eh = s.s(that).h;

			if (etop > -eh && etop < height) {
				xd.addClass(that, xd.data(that, options.cssData)).removeAttribute(options.css);
			}
		});
	}

	var toid = null;
	var toid2 = null;

	i.img = function() {
		loadimg();
		xd.addhandler(window, "scroll", function() {
			if (toid) {
				window.clearTimeout(toid);
			}

			toid = window.setTimeout(function() {loadimg();}, options.delay);
		});
	};

	i.css = function() {
		loadcss();
		xd.addhandler(window, "scroll", function() {
			if (toid2) {
				window.clearTimeout(toid2);
			}

			toid2 = window.setTimeout(function() {loadcss();}, options.delay);
		});
	};

	return i;
})();

