FROM node:13
ARG REACT_APP_COVID_API=${REACT_APP_COVID_API}
ENV REACT_APP_COVID_API=${REACT_APP_COVID_API}
# RUN apt-get install -y curl
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get install -y yarn
# RUN npm install -g yarn
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn global add serve
# Create Directory for the Container
WORKDIR /app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN yarn install
# Copy all other source code to work directory
ADD . /app
# TypeScript
RUN yarn build
# Start
# CMD [ "yarn", "start" ]
CMD ["serve", "-p", "3000", "-s", "./build"]