FROM node:latest
WORKDIR /web
RUN apt-get update && apt-get install -y python3 python3-pip
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install -D typescript @types/node @types/react @types/react-dom @types/jest
RUN npm install --force
CMD ["npm", "start"]