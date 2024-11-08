# Social Media API

A RESTful API built with Node.js, Express, and MongoDB for managing user accounts and blog posts. Users can sign up, log in, and create, update, delete, and view blogs. This API is designed for a social media platform where users can share blog posts.

## Features

- **User Authentication**: Signup and login with JWT-based authentication.
- **Blog Management**: Create, update, delete, and view blogs.
- **User Profiles**: View blogs posted by specific users.
- **Error Handling**: Graceful handling of errors with relevant status codes.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose


## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jameskayode/social-media-API.git
   cd social-media-api

   Install dependencies:

2. npm install

Set up environment variables. Create a .env file in the root directory and add the following:

PORT=5000
MONGODB_URI=your_mongodb_connection_string


3. Start the server:

    npm start

    The server will run on http://localhost:5000.

4. API Endpoints
User Authentication
Sign Up

    Endpoint: /api/auth/signup

    Method: POST

    Request Body:

{
  "name": "User Name",
  "email": "user@example.com",
  "password": "yourpassword"
}

Response:

    {
      "message": "User registered successfully",
      "user": {
        "id": "user_id",
        "name": "User Name",
        "email": "user@example.com"
      }
    }

5. Login

    Endpoint: /api/auth/login

    Method: POST

    Request Body:

{
  "email": "user@example.com",
  "password": "yourpassword"
}

Response:

    {
      "message": "Login successful",
      "token": "your_jwt_token"
    }

6. Blog Management
Get All Blogs

    Endpoint: /api/blogs

    Method: GET

    Response:

    {
      "blogs": [
        {
          "id": "blog_id",
          "title": "Blog Title",
          "content": "Blog content here...",
          "author": "user_id",
          "createdAt": "2024-01-01T00:00:00.000Z"
        }
      ]
    }

7. Get Blogs by User ID

    Endpoint: /api/blogs/user/:userId
    Method: GET

Create a Blog

    Endpoint: /api/blogs

    Method: POST

    Request Body:

    {
      "title": "New Blog Title",
      "content": "Blog content here...",
      "image": "image_url",
      "author": "user_id"
    }

8. Update a Blog

    Endpoint: /api/blogs/:id
    Method: PUT

9. Delete a Blog

    Endpoint: /api/blogs/:id
    Method: DELETE

Error Handling

    404: Not Found – when a requested resource does not exist.
    500: Internal Server Error – for general server errors.


Author

Developed by Your Joseph James Kayode. Contributions, issues, and feature requests are welcome!
