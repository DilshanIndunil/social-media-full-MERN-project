# Social Media Full MERN Project

## Overview

This is a full-stack social media application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a platform for users to post updates, share images, and interact with other users.

### Usage
 1. Register: Create a new user account.
 2. Login: Use your credentials to log in.
 3. Create a Post: Share updates or images.
 4. Interact: Like, comment, and view posts from other users.

## Features

- User authentication and authorization
- Create, edit, and delete posts
- Upload images
- Comment and like posts
- Responsive design

## Tech Stack

- **Frontend:**
  - React
  - Material-UI
  - React Router

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Other:**
  - JWT for authentication
  - Multer for image storage
  - Redux for state management


![photo-collage png (3)](https://github.com/user-attachments/assets/2ad5b068-1b93-4e22-a87c-54f99706fa08)




## Installation

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js and npm
- MongoDB (or access to a MongoDB instance)

### Clone the Repository

```bash
git clone https://github.com/DilshanIndunil/social-media-full-MERN-project.git
cd social-media-full-MERN-project
```

## Install Dependencies

### Backend

Navigate to the backend directory and install the dependencies:

```bash
cd server
npm install
```

### Frontend

Navigate to the frontend directory and install the dependencies:

```bash
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```bash
MONGO_URI=mongodb+srv://dummyuser:dummyuser123@cluster0.xytp8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET='jwtsecret'
PORT=3001
```

![photo-collage png (4)](https://github.com/user-attachments/assets/c489a0bf-8359-402a-90cc-7edec2a29bae)



## Start the Development Server

## Backend

```bash
cd server
Node index.js
```

## Frontend

Open a new terminal, navigate to the frontend directory, and start the development server:

```bash
cd ../client
npm start
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:3001

## Contributing
  1. Fork the repository.
  2. Create a new branch (git checkout -b feature-branch).
  3. Commit your changes (git commit -am 'Add new feature').
  4. Push to the branch (git push origin feature-branch).
  5. Create a new Pull Request.


