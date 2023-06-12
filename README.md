# ChallengeListVN-API

## Parameters
Required parameters are wrapped inside square brackets (E.g: `/level/[id]`). Optional parameters are wrapped inside curly brackets (E.g: `/level/[id]/{option}`).

## Authorization
All non-GET API request require the use of a generated API key. You can find your API key or generate a new one by going to /settings page of Challenge List VN frontend.
To authenticate an API request, provide an API key in the `Authorization` header.
```
Bearer <Your_API_key_here>
```

## Responses
If an invalid request is submitted, or other error occurs, CLVN-api returns only HTTP status code. Otherwise, CLVN-api returns the JSON representation of the resources created or edited.

## Status Codes
Please reference to this link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
