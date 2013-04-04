# API
=====
**Authentication**

In order to use the API, you must get your api key by going to futref.me/api

To authenticate a request, include your *loginName* and *apiKey* as parameters.
- - -
**Get User Quotes**

You must be friends with the user in order to get their quotes.

**url**: POST /:user.json

**auth**: true

**response:**

	[
	  {
	  	"id": "MFYhacLPhrqofzZ3Q",
		"quote": "hello! this is a quote!",
		"likes": 1,
		"timestamp":1364781523725
	  }
	]
