# Project Title : HNG STAGE TWO REST API

This allows CRUD operation to be perform on a specific resource in a database

## API Reference

#### BASE URL

<https://hng-be-s2.vercel.app/>

#### GET A SPECIFIC USER

```http
  GET https://hng-be-s2.vercel.app/api/<user_id>
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| `user_id` | `string` | **Required**. the Mongo user_id of the person you want to get |

##### Example

```http
 fetch (https://hng-be-s2.vercel.app/mongoDBuser_id)

  response : {
  status: 200,
  json: {
  _id :mongoDBuser_id,
  name: "name of the person"
  }}
```

#### CREATE USER

```http
  POST https://hng-be-s2.vercel.app/api

```

| BODY   | Type     | Description                                              |
| :----- | :------- | :------------------------------------------------------- |
| `name` | `string` | **e.g** {name : _name of the person you want to create_} |

##### Example

```http
 fetch (https://hng-be-s2.vercel.app/api, {
  method : "POST",
  headers:{
  "Content-type": "application/json"
  }
  body: {
  JSON.stringify({ name: "jovialcore" })
  }})

  response : {
  status: 200,
  json: {
  _id : mongodb generate id,
  name: "jovialcore"
  }}
```

### NOTE: ON POST REQUEST

```
 A regex expression /name/i checks the "name" property on the server side to ensure uniqueness so a user with the same name cannot be created twice irrespective of the alphabet case
```

#### EDIT AN EXISITNG USER DETAIL

```http
  PATCH https://hng-be-s2.vercel.app/api/mongoDBuser_id
```

| BODY   | Type     | Parameter | Type             | Body Description                                  |
| :----- | :------- | :-------- | :--------------- | :------------------------------------------------ |
| `name` | `string` | `user_id` | `mongoID string` | {newName : _the new name you want to change to _} |

##### Example

```http
  fetch (https://hng-be-s2.vercel.app/api, {
  method : "PATCH",
  headers:{
  "Content-type": "application/json"
  }
  body: {
  JSON.stringify({ name: "awwn" })
  }})

  response : {
  status: 200,
  json: {
  message: "name changed succesfully"
  updatedUser :{
  _id : mongoDBuser_id that was passed in the path parameter,
  name: "awwn"}
  }}
```

#### DELETE AN EXISITNG USER

```http
  DELETE https://hng-be-s2.vercel.app/api/<mongoDBuser_id>

```

| Parameter | Type             | Description                                                    |
| :-------- | :--------------- | :------------------------------------------------------------- |
| `user_id` | `mongoID string` | **Required**. the Mongo user_id of the user you want to delete |

##### Example

```http
  fetch (https://hng-be-s2.vercel.app/api/mongoDBuser_id, {
  method : "DELETE",
  headers:{
  "Content-type": "application/json"
  }
  })

response : {
status: 200,
json:
{ message: "user successfully deleted",
 }
}
```

## Environment Variables

To run this project on a locally, you will need to add the following environment variables to your .env file

`MONGO_URL = mongodb+srv://mhyke:mhykel666@node-apis.ofso7mr.mongodb.net/ZURI?retryWrites=true&w=majority`

## PORT

```
The default PORT is set to 5000  if none is specified in the environment variable
```

## Deployment

To deploy this project run

```bash
  npm init
  npm start
```

## Documentation and Testing

copy and paste the link into your browser to view and test endpoints. GOODLUCK!!!!

[Documentation](https://hng-be-s2.vercel.app/docs/)
