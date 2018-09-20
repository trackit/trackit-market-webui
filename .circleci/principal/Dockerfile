FROM circleci/node:7.10

RUN \
	sudo apt-get update \
	&& sudo apt-get -y upgrade \
	&& sudo apt-get -y install awscli \
	&& sudo rm -rf /var/lib/apt/lists/*
