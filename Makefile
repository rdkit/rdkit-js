.PHONY: all config build dev start start-python format

port=5000

all:
	bundle install

config:
	bundle config set --local path '${HOME}/.local/share/gem'

build:
	JEKYLL_ENV=production bundle exec jekyll build

dev:
	JEKYLL_ENV=development bundle exec jekyll serve --host 0.0.0.0 --port ${port} --drafts

start:
	bundle exec jekyll serve --host 0.0.0.0 --port ${port}

start-python:
	JEKYLL_ENV=development bundle exec jekyll build --drafts --baseurl ""
	python -m http.server ${port} --directory _site/

format:
	prettier
