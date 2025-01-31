# API Reference Documentation

Base URL: `http://localhost:5001/api`

## Authentication

### Register User
Create a new user account.

```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "string",
  "username": "string",
  "password": "string"
}
```

**Response Success (201):**
```json
{
  "message": "User registered",
  "user": {
    "_id": "string",
    "name": "string",
    "username": "string"
  }
}
```

**Response Error (400):**
```json
{
  "message": "A User with same username is already registered"
}
```

### Login User
Authenticate a user and get access token.

```
POST /auth/login
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response Success (200):**
```json
{
  "message": "logged in successfully",
  "accessToken": "string",
  "userName": "string",
  "userObjectId": "string"
}
```

**Response Error (404):**
```json
{
  "message": "User not found"
}
```

**Response Error (400):**
```json
{
  "message": "Invalid credentials"
}
```

## Friend Management

### Send Friend Request
Send a friend request to another user.

```
POST /friends/sendFriendRequest
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "senderId": "string",
  "recipientId": "string"
}
```

**Response Success (201):**
```json
{
  "message": "Friend request sent successfully",
  "request": {
    "_id": "string",
    "sender": "string",
    "recipient": "string",
    "status": "pending"
  }
}
```

**Response Error (400):**
```json
{
  "message": "Friend request already sent"
}
```

### Accept Friend Request
Accept a pending friend request.

```
POST /friends/acceptFriendRequest
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "requestId": "string"
}
```

**Response Success (200):**
```json
{
  "message": "Friend request accepted"
}
```

**Response Error (404):**
```json
{
  "message": "Request not found"
}
```

**Response Error (400):**
```json
{
  "message": "Request already accepted"
}
```

### Get User Friends
Retrieve the list of friends for a user.

```
GET /friends/{userId}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "friends": [
    {
      "_id": "string",
      "name": "string",
      "username": "string"
    }
  ]
}
```

**Response Error (404):**
```json
{
  "message": "User not found"
}
```

### Get Friend Suggestions
Get friend suggestions based on mutual connections.

```
GET /friends/suggestions/{userId}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "suggestions": [
    {
      "_id": "string",
      "name": "string",
      "username": "string",
      "mutualFriendsCount": number
    }
  ]
}
```

### Get Random Suggestions
Get random user suggestions when mutual friends are insufficient.

```
GET /friends/random-suggestions/{userId}
```

**Query Parameters:**
- `limit` (optional): Number of suggestions to return (default: 5)

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "suggestions": [
    {
      "_id": "string",
      "name": "string",
      "username": "string"
    }
  ]
}
```

## Error Responses

All endpoints may return these common error responses:

**Server Error (500):**
```json
{
  "message": "Internal Server Error"
}
```

**Authentication Error (401):**
```json
{
  "message": "Unauthorized: No token provided"
}
```
or
```json
{
  "message": "Invalid or expired token"
}
```

## Rate Limiting

Currently, no rate limiting is implemented.

## Authentication

All endpoints except `/auth/register` and `/auth/login` require authentication using a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The JWT token is obtained from the login endpoint and expires after 15 days.

## Additional Notes

1. All requests should include the `Content-Type: application/json` header when sending data.
2. Username is case-insensitive and will be stored in lowercase.
3. Friend requests have three possible statuses: "pending", "accepted", "rejected"
4. Friend suggestions are sorted by number of mutual friends in descending order.