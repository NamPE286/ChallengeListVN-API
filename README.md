# ChallengeListVN-API

## General

- Documentation and source code for each route are placed in the same folder.
- Some GET requests require authentication will be replaced by POST request instead.

## Parameters and body
- Required parameters are wrapped inside square brackets (E.g: `/level/[id]`). 
- Optional parameters are wrapped inside curly brackets (E.g: `/level/[id]/{option}`).
- JSON parameters are encoded with `encodeURIComponent()`.
- POST and PUT requests don't take any parameter, they only take corresponding object in request's body.
- GET and DELETE requests don't take request's body.

## Authorization
All non-GET API request require the use of a generated API key. You can find your API key or generate a new one by going to /settings page of Challenge List VN frontend.
To authenticate an API request, provide an API key in the `Authorization` header.
```
Bearer <Your_API_key_here>
```

## Responses
If an invalid request is submitted, or other error occurs, CLVN-api returns error HTTP status code and message if possible. Otherwise, CLVN-api returns the JSON representation of the resources created or edited.

## Status Codes
Please reference to this link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
