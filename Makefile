run: package.json
	nw .

mocha: test/api-test.js
	mocha --timeout 12000 test/*
