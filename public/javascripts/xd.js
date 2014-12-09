//first part code in this file should be embedded into html (script)

if ( "undefined" == typeof(xd) || !xd ) {
	xd = {};
}

//o.$o = function(selector, fn) {
xd.$o = function() {
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

xd.addClass = function(element, classname) {
	if (element.classList) {
		element.classList.add(classname);
	} else {
		var s = element.className;
		element.className = s + " " + classname;
	}
	return element;
};

xd.data = function(element, key) {
	return element.dataset[key];
};

xd.addhandler = function(elem, type, func) {
	if ( elem.addEventListener ) {
		elem.addEventListener(type, func, false);
	}
	else if ( elem.attachEvent ) {
		elem.attachEvent("on" + type, func);
	}
};
//}
