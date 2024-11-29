```markdown
# QR Code Management Platform

A comprehensive API to manage QR codes, including generating static and dynamic QR codes, tracking their usage, and viewing analytics. This platform is designed for users to seamlessly integrate QR code functionality into their applications.

---

## Table of Contents

- [Authentication Endpoints](#authentication-endpoints)
  - [Register User](#1-register-user)
  - [Login](#2-login)
  - [Get Current User](#3-get-current-user)
- [QR Code Endpoints](#qr-code-endpoints)
  - [Generate Static QR Code](#1-generate-static-qr-code)
  - [Generate Dynamic QR Code](#2-generate-dynamic-qr-code)
  - [Update Dynamic QR Code](#3-update-dynamic-qr-code)
  - [Track QR Code Scan](#4-track-qr-code-scan)
  - [Get QR Code Events](#5-get-qr-code-events)
  - [Get User's QR Codes](#6-get-users-qr-codes)
- [Analytics Endpoints](#analytics-endpoints)
  - [Get QR Code Analytics](#1-get-qr-code-analytics)
- [Error Responses](#error-responses)

---

## Authentication Endpoints

### 1. Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "John Doe"
  }
  ```
- **Response (200)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### 2. Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### 3. Get Current User
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Response (200)**:
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2023-12-20T10:00:00.000Z"
  }
  ```

---

## QR Code Endpoints

### 1. Generate Static QR Code
- **URL**: `/api/qr/static`
- **Method**: `POST`
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**:
  ```json
  {
    "url": "https://example.com",
    "metadata": {
      "name": "Product Page QR",
      "description": "Links to main product page"
    }
  }
  ```
- **Response (200)**:
  ```json
  {
    "qrCode": {
      "id": "qr_id",
      "type": "STATIC",
      "currentUrl": "https://example.com",
      "metadata": "{\"name\":\"Product Page QR\",\"description\":\"Links to main product page\"}",
      "userId": "user_id",
      "createdAt": "2023-12-20T10:00:00.000Z",
      "updatedAt": "2023-12-20T10:00:00.000Z"
    },
    "qrImage": "data:image/png;base64,..."
  }
  ```

---

### 2. Generate Dynamic QR Code
- **URL**: `/api/qr/dynamic`
- **Method**: `POST`
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**:
  ```json
  {
    "url": "https://example.com/promo",
    "metadata": {
      "name": "Promotional QR",
      "campaign": "Winter Sale 2023"
    }
  }
  ```
- **Response (200)**:
  ```json
  {
    "qrCode": {
      "id": "qr_id",
      "type": "DYNAMIC",
      "currentUrl": "https://example.com/promo",
      "metadata": "{\"name\":\"Promotional QR\",\"campaign\":\"Winter Sale 2023\"}",
      "userId": "user_id",
      "createdAt": "2023-12-20T10:00:00.000Z",
      "updatedAt": "2023-12-20T10:00:00.000Z"
    },
    "qrImage": "data:image/png;base64,..."
  }
  ```

---

### 3. Update Dynamic QR Code
- **URL**: `/api/qr/{id}/update`
- **Method**: `PUT`
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**:
  ```json
  {
    "url": "https://example.com/new-promo"
  }
  ```
- **Response (200)**:
  ```json
  {
    "id": "qr_id",
    "type": "DYNAMIC",
    "currentUrl": "https://example.com/new-promo",
    "metadata": "{\"name\":\"Promotional QR\",\"campaign\":\"Winter Sale 2023\"}",
    "userId": "user_id",
    "updatedAt": "2023-12-20T10:05:00.000Z"
  }
  ```

---

### 4. Track QR Code Scan
- **URL**: `/api/qr/{id}/track`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "location": "New York, US",
    "device": "iPhone",
    "browser": "Safari",
    "ipAddress": "192.168.1.1",
    "metadata": {
      "referrer": "instagram",
      "campaign": "winter_sale"
    }
  }
  ```
- **Response (200)**:
  ```json
  {
    "id": "event_id",
    "qrCodeId": "qr_id",
    "location": "New York, US",
    "device": "iPhone",
    "browser": "Safari",
    "ipAddress": "192.168.1.1",
    "metadata": "{\"referrer\":\"instagram\",\"campaign\":\"winter_sale\"}",
    "timestamp": "2023-12-20T10:10:00.000Z"
  }
  ```

---

### 5. Get QR Code Events
- **URL**: `/api/qr/{id}/events`
- **Method**: `GET`
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Response (200)**:
  ```json
  [
    {
      "id": "event_id",
      "qrCodeId": "qr_id",
      "location": "New York, US",
      "device": "iPhone",
      "browser": "Safari",
      "ipAddress": "192.168.1.1",
      "metadata": "{\"referrer\":\"instagram\",\"campaign\":\"winter_sale\"}",
      "timestamp": "2023-12-20T10:10:00.000Z"
    }
  ]
  ```

---

### 6. Get User's QR Codes
- **URL**: `/api/qr/my-codes`
- **Method**: `GET`
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Response (200)**:
  ```json
  [
    {
      "id": "qr_id",
      "type": "DYNAMIC",
      "currentUrl": "https://example.com/promo",
      "metadata": "{\"name\":\"Promotional QR\",\"campaign\":\"Winter Sale 2023\"}",
      "userId": "user_id",
      "createdAt": "2023-12-20T10:00:00.000Z",
      "updatedAt": "2023-12-20T10:05:00.000Z",
      "_count": {
        "events": 5
      }
    }
  ]
  ```

---

## Analytics Endpoints

### 1. Get QR Code Analytics
- **URL**: `/api/analytics/{id}`
- **Method**: `GET`
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters**:
  - `startDate`: ISO date string (optional)
  - `endDate`: ISO date string (optional)
- **Response (200)**:
  ```json
  {
    "totalScans": 150,
    "uniqueUsers": 120,
    "deviceDistribution": [
      {
        "device": "iPhone",
        "_count": 80
      },
      {
        "device": "Android",
        "_count": 70
      }
    ],
    "geographicDistribution": [
      {
        "location": "New York, US",
        "_count": 50
      },
      {
        "location": "London, UK",
        "_count": 30
      }
    ],
    "dailyTrends":

 [
      {
        "date": "2023-12-15",
        "_count": 20
      },
      {
        "date": "2023-12-16",
        "_count": 35
      }
    ]
  }
  ```

---

## Error Responses

All error responses follow the structure:
```json
{
  "error": "Error message",
  "details": "Additional details if available"
}
```
- **401 Unauthorized**: Missing or invalid token.
- **404 Not Found**: Resource not found.
- **400 Bad Request**: Validation or missing data issues.

---

**Happy Coding! 🎉**
```
