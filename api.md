# API
=====
**Authentication**

In order to use the API, you must get your api key by going to futref.me/api

To authenticate a request, include your *loginName* and *apiKey* as parameters for `GET` requests and as part of the data for `POST` requests.
- - -
**Get User Quotes**

You must be friends with the user in order to get their quotes.

**url**: GET /:user.json

**auth**: true (parameters)

**response:**

	[
	  {
	    "owner": "test1",
	  	"id": "MFYhacLPhrqofzZ3Q",
		"quote": "hello! this is a quote!",
		"likes": 1,
		"timestamp":1364781523725
	  }
	]
- - -
**Add a Quote**

You must be friends with the user in order to add a quote to their page.

**url**: POST /:user.json

**auth**: true (body)

**body**: 

	quote=*string*"

**response:**
	
	{
	"owner":"test1",
	"id":"cG3JN3bZrSNh6ZmEM",
	"quote":"yo"	
	}
	
- - -
**Get Favorite Quotes**

Retrieves the favorites of the logged in user.

**url**: GET /:user/favorites.json

**auth**: true (parameters)

**response:**
		
	[
		{"quote":"hi","owner":"test1"},
		{"quote":"another quote","owner":"test1"}
	]