APP = ./
SRC = $(wildcard src/js/*.js src/css/*.css)
TESTS = $(wildcard test/*.js)

run: package.json
ifeq ($(shell uname), Linux)
	`which nw` $(APP)
else
	open -n -a node-webkit $(APP)
endif

node_modules: package.json
	npm install

tests: $(TESTS)
	mocha --timeout 12000 test/*
