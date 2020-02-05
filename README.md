# nuxt-serverMiddleware-jest

> Nuxt.js SSR project using server middleware, jest unit testing and cyperess e2e testing

## Build Setup

``` bash
# install dependencies
npm run install

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm run start

# generate static project
npm run generate

# run jest unit tests
npm run test

# open cypress
npm run cypress:open
```

## Step by step

### create nuxt project

``` bash
# create nuxt project
npx create-nuxt-app <project-name>

## It will ask you some questions:
### Choose between integrated server-side frameworks:None
### Choose your favorite UI framework: Bootstrap-Vue
### Choose your favorite testing framework: Jest
### The Nuxt mode you want: Universal
### Add axios, Eslint and jsconfig.json

```

### check the result

``` bash
cd <project-name>
npm run dev

```

the default page will start at localhost:3000

### add server middleware setting

#### edit nuxt.config.js

``` javascript

serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]

```

#### create api folder and add index.js in folder

``` javascript
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})
// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
```

#### use postman to check localhost:3000/api

nuxt server middleware will return "Hello World"

### using cypress in drone
``` yml
kind: pipeline
type: docker
name: build

steps:
- name: nuxt-build
  image: node:10
  environment:
    CYPRESS_CACHE_FOLDER: /drone/src/.cypress_cache
  commands:
  - npm install
  - npm run build
  when:
    branch:
    - master
    event: push

- name: nuxt-run
  image: node:10
  environment:
    CYPRESS_CACHE_FOLDER: /drone/src/.cypress_cache
  commands:
  - npm run start  
  ports:
  - 3000
  detach: true
  when:
    branch:
    - master
    event: push

- name: pin
  image: node:10
  commands:
  - sleep 3
  - curl -f -L http://nuxt-run:3000

- name: e2e-testing
  image: cypress/browsers:chrome69
  environment:
    CYPRESS_CACHE_FOLDER: /drone/src/.cypress_cache
  commands:
  - npx cypress run --env api_server=http://nuxt-run:3000
  when:
    event:
    - push
```
+ Must set CYPRESS_CACHE_FOLDER
+ Run server in detach step or service to avoid blocking steps
+ Server ip is detach step name or service name, ex. http://nuxt-run:3000
+ Do not use localhost:port or any hardcode url
+ Do not use app as detach steps or service name. It will cause unknown error using cypress

