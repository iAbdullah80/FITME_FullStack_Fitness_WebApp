# CS346 Project

This is a full-stack web application built for the CS346 course. The front-end is developed using HTML, CSS, JavaScript, and EJS (Embedded JavaScript) templating engine, while the back-end is built with Node.js, Express.js, and MongoDB, other dependencies (as listed in your package.json).

## Features

- User authentication (local and social logins)
  - Local login with email and password
  - Social logins (Google, Facebook, Microsoft)
- User dashboard
    - BMR, BMI calculator
    - Workout plan
    - Diet meals plan

## Prerequisites

Before you can run this application, you need to have the following software installed on your machine:

- Node.js (v12 or later)
- npm (Node Package Manager, comes bundled with Node.js)
- MongoDB (or a MongoDB Atlas cluster)

## Installation

1. Clone the repository:
```
git clone https://github.com/MushalMohammed1/my-website.git
```
2. Navigate to the project directory:
```
cd my-website
```
3. Install the dependencies:
```
npm install
```
4. Create a .env file in the project root directory and add the following environment variables:
```
MONGODB_URI=<your_mongodb_uri>
SESSION_SECRET=<your_session_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_CALLBACK_URL=<google_callback_url>
FACEBOOK_CLIENT_ID=<your_facebook_CLIENT_id>
FACEBOOK_CALLBACK_URL=<facebook_callback_url>
FACEBOOK_CLIENT_SECRET=<your_facebook_CLIENT_secret>
MICROSOFT_CLIENT_ID=<your_microsoft_client_id>
MICROSOFT_CLIENT_SECRET=<your_microsoft_client_secret>
MICROSOFT_CALLBACK_URL=<microsoft_callback_url>
```
Replace the placeholders with your actual values.

## Running the Application
To start the application, run the following command:
```
npm start
```
This will start the Node.js server and make the application available at http://localhost:5000 (or any other port specified in the code).