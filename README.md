# Clap (As A Service)

Tired of copying and pasting to get your point across?

Want to make yourself heard and respected?

Introducing Clap (As A Service).

With this simple tool, now YOU can be one of millions clapping their way to a better life.

# [Demo](http://salockhart.github.io/clap-as-a-service/)

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

# Slack

Add Clap (As A Service) to Slack to add a single command that will clap any input you give it.

Supports regular ol' claps as well as specifying your own emoji.

<a href="https://slack.com/oauth/authorize?&client_id=11167364134.165634777125&scope=commands"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

[See it in the App Directory](https://slack.com/apps/A4VJNNV3P-clap-as-a-service)

## Examples

**Command**

    /clap welcome to clap as a service

**Response**

    welcome 👏 to 👏 clap 👏 as 👏 a 👏 service

**Command**

    /clap palms sweaty mom's spaghetti 🍝

**Response**

    palms 🍝 sweaty 🍝 mom's 🍝 spaghetti
