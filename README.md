==============
points
==============

resources:
	html
	css
	js
	img
	font
	iframe


events:
	document.domcontentLoaded
	window.onload


effects:
	parallel download
	progressive rendering


practices:
	xd.prefix
	(function(window, document, undefined) {

	xd.suffix
	})(window, document);


==============
inline.scripts
==============

even faster web sites --> inline scripts

1. bottom script block page render

2. async script not block page render, but may block image render
	if script starts executed before window.load, it will block window.load, as a result, the image will not be shown before script executing finished.

3. link/css & script block document.DOMContentLoaded

4. script block window.load

5. link/css not block script download, but block script exectue

6. script block script execute

7. image block window.load 

----------------------------------------

3.1 link/css just block window.load, not block document.DOMContentLoaded

3.2 link/css block script execution

8. chrome concurrent 6 threads

9. fifo

10. loading priority: css > js > img

11. js

12. html is being parsed during downloading
	Daniel:
	the browser begins to download the HTML, and as it downloads, it parses it.
	if it finds an inline script/css/resource that it needs to download, it begins to do so inmediatelly.
	but it doesn't stop downloading in parallel.
	the parsing happens as it's being downloaded.
	it doesn't wait until it's fully downloaded.

13. running document.write after window.DOMContentLoaded, page content will be overwrote (to blank)
	