# ChallengeListVN-API

## Authorization
All non-GET API request require the use of a generated API key. You can find your API key or generate a new one by going to /settings page of Challenge List VN frontend.
To authenticate an API request, provide an API key in the `Authorization` header.
```
Bearer <Your_API_key_here>
```
## Responses
If an invalid request is submitted, or other error occurs, CLVN-api returns only HTTP status code. Otherwise, CLVN-api respone the JSON representation of the resources created or edited.

## Status Codes
Please reference to this link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status