APP = ./
JSX = ./node_modules/.bin/jsx
SRC = $(wildcard src/js/*.js src/css/*.css)
TESTS = $(wildcard test/*.js)

run:
ifeq ($(shell uname), Linux)
	`which nw` $(APP)
else
	open -n -a node-webkit $(APP)
endif

build: node_modules $(SRC)
	mkdir -p public/js
	$(foreach jsx, $(shell find ./src/jsx -name '*.jsx'), $(JSX) $(jsx) > $(patsubst ./src/jsx/%.jsx, ./public/js/%.js, $(jsx));)

target: build
	rm -rf target
	mkdir -p target
	cp package.json target
	cp -R public target
	cd target && npm install --production
	node utils/build.js

clean:
	rm public/js/*
	rm -rf target

node_modules: package.json
	npm install
test: $(TESTS)
	mocha --timeout 12000 test/*

.PHONY: target test
