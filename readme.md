# base url :

# GET REQUEST:

the url for GET REQUEST can be in two formats with or without a user_id path parameter

# CASE 1: WITH a path parameter of user_id

SUCCCESS CASES
EXAMPLE fetch(baseurl/user_id)
response : {
status: 200,
json: {
\_id : the id you passed in,
name : name of the corresponding user,
}
}
ERROR CASES:
1: you passed an \_id that is not formatted to mongoDB 11 digits, maybe 10 or more digits
EXAMPLE fecth(baseurl/user_id with wrong mongoDb format)
response : {
status: 400,
json: {
message: "Cast error, wrong mongo id format"
}
}
2: you passed an \_id that doesn't exist in the database
EXAMPLE fecth(baseurl/user_id that is non-existent)
response : {
status: 404,
json: {
message: "couldn't find user with provided user_id"
}
}

# CASE 2: WITHOUT a path parameter of user_id

this will return a json object containing an array of registered persons in the database (the database is holding some dummy data for this purpose)
EXAMPLE fetch(baseurl)
response : {
status: 200,
json: {
allPersons: [
{
_id : mongoDB id,
name: anyName1
}, {
_id : mongoDB id,
name: anyName2
}.....
]
}}

# POST REQUEST:

This createsa a person instance in the database. It requires a "name" field with it's coressponding value in the request body, sent as a json object, every other field apart from the "name" field will be ignored.

SUCCCESS INSTANCES
EXAMPLE: fetch (baseurl, {
method : "POST",
headers:{
"Content-type": "application/json"
}
body: {
JSON.stringify({ name: "jovial" })
}
})
response : {
status: 200,
json: {
\_id : mongodb generate id,
name: "jovial"
}}

ERROR INSTANCES
1: the name field is not provided

response : {
status: 400,
message: "Please provide name field"
}
2: the value of the "name" field is not of data type "string"

response : {
status: 400,
message: "only string values are allowed"
}
3: there is an existing user in the database with the "name" value provided. Note that duplicate cases are checked with regex "/name/i " therefore if there is an existing user with name "FRED", you trying to create another user with name "fred" or "FreD" or any other variations of alphabet cases will result in a duplicate error. This is to ensure unqiueness of the name field, in case of possible future query purposes.

response : {
status: 400,
message: "user with name "the name you passed in" already exist, please provide a unique name"
}

# PATCH REQUEST:

This requires a user_id path parameter and a request body containing a "newName" field, set to the new name you wish to update to.

SUCCCESS INSTANCES
EXAMPLE: fetch(baseurl/user_id, {
method: "PATCH",
headers:{"Content-type" : "application/json"},
body: JSON.stringify({newName: "new desired name"})
})
response : {
status: 200,
json: {
\_id : mongodb generated id of the user/person,
name: "new desired name"
}}

ERROR INSTANCES
1: you passed an \_id that is not formatted to mongoDB 11 digits, maybe 10 or more digits
EXAMPLE: fetch(baseurl/user_id with wrong mongodb format, {
method: "PATCH",
headers:{"Content-type" : "application/json"},
body: JSON.stringify({newName: "new desired name"})
})
response : {
status: 400,
json: {
message: "Cast error, wrong mongo id format"
}}

3: the value of the "newName" field is not of data type "string"
response : {
status: 400,
message: "only string values are allowed for provided fields and parameters"
}

# DELETE REQUEST:

this requires the database id of the person you are trying to delete, passed
as "user_id" in the path parameter. on success, it returnas the database document of the deleted user

EXAMPLE: fetch (baseurl/user_id, {
method : "DELETE",
headers:{
"Content-type": "application/json"
}
})
SUCCCESS INSTANCES
response : {
status: 200,
json:
{ message: "user successfully deleted", data: "deletedUserDocument" }
}

ERROR INSTANCES
1: you passed an \_id that is not formatted to mongoDB 11 digits, maybe 10 or more digits
EXAMPLE: fetch(baseurl/user_id with wrong mongodb format, {
method: "DELETE",
headers:{"Content-type" : "application/json"},
body: JSON.stringify({newName: "new desired name"})
})
response : {
status: 400,
json: {
message: "Cast error, wrong mongo id format"
}}
2: the "user_id" path parameter is not provided
response : {
status: 400,
message: "request must specify "user_id" to be deleted in the path parameter"
}
