// addhandler

if ( "undefined" == typeof(xd) || !xd ) {
	xd = {};
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
