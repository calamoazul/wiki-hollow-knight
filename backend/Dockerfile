#syntax=docker/dockerfile:1.4

FROM node:lts-buster-slim AS development


WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm ci


COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM development as dev-envs

RUN <<EOF
apt-get- update
apt-get install -y 
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker 
usermod -aG docker vscode
EOF

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

COPY /docker /usr/local/bin/com.docker.cli

COPY /docker-compose /usr/lib/docker/cli-plugins/docker-compose


CMD ["npm", "run", "dev"]