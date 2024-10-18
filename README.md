# Next.js Task Management Application

This is a Next.js application with both frontend and backend functionalities. The app is designed for task management and uses MongoDB for data storage. It is containerized using Docker.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker**: Install Docker to manage containers.
- **MongoDB**: Ensure you have MongoDB set up and accessible.
- **Node.js**: Install Node.js (version 18 or above).
- **npm**: Ensure npm is installed for package management.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DevNinja56/task-management-assessment.git
   cd task-management-assessment
   ```

2. **Install packages**:

   ```bash
   npm install
   ```

3. **Set up your environment variables**: Create a `.env.local` file in the root of your project and add the following keys:

   ```env
   MONGODB_URI=
   NEXTAUTH_SECRET=
   ADMIN_NAME=
   ADMIN_EMAIL=
   ADMIN_PASSWORD=
   ```

4. **Run the application locally**:

   ```bash
   npm run dev
   ```

5. **Seed the database**: Open your browser and navigate to [http://localhost:3000/api/seed](http://localhost:3000/api/seed) to create an admin user. You can then log in using the credentials specified in your `.env.local` file.

## API Documentation

The application includes API documentation that details all available endpoints. Refer to the documentation for information on how to interact with the API.

## Docker Setup

The project includes a Dockerfile for containerization, allowing you to run the application in a production-like environment.
