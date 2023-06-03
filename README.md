# ChallengeListVN-API

## Authorization
All non-GET API request require the use of a generated API key. You can find your API key or generate a new one by going to /settings page of Challenge List VN frontend.
To authenticate an API request, provide an API key in the `Authorization` header.
```
Bearer <Your_API_key_here>
```

## Options
Some route require you to provide an `option` object parameter (e.g: `/list/[option]`). The JSON object is decoded by `encodeURIComponent()` function in JS.
```json
{
    "range": {
        "index": {
            "start": 0,
            "end": 100
        },
        "rating": {
            "start": 0,
            "end": 100
        }
    },
    "filter": {
        "showBeatenLevels": true,
        "userUID": "abcxyz",
        "sortBy" : "rating"
    }
}
```

## Responses
If an invalid request is submitted, or other error occurs, CLVN-api returns only HTTP status code. Otherwise, CLVN-api returns the JSON representation of the resources created or edited.

## Status Codes
Please reference to this link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status