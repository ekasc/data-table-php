dev:
	php -t src/ -S $(shell ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $$2}' | head -n 1):5173
css:
	npx tailwindcss -i src/styles.css -o src/output.css --watch
