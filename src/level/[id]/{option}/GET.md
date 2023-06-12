# `GET /level/[id]/{option}`

**Description** : Get level's info and record.

**Parameters** :

- Level : integers.
- option : JSON

```json
module.exports = {
    "range": {
        "index": {
            "start": 0,
            "end": 500
        },
        "rating": {
            "start": 0,
            "end": 100000
        }
    },
    "filter": {
        "sortBy": "rating",
        "ascending": false
    }
}
```
**Respone** : 
```json
{
  "data": {
    "id": 91317691,
    "name": "Goodbye Sengen",
    "videoID": "y_bxnIBCQ1s",
    "rating": 2000,
    "rank": 1,
    "accepted": true,
    "description": "Lorem ispum",
    "creatorUID": "c396bf2f-6cc5-4629-baf2-ca1ad744bbfa",
    "timestamp": "2023-06-09T12:52:21.128198+00:00",
    "length": 5,
    "dailyStart": "2023-06-12T00:00:00+00:00",
    "players": {
      "name": "NamPE",
      "email": "nambuihung654@gmail.com",
      "facebook": "https://www.facebook.com/profile.php?id=100008542323249",
      "youtube": "https://www.youtube.com/channel/UCCj7J4fxHF70n5zxccZQDww",
      "discord": "LinhBaka~#5953",
      "uid": "c396bf2f-6cc5-4629-baf2-ca1ad744bbfa",
      "isAdmin": true,
      "isBanned": false,
      "isHidden": false,
      "rating": 380,
      "rank": 1,
      "googleAvatarID": "AAcHTtdOqV4glvVD87DQqI3Rs80CWm6MxcPFsspglqjd9w"
    }
  },
  "records": [
    {
      "videoLink": "https://youtu.be/B6ILk9ov5tE",
      "refreshRate": 60,
      "userUID": "bc98a592-d458-4923-aec8-699078afe77f",
      "levelID": 91317691,
      "accepted": true,
      "comment": "dep chai",
      "isMobile": false,
      "timestamp": "2023-06-06T15:18:47.288515+00:00",
      "players": {
        "name": "Tøhrʉ.",
        "email": "buileminh2004@gmail.com",
        "facebook": null,
        "youtube": null,
        "discord": null,
        "uid": "bc98a592-d458-4923-aec8-699078afe77f",
        "isAdmin": false,
        "isBanned": false,
        "isHidden": false,
        "rating": 200,
        "rank": 2,
        "googleAvatarID": "AAcHTtcIA-SdD7yvse8S5_8AFOYRBNhWxLNvXRA5-JvF-g"
      }
    }
  ]
}
```

