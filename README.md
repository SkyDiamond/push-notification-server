## How to setup
add firebase-adminsdk.json to root

## How to run

```bash
npm i
node index.js
```

## How to use

```curl
curl --location 'http://localhost:3000/send-notification' \
--header 'Content-Type: application/json' \
--data '{
    "token": "",
    "title": "Test Title",
    "body": "Test Body"
}'
```