FROM node:latest
WORKDIR /web
RUN apt-get update && apt-get install -y python3 python3-pip
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install --force
CMD ["npm", "start"]