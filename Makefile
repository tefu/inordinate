run: package.json
	nw .

build: src/style/main.styl
	stylus < src/style/main.styl > public/css/main.css
