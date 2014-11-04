;!function (ms) {
	ms += new Date().getTime();
	while(new Date() < ms) {}

	console.log('executed for 1 second');
}(1000);
