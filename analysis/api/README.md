## InPageEdit Analysis 3.0

- Release date: Aprl 22, 2020 07:00 (CST)

## Tech Used

- PHP 7.3.9
- MongoDB 4.0.10

## API
### `action=query`

Query data

#### Params
- `url`
  - Filter via Wiki url
- `sitename`
  - Filter via Wiki Name

#### Response

`JSON`

```javascript
{
    "status": true, // true/false
    "msg": "<msg>",
    "query": [
        {
            "_id": {
                "$oid": "<mgdb_id>"
            },
            "url": "<Wiki Url>",
            "sitename": "<Wiki Name>",
            "date": {
                "<Y-m-d>": {
                    "<username>": {
                        "function1": 123,
                        "function2": 123
                    },
                    // users...
                },
                // another date...
            }
        },
        // wikis...
    ]
}  
```

### `action=log`
Unpublic on document. Prevent SPAM.
