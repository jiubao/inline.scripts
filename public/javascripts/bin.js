
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
	//o.$o = function(selector, fn) {
	o.$o = function() {
		if (arguments.length == 0) {
			return [];
		}
		var es = document.querySelectorAll(arguments[0]);
		if (arguments.length > 1) {
			for(var i = es.length - 1; i >= 0; i--) {
				arguments[1](es[i]);
			}
		}
		return es;
	};
	o.addClass = function(element, classname) {
		if (element.classList) {
			element.classList.add(classname);
		} else {
			var s = element.className;
			element.className = s + " " + classname;
		}
		return element;
	};
	o.data = function(element, key) {
		return element.dataset[key];
	};
	return o;
})();
