# mini-twitter-clone
A full stack social networking application

## Deployed link
https://twitter-clone-aks.netlify.app/

## Features
- View the recent twwets/post shared the people user follows
- Sign up using unique username and password
- Login using the registered username and password, with Json Web Token (JWT) authentication
- Logout whenever user wants to
- Share tweets/posts with other users
- Edit the post/tweet shared by you
- Delete the post/tweet shared by you
- View all you shared posts at one place
- Search for people you know on the platform
- Follow other users on the platform
- Unfollow the people user follows with one click
- View all the people you follow at one place

## Local Setup Instructions
- Open your terminal and then type: $ git clone git@github.com:AayushKShrivastava/mini-twitter-clone.git to clones the repository
- Open the cloned repository in any code editor.
- Backend setup
  - cd into the backend folder: $ cd backend
  - Run: npm install
  - create a .env file with following content
    - MONGODB_CONNECTION_STRING = 'your-mongodb-connection-string'
    - JWT_SIGNATURE = 'your-jwt-signature'
  - Run: node src/server.js to start the server
- Frontend setup
  - Now open a new terminal and run: cd frontend
  - Run: npm install
  - Run: npm start to start the react app

## Technology Used
- Node.js
- Express.js
- React
- MongoDb Atlas
- Mongoose
- cyclic.sh
- Netlify
- bcrypt
- Json Web token

