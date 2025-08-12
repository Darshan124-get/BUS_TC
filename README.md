# TC Panel (Version 1.0)

![TC Panel Logo](./assets/logo.png)

TC Panel is a web-based management system for transportation companies to manage their buses, routes, and assignments.

## Features

- **Bus Management**: Add, edit, and delete buses with vehicle numbers and other details
- **Route Management**: Create and manage routes with source, destination, and stages
- **Assignment Management**: Assign buses to routes with specific dates and departure times
- **User Authentication**: Secure login system for administrators

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Setup

1. Clone the repository
   ```
   git clone <repository-url>
   cd tc_panel
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Configure environment variables
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/tc_panel
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRE=30d
     ```

4. Create default admin user
   ```
   npm run create-admin
   ```

5. Start the backend server
   ```
   npm start
   ```

6. Access the application
   - Open `frontend/index.html` in your browser
   - Or serve the frontend files using a static file server

## Usage

1. Login with the default admin credentials (username: admin, password: password)
2. Navigate through the sidebar to manage buses, routes, and assignments
3. Add buses with their details
4. Create routes with source, destination, and stages
5. Assign buses to routes with specific dates and times

## Screenshots

- Dashboard
- Bus Management
- Route Management
- Assignment Management

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- [Your Name](https://github.com/yourusername)# BUS_TC
