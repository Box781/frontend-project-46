install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: install lint lint-fix test test-coverage