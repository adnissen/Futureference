![FR icon](http://www.futref.me/114.png)
# Futureference
===============
[www.futref.me](<http://www.futref.me>)

A web app built to store and display quotes. Built with Meteor, with help from Bootstrap. [www.futref.me](<http://www.futref.me>) runs on Heroku.

**Futureference** was built by [Andrew Nissen](http://adnissen.com) and [Jennie Lamere](https://twitter.com/jenniee_l) over the course of about a week fueled by boredom.

# Purpose
=========
From the website: 

Did one of your friends just say something funny, stupid, or both? Now you can immortalize it on the internet forever! Getting started is easy! Simply login or create a new account below, add each-other as friends, and start adding quotes! It's really that easy. Never forget that hilarious or insightful line again.

# Goals
=======
The first version of Futureference was a private php app, created late last year. It had many critical flaws though, mostly created due to inexperience. With Meteor, many areas were easily able to be improved. Our major goals this time around were:

* Create a easily-accessible favorites list visibile right on the homepage
* Create a better login and friends system
* Take full advantage of Meteor and make sure every part of the site was in realtime
* Learn Meteor!

# Currently in development
==========================
Everything in this list can be seen in the dev branch. Note that you must have meteorite installed to run the dev version.

* URL routing (for instance, futref.me/adnissen will link directly to the profile)
* API (all methods are currently documented in api.md, also in the dev branch)

# TODO (maybe)
==============
* Move the user search bar to the top
* Let users un-favorite quotes from the homepage.
* Add in remove friends.
* Add in the option to add someone as a friend after they've been ignored.
* Remove the default Meteor Login buttons and re-style them with bootstrap.
* Fix bugs!

# License
=========
MIT