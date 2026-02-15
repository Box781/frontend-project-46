install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

.PHONY: install lint lint-fix