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
