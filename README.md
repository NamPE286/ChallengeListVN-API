# ChallengeListVN-API

## General
- Some GET requests require authentication will be replaced by POST request instead.
- All GET requests will have respone header `Cache-Control: public, s-maxage=10, stale-while-revalidate=3600`.

## Parameters and body
- Required parameters are wrapped inside square brackets (E.g: `/level/[id]`). 
- Optional parameters are wrapped inside curly brackets (E.g: `/level/[id]/{option}`).
- JSON parameters are encoded with `encodeURIComponent()`.
- POST and PUT requests don't take any parameter, they only take corresponding object in request's body.
- GET and DELETE requests don't take request's body.

## Authorization
- All non-GET requests require the use of a generated API key. The API key is `access_token` in user's `session`.
```
Bearer <Your_API_key_here>
```
- API key is only valid for 30 minutes. After that, new API key will be generated.
- To grant admin access for a user, do a query update to Supabase with `service_role` key.


## Responses
If an invalid request is submitted, or other error occurs, CLVN-api returns error HTTP status code and message if possible. Otherwise, CLVN-api returns the JSON representation of the resources created or edited.

## Status Codes
Please reference to this link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
