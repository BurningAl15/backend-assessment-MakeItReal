# Challenge: FAVS API with JS

## Requirements
- Each user will have a unique id, and he will authenticate using a non-empty email and a password.
- Each user will be able to save a list of favs. Each fav will have an title , description and link, and each list will be defined by a unique id and a name.
- The system have to allow the following actions
  - Create a new list with a given name (auto-generate the unique id)
  - Get the users lists
  - Get an individual list for the user
  - Add items to a given list (based on the generated id)
  - All endpoints have to be secured with Bearer Auth (JWT)
- You should ensure that the password is strong enough

## What are we looking for?
- A well-designed solution and architecture Avoid duplication, extract re-usable code where makes sense. We want to see that you can create an easy-to-maintain codebase.
- Storage We need a MongoDB database implementation.
- Testing Try to create tests covering the main functionalities of your code. Feel free to create both unit tests and functional tests.
- Documentation The CEO has a non-tech background so try to explain your decisions, as well as any other technical requirement (how to run the API, external dependencies, etc ...)

## Routes
1. Get all favs of the account
> - Route: "/api/favs"
> - Description: Get all the favs of the account
> - HTTP Verb: GET

2. Get one fav of the account by id
> - Route: "/api/favs/:id"
> - Description: Get one fav of the account, the one you indicated with the id
> - HTTP Verb: GET

3. Create a new list of favs linked to your account
> - Route: "/api/favs"
> - Description: Create a list of favs
> - HTTP Verb: POST

4. Delete a list of favs related to your account by an id
> - Route: "/api/favs/:id"
> - Description: Delete a list of favs, the one you indicated with the id
> - HTTP Verb: DELETE

5. Register a user
> - Route: "/auth/local/register"
> - Description: Register a user with a password and email
> - HTTP Verb: POST

6. Register a user
> - Route: "/auth/local/login"
> - Description: Login a user with a password and email
> - HTTP Verb: POST

## Usage
The use of endpoints is very simple, previously you could see a table of endpoints that you can call, if you need to create a user or log in, here we have some examples.

1. Register your user
- Request body:
> {
  "email": "user@gmail.com",
  "password": "123456"
}
- Response:
> {  msg: "Congrats, your user is successfully created!" }

2. Login your user
- Request body:
> {
  "email": "user@gmail.com",
  "password": "123456"
}
- Response:
> {  msg: "Successfully Logged in!", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjYyOGM0ZGM1NDIzYjRiM2RkNzA4NzciLCJpYXQiOjE2NTA2MjYxMzIsImV4cCI6MTY1MDY0MDUzMn0.noa6FU3FeHD31AfbglTTRfoeHPOJxOXgsadnpgaw6cc" }

### For all this routes is needed to add an x-token field in Headers with the token to have access.
Without the token you will have no access to the functionalities, so don't forget to add the header with the x-token and the token info before any request.

3. Create a list of favs
- Request body:
> {
    "name":" > _ < ",
    "items":[
        {
            "title":"My favourites",
            "description":"> My list of favorite stuff <",
            "link":"https://www.apple.com/education/"
        }
    ]
}
- Response:
> {
    "fav": {
      "user": "62628c4dc5423b4b3dd70877",
      "name": " > _ < ",
      "items": [
          {
            "title":"My favourites",
            "description":"> My list of favorite stuff <",
            "link":"https://www.apple.com/education/",
            "_id": "62628f71b68144586d63d422"
          }
      ],
      "_id": "62628f71b68144586d63d421"
    }
}

4. Get a list of favs
- No needed Request body:

- Response:
> {
    "total": 2,
    "user": [
        {
            "_id": "62629883d32f0dcd769d3a11",
            "user": "62628c4dc5423b4b3dd70877",
            "name": " > _ < ",
            "items": [
                {
                    "title": ">>>> My favourites",
                    "description": "> My list of favorite stuff <",
                    "link": "https://www.apple.com/education/",
                    "_id": "62629883d32f0dcd769d3a12"
                }
            ]
        },
        {
            "_id": "62629891d32f0dcd769d3a15",
            "user": "62628c4dc5423b4b3dd70877",
            "name": " > _ < ",
            "items": [
                {
                    "title": "My favourites",
                    "description": "> My list of favorite stuff <",
                    "link": "https://www.apple.com/education/",
                    "_id": "62629891d32f0dcd769d3a16"
                }
            ]
        }
    ]
}

5. Delete a list of favs
- No needed Request body

- Response:
> {
    "msg": "Fav successfully deleted!"
}

6. Get a single list of favs
- No needed Request body

- Response:
> {
    "_id": "62628f71b68144586d63d421",
    "user": "62628c4dc5423b4b3dd70877",
    "name": " > _ < ",
    "items": [
        {
            "title": ">>>> My favourites",
            "description": "> My list of favorite stuff <",
            "link": "https://www.apple.com/education/",
            "_id": "62628f71b68144586d63d422"
        }
    ]
}

# Questions
- Indicate which are the parts of the following url: https://backend.mega-app.com.co:8080/api/articles/search?docid=1020&hl=en#dayone
> Answer: 
> - Scheme = https://
> - SubDomain = backend.
> - Domain = mega-app.
> - Top Level Domain = com.co
> - Port Number = :8080
> - Path = /api/articles/search
> - Query String Separator = ?
> - Query string / parameter = docid=1020&hl=en
> - Fragment = #dayone
- Define what is a Web API, Restful and what are the statusCode 200-, 400-, 500-
> Answer:
> - 200: Successful response
> - 400: Client Errors
> - 500: Server Errors
- When we talk about CRUD, what does it mean?
> Answer:
> - CRUD are a shortcut for the basic operations to interact with backend:
>   - Create
>   - Read
>   - Update
>   - Delete