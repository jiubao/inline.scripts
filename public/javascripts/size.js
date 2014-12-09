
if ( "undefined" == typeof(xd) || !xd ) {
	xd = {};
}

xd.size = (function(){
	var w = window,
	    d = document,
	    e = d.documentElement,
	    b = d.body;
	    //b = d.getElementsByTagName('body')[0];

	var o = {
		//page position
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

		//window size
		win: {
			w: function() {return w.innerWidth || e.clientWidth;},// || b.clientWidth;},
			h: function() {return w.innerHeight || e.clientHeight;}// || b.clientHeight}
		},
		screen: {}
	};

	//element position, 相对于窗口的位置
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

