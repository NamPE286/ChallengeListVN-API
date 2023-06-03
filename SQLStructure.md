# SQL structure
## `levels` table
| Name | Type |
| ---- | ---- |
| id | int8 |
| name | text |
| creator | text |
| videoID | text |
| rating | int8 |
| rank | int8 |

## `players` table
| Name | Type |
| ---- | ---- |
| id | int8 |
| uid | uuid |
| name | text |
| email | text |
| youtube | text |
| facebook | text |
| discord | text |
| isAdmin | bool |
| isBanned | bool |
| isHidden | bool |
| rank | int8 |
| rating | int8 |

## `records` table
| Name | Type |
| ---- | ---- |
| userUID | uuid |
| levelID | int8 |
| creator | text |
| refreshRate | int8 |
| videoLink | text |
| isMobile | bool |
| comment | text |
| accepted | text |
