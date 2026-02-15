install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test-coverage:
	npm test -- --coverage

.PHONY: install lint lint-fix