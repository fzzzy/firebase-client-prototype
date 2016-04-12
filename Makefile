
all: client

build:
	mkdir -p build

build/client-bundle.js: main.js client.js
	webpack main.js build/client-bundle.js

build/index.html: index.html
	cp index.html build/index.html

client: build/client-bundle.js build/index.html

