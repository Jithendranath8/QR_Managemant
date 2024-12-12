---

# **QR Code Management Platform**

This project provides a platform for managing and tracking QR codes, allowing users to generate static and dynamic QR codes, update their URLs, and track events related to those codes. It also provides analytics on QR code usage, such as event counts and location-based statistics.

## **Tech Stack**

- **Backend**: Node.js, Express.js
- **Database**: MySQL, Prisma ORM
- **Authentication**: JWT, bcrypt
- **QR Code Generation**: qrcode library
- **Analytics**: Custom analytics services

## **API Documentation**

### **Authentication Routes**

#### 1. **Register User**  
- **Endpoint**: `POST /auth/register`
- **Request**:
  ```json
  {
    "name": "James",
    "email": "james@example.com",
    "password": "secretpassword123"
  }
  ```
- **Response**:
  - **Success** (`201 Created`):
    ```json
    {
      "id": "user-id-12345",
      "email": "james@example.com",
      "name": "James",
      "createdAt": "2024-11-30T12:00:00.000Z",
      "updatedAt": "2024-11-30T12:00:00.000Z"
    }
    ```
  - **Error** (`400 Bad Request`):
    ```json
    {
      "error": "User Already Exists"
    }
    ```

#### 2. **Login User**  
- **Endpoint**: `POST /auth/login`
- **Request**:
  ```json
  {
    "email": "james@example.com",
    "password": "secretpassword123"
  }
  ```
- **Response**:
  - **Success** (`200 OK`):
    ```json
    {
      "token": "jwt-token-xyz"
    }
    ```
  - **Error** (`400 Bad Request`):
    ```json
    {
      "error": "Invalid email or password."
    }
    ```

#### 3. **Get User Profile**  
- **Endpoint**: `GET /auth/me`
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Response**:
  - **Success** (`200 OK`):
    ```json
    {
      "id": "user-id-12345",
      "email": "james@example.com",
      "name": "James",
      "createdAt": "2024-11-30T12:00:00.000Z",
      "updatedAt": "2024-11-30T12:00:00.000Z"
    }
    ```
  - **Error** (`401 Unauthorized`):
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

### **QR Code Routes**

#### 1. **Create Static QR Code**  
- **Endpoint**: `POST /qr/static`
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Request**:
  ```json
  {
    "url": "https://example.com",
    "metadata": { "type": "static", "description": "Static QR Code" }
  }
  ```
- **Response**:
  - **Success** (`201 Created`):
    ```json
    {
      "id": "qr-code-id-12345",
      "qrImage": "data:image/png;base64,...."
    }
    ```

#### 2. **Create Dynamic QR Code**  
- **Endpoint**: `POST /qr/dynamic`
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Request**:
  ```json
  {
    "url": "https://example.com",
    "metadata": { "type": "dynamic", "description": "Dynamic QR Code" }
  }
  ```
- **Response**:
  - **Success** (`201 Created`):
    ```json
    {
      "id": "qr-code-id-54321",
      "qrImage": "data:image/png;base64,...."
    }
    ```

#### 3. **Update Dynamic QR Code**  
- **Endpoint**: `PUT /qr/:id`
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Request**:
  ```json
  {
    "url": "https://updated-example.com"
  }
  ```
- **Response**:
  - **Success** (`200 OK`):
    ```json
    {
      "message": "QR Code updated successfully."
    }
    ```

#### 4. **Track QR Code Event**  
- **Endpoint**: `POST /qr/:id/track`
- **Request**:
  ```json
  {
    "timestamp": "2024-11-30T12:00:00.000Z",
    "location": { "lat": 12.34, "lng": 56.78 },
    "deviceInfo": { "os": "iOS", "browser": "Safari" },
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0"
  }
  ```
- **Response**:
  - **Success** (`200 OK`):
    ```json
    {
      "message": "Event tracked successfully."
    }
    ```

#### 5. **Get QR Code Events**  
- **Endpoint**: `GET /qr/:id/events`
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Response**:
  - **Success** (`200 OK`):
    ```json
    [
      {
        "id": "event-id-12345",
        "timestamp": "2024-11-30T12:00:00.000Z",
        "location": { "lat": 12.34, "lng": 56.78 },
        "deviceInfo": { "os": "iOS", "browser": "Safari" },
        "ipAddress": "192.168.1.1",
        "userAgent": "Mozilla/5.0"
      }
    ]
    ```

---

### **Analytics Routes**

#### 1. **Get QR Code Analytics**  
- **Endpoint**: `GET /qr/:id/analytics?from=2024-11-01&to=2024-11-30`
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Response**:
  - **Success** (`200 OK`):
    ```json
    {
      "totalEvents": 100,
      "eventsByLocation": {
        "London": 50,
        "Tokyo": 30,
        "New York": 20
      }
    }
    ```
  - **Error** (`400 Bad Request`):
    ```json
    {
      "message": "Missing 'from' or 'to' query parameters."
    }
    ```
  - **Error** (`403 Forbidden`):
    ```json
    {
      "error": "Unauthorized or invalid QR Code."
    }
    ```

---

## **Setting Up the Project**

### 1. **Clone the Repository**
```bash
git clone <repo-url>
cd <repo-folder>
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Set up Environment Variables**

Create a `.env` file and set the following environment variables:
- `DATABASE_URL`: MySQL database connection string
- `JWT_SECRET`: Secret key for JWT signing

### 4. **Run the Application**
```bash
npm start
```
The server will run at `http://localhost:3000`.

---