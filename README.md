# Polling Application

## Overview

This project is a full-stack web application that enables users to create, vote on, and view poll results. The application allows users to register, log in, and manage polls through a user-friendly dashboard.

## Features

- **User Authentication**: Secure login and registration system.
- **Poll Creation**: Users can create new polls with multiple voting options.
- **Voting System**: Users can participate in polls by submitting their votes.
- **Results Visualization**: Poll results are displayed in both text and graphical formats.
- **Past Polls Access**: Users can review and analyze past poll results.
- **Interactive Dashboard**: Centralized interface for managing polls and accessing features.

## Technologies Used

### Frontend

- **React.js**: Handles UI components and client-side logic.
- **React Router**: Manages navigation between pages.
- **Plotly.js**: Used for visualizing poll results.

### Backend

- **Node.js & Express.js**: Implements server-side logic and API endpoints.
- **MongoDB & Mongoose**: Handles data storage and retrieval.
- **JWT & bcrypt.js**: Provides authentication and password encryption.

## Project Structure

```
/ - Root Directory
  ├── client/ - Frontend Code
  │   ├── pages/
  │   │   ├── Dashboard.jsx
  │   │   ├── CreatePoll.jsx
  │   │   ├── VotingPage.jsx
  │   │   ├── Confirmation.jsx
  │   │   ├── Login-Page.jsx
  │   │   ├── Register.jsx
  │   │   ├── PastPolls.jsx
  │   │   ├── Results.jsx
  │   │   ├── PastPolls-Graph.jsx
  │   │   ├── Results-Graph.jsx
  │   ├── App.jsx - Main entry point
  ├── server/ - Backend Code
  │   ├── controllers/
  │   │   ├── authenticationController.js
  │   │   ├── pollController.js
  │   ├── models/
  │   │   ├── users.js
  │   ├── routes/
  │   │   ├── routers.js
  │   ├── server.js - Main backend entry point
  ├── package.json - Dependencies and scripts
  ├── README.md - Documentation
```

## API Endpoints

### Authentication

- `POST /user/login` - Authenticates a user.
- `POST /user/register` - Registers a new user.

### Poll Management

- `POST /user/create-poll` - Creates a new poll.
- `GET /user/pastpolls/:username` - Retrieves past polls created by a user.
- `GET /user/voting-page/:code` - Fetches poll details for voting.
- `PATCH /user/updated-votes` - Updates poll votes.
- `GET /user/results/:code` - Retrieves results of a specific poll.

## User Flow

1. **User Registration & Login**
   - New users register using a username and password.
   - Existing users log in to access their dashboard.
2. **Dashboard Management**
   - Users can create a new poll or enter a poll code to vote.
   - Users can view past polls and analyze previous results.
3. **Creating a Poll**
   - Users define a poll name and add multiple topics for voting.
   - Polls are assigned a unique code for sharing.
4. **Voting Process**
   - Users enter a poll code to participate.
   - Votes are submitted and updated in the database.
5. **Viewing Results**
   - Users can view text-based rankings or graphical representations of poll results.
   - Results can be accessed immediately after voting.

## Security Considerations

- **User passwords are hashed** using bcrypt.js before storing in the database.
- **JWT authentication** is used to maintain user sessions securely.
- **Input validation** prevents unauthorized or incorrect data submissions.


## Contributors

- Developed by the Goblin Sharks, iterated on by the VelociRabbits

## License

This project is licensed under the MIT License.

