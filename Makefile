APP = ./
JSX = ./node_modules/.bin/jsx
JSX_SRC = $(wildcard src/jsx/*.jsx)
JS_OUT = $(patsubst src/jsx/%.jsx, public/js/%.js, $(JSX_SRC))
TESTS = $(wildcard test/*.js)

run: all
ifeq ($(shell uname), Linux)
	`which nw` $(APP)
else
	open -n -a node-webkit $(APP)
endif

all: node_modules $(JS_OUT)

public/js/%.js: src/jsx/%.jsx
	$(JSX) $< > $@

target: all
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
	@touch node_modules

test: $(TESTS)
	mocha --timeout 12000 test/*

.PHONY: target test all
