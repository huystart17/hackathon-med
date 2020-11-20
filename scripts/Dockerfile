FROM node:14-alpine
RUN apk add  --no-cache sox

# Set the working directory.
#RUN  mkdir /usr/src/app
#WORKDIR /usr/src/app

COPY package.json .
RUN yarn install

COPY . .

#run command before
#RUN yarn global add pm2

#RUN yarn build

# Run the command inside your image filesystem.
#
#ENV HOST=0.0.0.0
#ENV PORT=3030
#ENV MONGDB_URL=localhost:27017

EXPOSE 3030

CMD [ "yarn", "start" ]
# Copy the file from your host to your current location.
