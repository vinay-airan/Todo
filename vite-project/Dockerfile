# from node

# copy package.json package.json
# copy package-lock.json package-lock.json
# copy src src

# run npm install

# # ENTRYPOINT["node","src/main.jsx"]
# CMD ["npm","run","dev"]

FROM node

WORKDIR /app

# package files
COPY package.json /app/
COPY package-lock.json /app/

# install dependencies
RUN npm install

# project files
COPY index.html /app/
COPY vite.config.js /app/

# folders
COPY src /app/src
COPY public /app/public

# vite port
EXPOSE 5173

# start server
CMD ["npm","run","dev"]