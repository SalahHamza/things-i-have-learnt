# AJAX

**AJAX** or **Asynchronous Javascript and XML** allows for content retrieval and display without reloading the web page. The concept is to send that the client sends the request and while waiting it can do other tasks but once the response returns we can do whatever we want with the it, well, according to the pre-set instructions that we set before dubbed **callbacks**.

## API

**API** is an acronym for **Application Programming Interface**. We'll be using an API to interact with various data sources. [Read more about APIs here](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82).

## AJAX with XHR

An `XMLHttpRequest` object (commonly abbreviated as XHR or xhr) is provided by the javascript environment and is used to make AJAX requests. The "issue" with XHR is that you have to manually do a lot of the steps to get the request set up and finally sent off, so when the response comes back there are already instructions to handle the data.

**Note**: The name XMLHttpRequest is historical and has no bearing on its functionality.

To create an `XMLHttpRequest` object, we use the `XMLHttpRequest` constructor function.
```javascript
const asyncRequestObject = new XMLHttpRequest();
```

### The 'open()' method

The XHR method `open()` initializes a newly-created request, or re-initializes an existing one. `open()` takes a number of parameters, but the most important are its first two: the HTTP method (`GET`, `POST`, ...) and URL to send the request to.

**Note**: Calling this method for an already active request (one for which open() has already been called) is the equivalent of calling [`abort()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort).

If we want to asynchronously request the homepage from the popular high-res image site, Unsplash, we'd use a `GET` request and provide the URL:
```javascript
asyncRequestObject.open('GET', 'https://unsplash.com');
```

The XHR's `open()` method does not actually send the request. It sets the stage and gives the object the info it will need when the request is actually sent.

XHR can perform the operation synchronously by setting the 3rd parameter to `false`, but it is not recommeneded to do so.
```javascript
const mySyncRequest = new XMLHttpRequest();
myAsyncRequest.open('GET', 'https://udacity.com/', false);
```

### The 'send()' method

The XHR method `send()` sends the request to the server. If the request is asynchronous (which is the default), this method returns as soon as the request is sent and the result is delivered using events.

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://unsplash.com');
xhr.send();
```
Running the above code will do nothing other than sending the request. To watch for our response we need to set some handlers for when the response succeeds and when an error occurs, and we do that through the `onload` and `onerror` properties.

### Handling success

```javascript
function handleSuccess () {
  // in the function, the `this` value is the XHR object
  // this.responseText holds the response from the server

  console.log( this.responseText ); // the HTML of https://unsplash.com/
}

xhr.onload = handleSuccess;
```

**Note**: Not setting the `onload`property will render the request useless.

### Handling errors

```javascript
function handleError () {
  // in the function, the `this` value is the XHR object
  console.log( 'An error occurred 😞' );
}

xhr.onerror = handleError;
```

**Note**: If by any chance an error occurs and you haven't set the `ònerror` property and handled errors, your code will fail silently.

### Putting it all together

```javascript
function handleSuccess () {
  console.log( this.responseText );
  // the HTML of https://unsplash.com/
}

function handleError () {
  console.log( 'An error occurred \uD83D\uDE1E' );
}

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://unsplash.com');
xhr.onload = handleSuccess;
xhr.onerror = handleError;
xhr.send();
```

If the data we are requesting is in JSON format we need to convert that JSON response (`this.responseText`) into a javascript object. That can be done with `JSON.parse();`, and our code should now look like this:

```javascript
function handleSuccess () {
  const data = JSON.parse( this.responseText ); // convert data from JSON to a JavaScript object
  console.log( data );
}

xhr.onload = handleSuccess;
```

`XMLHttpRequest` object has other methods and properties that you can check in the [XMLHttpRequest MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

### Recap

#### To Send An Async Request
* create an XHR object with the `XMLHttpRequest` constructor function
* use the `.open()` method - set the HTTP method and the URL of the resource to be fetched
* set the `.onload` property - set this to a function that will run upon a successful fetch
* set the `.onerror` property - set this to a function that will run when an error occurs
* use the `.send()` method - send the request

#### To Use The Response

* use the `.responseText` property - holds the text of the async request's response
* use the `JSON.parse()` method (when requesting JSON data) - converts the JSON data to a javascript object

**Note**: The `.responseText` property is accessible through the `this` keyword, so make sure to use function declaration when setting the `.onload` property.

## AJAX with jQuery

jQuery is an incredibly popular JavaScript library that provides a lot of functionality right out of the box. What is important to us here is jQuery's `ajax()` method that really eases up the handling of asynchronous requests.

### The 'ajax()' method

You can use the `ajax()` method by either providing a `requestUrl` and a configuration object, just like so:

```javascript
$.ajax(requestUrl, settings);
```
or just the `settings` object, which is "cleaner"
```javascript
$.ajax(settings);
```

### Making an AJAX call

Unlike XMLHttpRequest where we had to "open" the request, then "send" it, jQuery does all that for us. A simple AJAX call with jQuery's `ajax()` looks like this:

```javascript
$.ajax({
  url: 'https://swapi.co/api/people/1/'
});
```

We are not specifying the HTTP `GET` method here because it defaults to `GET`, but we can set the HTTP method througn the configuration object like so:

```javascript
$.ajax({
  url: '<url_to_post_data>',
  method: '<method>',
  // ...
});
```

**Note**: There are other options that you can set in the jquery settings object, you can check that in [the offcial jQuery's ajax docs](http://api.jquery.com/jquery.ajax/)

### Handling success

There are two ways to handle the returned data when the request is successful. The first is by setting the `success` property on the settings object, and the second/cleaner way is by chaining the `.done()` method on to `.ajax()` which works like ES2015 promises.

```javascript
$.ajax({
  url: 'https://swapi.co/api/people/1/'
}).done(function(data) {
  debugger; // work with the returned response
});
```

**Note**: When the received data is in JSON format jQuery automatically converts it to javascript object, so there is no need to use `JSON.parse()` method!

### Handling errors

Just like handling success, handling errors can be done in two ways, either by setting the `error` property on the settings object or by chaining the `.fail()` method to `.ajax()`, we'll be working with the latter.

```javascript
$.ajax({
  url: 'https://swapi.co/api/people/1/'
})
.done(function(data) {
  debugger; // work with the returned response
})
.fail(/* handling errors*/function(error) {
  // Do something with error
});
```

### Other jQuery async methods

jQuery comes with other async functions to make asynchronous calls that work as shortcuts to the `.ajax()` method:

* [`.get()`](http://api.jquery.com/jQuery.get/)
* [`.getJSON()`](http://api.jquery.com/jQuery.getJSON/)
* [`.getScript()`](http://api.jquery.com/jQuery.getScript/)
* [`.post()`](http://api.jquery.com/jQuery.post/)
* [`.load()`](http://api.jquery.com/load/)

**Note**: The jQuery website recommends using `.ajax()` method over these convenience methods.

### Wrap up

Using jQuery's `ajax()` method to handle async requests can save us lots of setup, it

* creates a new XHR object each time it's called
* sets all of the XHR properties and methods
* sends the XHR request

But this comes with a price, which is including the whole jQuery library and that is some expensive network call.

## AJAX with Fetch

Fetch is a new API that was built to make requesting resources (primarily across a network) a whole lot easier. One thing that makes the new Fetch API a lot nicer than the old XHR way of doing things is that Fetch is promise-based!

### Browser support and fallback

Fetch API is fairly new, so it's not widely supported in older browser, that is why you need to check for [browser support of the fetch API](http://caniuse.com/#feat=fetch).

In case it's not supported in your targeted browsers make sure to use this [fetch polyfill](https://github.com/github/fetch).

### Making a fetch request

A simple 'GET' request using the Fetch API is as simple as so
```javascript
fetch('https://swapi.co/api/people/1/')
```

To specify HTTP method, headers, mode (`cors`, `no-cors`, or `same-origin`) and other settings we do that through the configuration object that is passed to the `fetch()` method as second argument.

So, sending a request with the HTTP `POST` method and `Authorization` headers using the Fetch API would look like this:

```javascript
fetch('<request_url>', {
  method: 'POST',
  headers: {
    Authorization: '<some_auth_string>'
  },
  //...
});
```

Headers can also be set with a [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) object, like so:

```javascript
const reqHeaders = new Headers();
reqHeaders.append('Authorization', '<some_auth_string>');

fetch('<request_url>', {
  headers: reqHeaders,
  //...
});
```

### Handling the response

Fetch is Promise-based. This means that when we fire of the Fetch request, it will automatically return a Promise that we can use to listen for the response. [Read more about javascript promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Since `fetch()` method returns a Promise that resolves with the [`Response` object](https://developer.mozilla.org/en-US/docs/Web/API/Response), then all we have to do is chain a `.then()` on that Promise.

```javascript
fetch(`<request_url>`, {
  // ...
}).then((response) => {
  debugger; // work with the returned 'response'
});
```

The `Response` object doesn't have the data, it only has information about the response itself (`type`, `url`, `status`, `headers`, `ok`, ...). To actually get the data, we need to get the "body" of the response.

#### Handling JSON Responses

If the data we are requesting is JSON, then we should call the `.json()` method of the `Response` object that returns a Promise that resolves with data as javascript object.

```javascript
fetch(`<request_url>`, {
  // ...
})
.then((response) => response.json())
.then((data) => {
  debugger; // work with the returned JSON data
});
```

#### Handling Text/HTML Responses

If the response data is HTML or text, then we should call the `.text()` method.

```javascript
fetch(`<request_url>`, {
  // ...
})
.then((response) => response.text())
.then((data) => {
  debugger; // work with the returned HTML string
});
```

#### Handling Blob Responses

To load an image with fetch we use the `blob()` method that resolves with a `Blob`. A [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object represents a file-like object of immutable, raw data.

```javascript
fetch('<path_or_url_to_img>/cute_cat.jpg')
.then( response => response.blob())
.then((imageBlob) => {
  document.querySelector('img').src = URL.createObjectURL(imageBlob);
});
```

### Handling Errors

Since the `fetch()` returns a `Promise`, we can handle errors by chaining a `.catch()` method on the tail of the fetch chain.

```javascript
fetch(`<request_url>`, {
  // ...
})
.then((response) => {
  // return with the appropriate method json(), text() or blob()
})
.then((data) => {
  // Do something with the data
})
.catch((err) => {
  // Handle the error
});
```

## Resources and Usefull links

* [What is an API? In English, please.](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82)
* [MDN - Using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
* [XMLHttpRequest MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
* [jQuery AJAX documentation](http://api.jquery.com/category/ajax/)
* [Fetch Spec](https://fetch.spec.whatwg.org)

## Related

* [Pause Your Code With Breakpoints](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints)
* [JavaScript Debugging Reference](https://developers.google.com/web/tools/chrome-devtools/javascript/reference)
* [MDN - Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [JavaScript Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises)
* [JavaScript Promises for Dummies](https://scotch.io/tutorials/javascript-promises-for-dummies)
* [Master the JavaScript Interview: What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)