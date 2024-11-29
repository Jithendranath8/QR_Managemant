QR Code Management Platform - API Documentation
Overview
The QR Code Management Platform provides a comprehensive API to manage user authentication, generate static and dynamic QR codes, track QR code events, and analyze data. This document outlines all the endpoints, request structures, and expected responses.

Authentication Endpoints
1. Register User
URL: /api/auth/register
Method: POST
Description: Register a new user to the platform.
Request Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
Success Response (200):
json
Copy code
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
2. Login
URL: /api/auth/login
Method: POST
Description: Login and obtain a JWT token for authorization.
Request Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "securepassword123"
}
Success Response (200):
json
Copy code
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
3. Get Current User
URL: /api/auth/me
Method: GET
Headers:
makefile
Copy code
Authorization: Bearer <token>
Description: Retrieve details of the currently logged-in user.
Success Response (200):
json
Copy code
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2023-12-20T10:00:00.000Z"
}
QR Code Endpoints
1. Generate Static QR Code
URL: /api/qr/static
Method: POST
Headers:
makefile
Copy code
Authorization: Bearer <token>
Description: Create a static QR code that links to a fixed URL.
Request Body:
json
Copy code
{
  "url": "https://example.com",
  "metadata": {
    "name": "Product Page QR",
    "description": "Links to main product page"
  }
}
Success Response (200):
json
Copy code
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
2. Generate Dynamic QR Code
URL: /api/qr/dynamic
Method: POST
Headers:
makefile
Copy code
Authorization: Bearer <token>
Description: Create a dynamic QR code with modifiable URL and metadata.
Request Body:
json
Copy code
{
  "url": "https://example.com/promo",
  "metadata": {
    "name": "Promotional QR",
    "campaign": "Winter Sale 2023"
  }
}
Success Response (200):
json
Copy code
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
3. Update Dynamic QR Code
URL: /api/qr/{id}/update
Method: PUT
Headers:
makefile
Copy code
Authorization: Bearer <token>
Description: Update the URL of a dynamic QR code.
Request Body:
json
Copy code
{
  "url": "https://example.com/new-promo"
}
Success Response (200):
json
Copy code
{
  "id": "qr_id",
  "type": "DYNAMIC",
  "currentUrl": "https://example.com/new-promo",
  "metadata": "{\"name\":\"Promotional QR\",\"campaign\":\"Winter Sale 2023\"}",
  "userId": "user_id",
  "updatedAt": "2023-12-20T10:05:00.000Z"
}
4. Track QR Code Scan
URL: /api/qr/{id}/track
Method: POST
Description: Log events when a QR code is scanned.
Request Body:
json
Copy code
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
Success Response (200):
json
Copy code
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
5. Get QR Code Events
URL: /api/qr/{id}/events
Method: GET
Headers:
makefile
Copy code
Authorization: Bearer <token>
Description: Retrieve all scan events for a specific QR code.
Success Response (200):
json
Copy code
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
Analytics Endpoints
1. Get QR Code Analytics
URL: /api/analytics/{id}
Method: GET
Headers:
makefile
Copy code
Authorization: Bearer <token>
Query Parameters:
startDate: ISO date string (optional)
endDate: ISO date string (optional)
Description: Retrieve analytics for a QR code, including scans, user devices, and geographic distribution.
Success Response (200):
json
Copy code
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
  "dailyTrends": [
    {
      "date": "2023-12-19",
      "count": 75
    },
    {
      "date": "2023-12-20",
      "count": 75
    }
  ]
}
Error Responses
Common Error Formats:
400 Bad Request:
json
Copy code
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid input data"
}
401 Unauthorized:
json
Copy code
{
  "status": "error",
  "code": "UNAUTHORIZED",
  "message": "Authentication required"
}
404 Not Found:
json
Copy code
{
  "status": "error",
  "code": "NOT_FOUND",
  "message": "Resource not found"
}
