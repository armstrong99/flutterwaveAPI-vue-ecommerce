# How it works

## Ensure you have an active INTERNET CONNECTION as some of the Assets depends on CDN to render.

### - Ndukwe Armstrong(armstrong.ndukwe)

## Table of Contents

```
(a) Run the app locally
(b) Create a store and subacccount
(c) Setup store products
(d) Split Payment
(e) Get a disapatcher
(f) Get store data
(g) Buy a product
(h) Test API directly via PostMan
```

```
(a) Run the app locally
```

### UI

#### To start the UI use the command

`npm run serve | yarn serve`

#### The Needs two enviromental variables that is already set by default, so u can change it

`VUE_APP_SERVER_BASE_URL | VUE_APP_PUBLIC_KEY`

#### You can now visit `http://localhost:8081/home` and click on `open store | open now button`

### Server

#### To start the Server use the command

`npm run end | yarn end`

#### This needs two enviromental variables and run's on port `3001 | localhost:3001`

`SEC_KEY | BASE_API_URL`

```
(b) Create a store and subaccount
```

### UI

#### the UI implementation of creating a store is at directory: `src\views\OpenStore.vue`

and `src\views\PayConfirm.vue`

### Server

#### the Server implementation of creating a store is at directory: `end\Controllers\flutter_trans_verify.controller.js`

The transaction is verified and the user details are stored in db and the subaccount is been created, the implementaion for creating subaccount is seen at `end\helperFlutterAPI\flutter_createSubAct.js`

```
(c) Setup store products
```

### UI

#### The UI implementation of adding products to store is at: `src\views\ProductsSetup.vue`

### Server

#### The Server implementation of adding products to store is at: `end\Controllers\products.controller.js`

```
(d) Split Payment
```

### Algorithm

### The Algorithms for splitting the payment appropriately to the dispatcher, seller and also resolving for the delivery fee is seen at:

`src\FlutterAPI\split_payments.js`

```
 (e) Get a disapatcher
```

### UI

#### At `src\views\ProductsSetup.vue` the User is asked to wait while the API request assigns a dispatcher subaccount ID to her account details

### Server

#### The server implementation of assigning dispatchers to store is at: `end\Controllers\flutter_get_dispatcher.controller.js`

```
(f) Get store data
```

### UI

#### To display the store products of a user store the UI implementation is seen at `src\views\MyStore.vue`

### Server

#### How the server implents this request is seen at: `end\Controllers\Store\store.controller.js`

```
(g) Buy a product
```

### UI

#### How the UI show the store and buttons to buy a product is seen at `src\views\MyStore.vue`

```
(h) Test API directly via PostMan
```

### To test the API's directly, see a complete description and practical use of them using POSTMAN, you may click on the button/link below

#### Ensure you have an active INTERNET CONNECTION as some of the Assets depends on CDN to render.

`Postman Link`

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4b093e426f1fdeacae5b#?env%5BbaseUrl%5D=W3sia2V5IjoiYmFzZVVybCIsInZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAxIiwiZW5hYmxlZCI6dHJ1ZX1d)
