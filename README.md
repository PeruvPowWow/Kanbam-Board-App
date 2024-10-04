# Kanban-Board-App

## Overview

This project is a Kanban board web application designed to manage tasks efficiently while ensuring secure access through JWT (JSON Web Token) authentication. The application allows users to log in, manage tasks on the Kanban board, and maintain secure user sessions with JWT-based authentication.

## Description

The Kanban board application enables users to organize tasks visually using a column-based layout. Each task can be categorized under various stages such as "To Do," "In Progress," and "Done." The application ensures security through JWT authentication, requiring users to log in before accessing the board. Key features include secure login, JWT-based session management, and a responsive user interface for easy task management.

Key Features

Secure Authentication: Users must log in with a username and password.
JWT Authorization: JWT is used to manage authenticated sessions, and tokens are stored in localStorage.
Task Management: Users can add, update, and manage tasks within different columns on the Kanban board.
Logout Functionality: Users can securely log out, which removes their JWT token from local storage.
Session Timeout: Tokens expire after a specified time, requiring users to log in again after inactivity.

## Changes Made

Integrated JWT-based authentication for user login.
Added middleware to protect API routes using JWT verification.
Developed secure login functionality with hashed password comparison using bcrypt.
Implemented a simple UI for login and task management on the Kanban board.
Added token expiration logic to handle automatic logout upon inactivity.

## Mock-Up Comparison

The final implementation is close to the provided mock-up for the Kanban board functionality and design. The primary difference is in user authentication, where JWT has been added for enhanced security.

## Installation

Prerequisites:
Node.js (v14+)
npm (v6+)

## Setup:

1. Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/Kanban-Board-App.git
cd Kanban-Board-App

2. Install dependencies for both the client and server:

bash
Copy code
npm install
cd client && npm install
cd ../server && npm install

3. Create a .env file in the server directory with the following:

makefile
Copy code
JWT_SECRET=your-secret-key
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password

4. Setup the database and run migrations if applicable.

## Starting the Application

1. Server: Start the backend server with:

bash
Copy code
cd server
npm run dev

2. Client: In a separate terminal, start the frontend:

bash
Copy code
cd client
npm start

3. Access the application at http://localhost:3000 in your browser.

## Technologies Used

Frontend: React, TypeScript, CSS
Backend: Node.js, Express, TypeScript, Sequelize
Database: PostgreSQL or MySQL (can be configured)
Authentication: JWT (JSON Web Tokens)
Password Security: bcrypt for password hashing
Deployment: Render or Netlify for the client, Render for the server

## Testing

To run tests (if applicable), you can use:

bash
Copy code
npm test

## Future Improvements

Task Sorting and Filtering: Add functionality to sort and filter tasks within the Kanban board.
Token Refreshing: Implement token refreshing to extend user sessions without requiring frequent logins.
User Management: Allow users to create accounts, reset passwords, and update profile information.

## Conclusion

This Kanban board project provides a task management tool with enhanced security using JWT authentication. The application is scalable and can be expanded with features such as user management and advanced task filtering.

## Links

Repository URL: GitHub Repository
Deployed Application: Live URL