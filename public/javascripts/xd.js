//first part code in this file should be embedded into html (script)

if ( "undefined" == typeof(xd) || !xd ) {
	var xd = (function() {
		o = {
			win: window,
			doc: document,
			doce: document.documentElement
			//body: xd.doc.body
		};
		var body = null;
		o.getBody = function() {
			if (body == null) {
				body = document.body;
			}
			return body;
		};
		o.t0 = function(item) {
			return item === 0 ? item : null;
		};
		return o;
	})();
}

xd.script = (function(){
	var o = {};
	o.loadScript = function(url, onload) {
		o.loadScriptDomElement(url, onload);
	};

	o.loadScripts = function(aUrls, onload) {
		// first pass: see if any of the scripts are on a different domain
		var nUrls = aUrls.length;
		var bDifferent = false;
		for ( var i = 0; i < nUrls; i++ ) {
			if ( differentDomain(aUrls[i]) ) {
				bDifferent = true;
				break;
			}
		}

		// pick the best loading function
		var loadFunc = o.loadScriptXhrInjection;
		if ( bDifferent ) {
			if ( -1 != navigator.userAgent.indexOf('Firefox') || 
				 -1 != navigator.userAgent.indexOf('Opera') ) {
				loadFunc = o.loadScriptDomElement;
			}
			else {
				loadFunc = o.loadScriptDocWrite;
			}
		}

		// second pass: load the scripts
		for ( var i = 0; i < nUrls; i++ ) {
			loadFunc(aUrls[i], ( i+1 == nUrls ? onload : null ), true);
		}
	};

	o.loadScriptDomElement = function(url, onload) {
		var domscript = document.createElement('script');
		domscript.src = url;
		if ( onload ) {
			domscript.onloadDone = false;
			domscript.onload = function() { 
				if ( !domscript.onloadDone ) {
					domscript.onloadDone = true; 
					onload(); 
				}
			};
			domscript.onreadystatechange = function() {
				if ( ( "loaded" === domscript.readyState || "complete" === domscript.readyState ) && !domscript.onloadDone ) {
					domscript.onloadDone = true;
					onload();
				}
			}
		}
		document.getElementsByTagName('head')[0].appendChild(domscript);
	};

	o.loadScriptDocWrite = function(url, onload) {
		document.write('<scr' + 'ipt src="' + url + 
					   '" type="text/javascript"></scr' + 'ipt>');
		if ( onload ) {
			// we can't tie it to the script's onload, so use window
			// thus, it doesn't fire as early as it might have
			xd.addHandler(window, "load", onload);
		}
	};

	o.loadScriptXhrInjection = function(url, onload, bOrder) {
		var iQueue = queuedScripts.length;
		if ( bOrder ) {
			var qScript = { response: null, onload: onload, done: false };
			queuedScripts[iQueue] = qScript;
		}

		var xhrObj = getXHRObject();
		xhrObj.onreadystatechange = function() { 
			if ( xhrObj.readyState == 4 ) {
				if ( bOrder ) {
					queuedScripts[iQueue].response = xhrObj.responseText;
					injectScripts();
				}
				else {
					var se = document.createElement('script');
					document.getElementsByTagName('head')[0].appendChild(se);
					se.text = xhrObj.responseText;
					if ( onload ) {
						onload();
					}
				}
			}
		};
		xhrObj.open('GET', url, true);
		xhrObj.send('');
	};

	var queuedScripts = new Array();

	function injectScripts() {
		var len = queuedScripts.length;
		for ( var i = 0; i < len; i++ ) {
			var qScript = queuedScripts[i];
			if ( ! qScript.done ) {
				if ( ! qScript.response ) {
					// STOP! need to wait for this response
					break;
				}
				else {
					var se = document.createElement('script');
					document.getElementsByTagName('head')[0].appendChild(se);
					se.text = qScript.response;
					if ( qScript.onload ) {
						qScript.onload();
					}
					qScript.done = true;
				}
			}
		}
	};

	function getXHRObject() {
		var xhrObj = false;
		try {
			xhrObj = new XMLHttpRequest();
		}
		catch(e){
			var aTypes = ["Msxml2.XMLHTTP.6.0", 
						  "Msxml2.XMLHTTP.3.0", 
						  "Msxml2.XMLHTTP", 
						  "Microsoft.XMLHTTP"];
			var len = aTypes.length;
			for ( var i=0; i < len; i++ ) {
				try {
					xhrObj = new ActiveXObject(aTypes[i]);
				}
				catch(e) {
					continue;
				}
				break;
			}
		}
		finally {
			return xhrObj;
		}
	};

	function differentDomain(url) {
		if ( 0 === url.indexOf('http://') || 0 === url.indexOf('https://') ) {
			var mainDomain = document.location.protocol + 
				"://" + document.location.host + "/";
			return ( 0 !== url.indexOf(mainDomain) );
		}
		
		return false;
	};

	return o;
})();

xd.addhandler = function(elem, type, func) {
	if ( elem.addEventListener ) {
		elem.addEventListener(type, func, false);
	}
	else if ( elem.attachEvent ) {
		elem.attachEvent("on" + type, func);
	}
};


xd.size = (function(){
	var w = window,
	    d = document,
	    e = d.documentElement,
	    b = d.body;
	    //b = d.getElementsByTagName('body')[0];

	var o = {
		page: {
			w: function() {},
			h: function() {},
			t: function() {

				// w.pageYOffset || 0;
				// e.scrollTop || 0;
				// b.scrollTop || 0;

				return w.pageYOffset || e.scrollTop;// || b.scrollTop;
			},
			l: function() {return w.pageXOffset || e.scrollLeft;}// || b.scrollLeft;}
		},
		win: {
			w: function() {return w.innerWidth || e.clientWidth;},// || b.clientWidth;},
			h: function() {return w.innerHeight || e.clientHeight;}// || b.clientHeight}
		},
		screen: {}
	};

	o.p = function(elem){
		var box = {top: 0, left:0};
		if ( typeof elem.getBoundingClientRect !== undefined ) {
			box = elem.getBoundingClientRect();
		}
		return { t: box.top, l: box.left };
	};

	o.s = function(elem) {
		return {w: elem.clientWidth, h: elem.clientHeight};
	};

	return o;
})();


if ( "undefined" == typeof(xd.jq) || !xd.jq ) {
	xd.jq = {};
}


/// samples:
///	<img data-img-src="/sleep?sleep=1000&type=gif&expires=1&last=-1&redir=0&t=1"/>
///	<div data-img-class="imgclass" style="width:400px;height:400px;"></div>
///

xd.jq.image = (function() {
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


xd.image = (function() {
	var i = {};

	var options = {
		img: 'data-img-src',
		bg: 'data-bg-url',
		css: 'data-img-class',
		delay: 300
	};

	function loadimg(b) {
		var s = xd.size;
		if (!b) {
			var top = s.page.t();
			var height = s.win.h();
		}

		$('img[data-img-src]').each(function(){
			var ele = $(this);
			if (!b) {
				var etop = s.p(this).t + top;
				var eh = s.s(this).h;
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
				var etop = this.offsetTop;
				var sh = this.offsetHeight;
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

