run: package.json
	nw .

build: src/style/main.styl
	stylus < src/style/main.styl > public/css/main.css

mocha: test/api-test.js
	mocha --timeout 12000 test/*
