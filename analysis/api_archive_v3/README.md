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
    "msg": [
        // Massages
    ],
    "query": [
        // wikis...
    ]
}
```

### `action=log`

Unpublic on document. Prevent SPAM.

## Data Structure

```shell
> using inpageedit
switched to db inpageedit
> db.auth('<username>','password')
1
> db.analysis.find().pretty()
```

```json
{
  "_id": ObjectId("<ID>"),
  "url": "<wgServer><wgArticlePath>",
  "sitename": "<wgSiteName>",
  "_total": 0,
  "date": {
    "<Y-m-d>": {
      "_total": 0,
      "<inpageedit_function_name>": 0
    }
  },
  "functions": {
    "<inpageedit_function_name>": 0
  },
  "users": {
    "<wgUserName>": {
      "_total": 0,
      "date": {
        "<Y-m-d>": {
          "_total": 0,
          "<inpageedit_function_name>": 0
        }
      },
      "functions": {
        "<inpageedit_function_name>": 0
      }
    }
  }
}
```
