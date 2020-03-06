FROM node:13

RUN mkdir -p /home/container
WORKDIR /home/container

COPY package.json package.json
RUN npm i

COPY . /home/container

CMD [ "node", "out" ]