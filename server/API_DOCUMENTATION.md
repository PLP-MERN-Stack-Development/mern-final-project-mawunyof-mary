# 📚 Bug Tracker API Documentation

Complete API reference for the Bug Tracker application.

---

## 🌐 Base URL

```
http://localhost:5000/api
```

---

## 🔐 Authentication

All protected endpoints need a JWT token in the header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

How to get a token:
1. Register with `/auth/register` or login with `/auth/login`
2. Save the token from response
3. Include it in all future requests

---

## 📋 API Endpoints

### 1. Register User

Create a new account.

```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Validation Rules:**
- Name: 2-100 characters
- Email: Valid format, must be unique
- Password: Minimum 6 characters

---

### 2. Login User

Login to existing account.

```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "status": 401
}
```

---

### 3. Get All Bugs

Get all bugs for the logged-in user.

```
GET /bugs
Authorization: Bearer YOUR_TOKEN

Query Parameters (optional):
?status=open
?priority=high
?status=open&priority=high
```

**Response (200):**
```json
{
  "bugs": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Login button not working",
      "description": "Button is unresponsive",
      "priority": "high",
      "status": "open",
      "category": "ui",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-11-20T10:30:00Z",
      "updatedAt": "2025-11-20T10:30:00Z"
    }
  ],
  "total": 10,
  "page": 1,
  "pages": 1
}
```

**Query Options:**

| Parameter | Values | Example |
|-----------|--------|---------|
| status | open, in-progress, closed | ?status=open |
| priority | low, medium, high, critical | ?priority=high |
| page | number | ?page=1 |
| limit | number | ?limit=10 |

---

### 4. Create Bug

Create a new bug.

```
POST /bugs
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Login button not working",
  "description": "The login button on the home page does not respond to clicks",
  "priority": "high"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Login button not working",
  "description": "The login button...",
  "priority": "high",
  "status": "open",
  "category": "other",
  "createdBy": "507f1f77bcf86cd799439011",
  "createdAt": "2025-11-20T10:30:00Z",
  "updatedAt": "2025-11-20T10:30:00Z"
}
```

**Validation:**
- title: 5-200 characters (required)
- description: 10-5000 characters (required)
- priority: low, medium, high, critical (required)
- status: open, in-progress, closed (optional, default: open)

---

### 5. Get Single Bug

Get details of one bug.

```
GET /bugs/:id
Authorization: Bearer YOUR_TOKEN
```

**Example:**
```
GET /bugs/507f1f77bcf86cd799439012
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Login button not working",
  "description": "The login button...",
  "priority": "high",
  "status": "open",
  "category": "ui",
  "createdBy": { ... },
  "createdAt": "2025-11-20T10:30:00Z",
  "updatedAt": "2025-11-20T10:30:00Z"
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Bug not found",
  "status": 404
}
```

---

### 6. Update Bug

Update an existing bug.

```
PUT /bugs/:id
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "status": "in-progress",
  "priority": "medium"
}
```

**Example:**
```
PUT /bugs/507f1f77bcf86cd799439012
```

**You can update:**
- title
- description
- priority (low, medium, high, critical)
- status (open, in-progress, closed)
- category (ui, backend, database, security, performance, other)

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Login button not working",
  "status": "in-progress",
  "priority": "medium",
  "updatedAt": "2025-11-20T11:00:00Z"
}
```

---

### 7. Delete Bug

Delete a bug permanently.

```
DELETE /bugs/:id
Authorization: Bearer YOUR_TOKEN
```

**Example:**
```
DELETE /bugs/507f1f77bcf86cd799439012
```

**Response (200):**
```json
{
  "success": true,
  "message": "Bug deleted successfully"
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Bug not found",
  "status": 404
}
```

---

## 🧪 Testing with cURL

### Test Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Test Get Bugs (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:5000/api/bugs \
  -H "Authorization: Bearer TOKEN"
```

### Test Create Bug
```bash
curl -X POST http://localhost:5000/api/bugs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "Test Bug",
    "description": "This is a test bug",
    "priority": "high"
  }'
```

### Test Update Bug
```bash
curl -X PUT http://localhost:5000/api/bugs/BUG_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "status": "in-progress"
  }'
```

### Test Delete Bug
```bash
curl -X DELETE http://localhost:5000/api/bugs/BUG_ID \
  -H "Authorization: Bearer TOKEN"
```

---

## 📊 Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid data |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Not allowed |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Server problem |

---

## 🔍 Testing in Postman

1. Download Postman from https://www.postman.com/downloads/
2. Create new collection "Bug Tracker"
3. Add these requests:

**Register:**
- Method: POST
- URL: http://localhost:5000/api/auth/register
- Body (JSON): 
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "Password123"
  }
  ```

**Login:**
- Method: POST
- URL: http://localhost:5000/api/auth/login
- Body (JSON):
  ```json
  {
    "email": "test@example.com",
    "password": "Password123"
  }
  ```

**Get Bugs:**
- Method: GET
- URL: http://localhost:5000/api/bugs
- Headers: 
  - Key: Authorization
  - Value: Bearer {TOKEN_FROM_LOGIN}

**Create Bug:**
- Method: POST
- URL: http://localhost:5000/api/bugs
- Headers:
  - Key: Authorization
  - Value: Bearer {TOKEN}
- Body (JSON):
  ```json
  {
    "title": "New Bug",
    "description": "Description here",
    "priority": "high"
  }
  ```

---

## ✅ Common Workflows

### Workflow 1: New User Creates a Bug

1. **Register**
   - POST /auth/register with name, email, password
   - Get token from response

2. **Create Bug**
   - POST /bugs with token in header
   - Include title, description, priority

3. **View Bugs**
   - GET /bugs with token in header

### Workflow 2: Update and Delete

1. **Get Bugs**
   - GET /bugs (get bug IDs)

2. **Update Bug**
   - PUT /bugs/:id with new status/priority

3. **Delete Bug**
   - DELETE /bugs/:id

---

## 🐛 Error Examples

### Invalid Email
```json
{
  "success": false,
  "message": "email: Please provide a valid email",
  "status": 400
}
```

### Password Too Short
```json
{
  "success": false,
  "message": "password: Password must be at least 6 characters",
  "status": 400
}
```

### Invalid Priority
```json
{
  "success": false,
  "message": "priority: Invalid priority value",
  "status": 400
}
```

### No Token
```json
{
  "success": false,
  "message": "Not authorized to access this route",
  "status": 401
}
```

### Bug Not Found
```json
{
  "success": false,
  "message": "Bug not found",
  "status": 404
}
```

---

## ⚡ Quick Reference

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| /auth/register | POST | ❌ | Create account |
| /auth/login | POST | ❌ | Login |
| /bugs | GET | ✅ | Get all bugs |
| /bugs | POST | ✅ | Create bug |
| /bugs/:id | GET | ✅ | Get one bug |
| /bugs/:id | PUT | ✅ | Update bug |
| /bugs/:id | DELETE | ✅ | Delete bug |

---

**API Version:** 1.0
**Last Updated:** November 2025