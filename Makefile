APP = ./
SRC = $(wildcard public/js/*.js public/css/*.css)
TESTS = $(wildcard test/*.js)

run: package.json
ifeq ($(shell uname), Linux)
	`which nw` $(APP)
else
	open -n -a node-webkit $(APP)
endif

build: node_modules $(SRC)
	node tools/build.js

node_modules: package.json
	npm install

tests: $(TESTS)
	mocha --timeout 12000 test/*
