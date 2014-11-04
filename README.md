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