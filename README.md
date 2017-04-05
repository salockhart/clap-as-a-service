# Clap (As A Service)

Tired of copying and pasting to get your point across?

Want to make yourself heard and respected?

Introducing Clap (As A Service).

With this simple tool, now YOU can be one of millions clapping their way to a better life.

# [Demo](http://alexlockhart.ca/clap-as-a-service/)

Select one of our meticulously curated Emoji, or get a little crazy and input your own

# API

## `GET /clap`

### Description
Takes in a phrase and an optional emoji, and returns the phrase with the emoji placed between each space-separated word

### Parameters
* phrase _(required)_
The URL encoded phrase to apply the emoji to
* emoji
Set an emoji other than the default 👏

### Return Format
A string

### Example
**Request**
    
    https://clap-as-a-service.herokuapp.com/clap?phrase=palms%20sweaty%20mom%27s%20spaghetti&emoji=%F0%9F%8D%9D

**Response**

    palms 🍝 sweaty 🍝 mom's 🍝 spaghetti
