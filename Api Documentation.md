# API Documentation

## API Endpoints

### 1. **Auth**

These endpoints handle user authentication.

- **[...nextauth].js**:
  - Handles dynamic routes for NextAuth.js authentication.
- **signup.js**:
  - Route: `/api/auth/signup`
  - Handles user signup functionality.

### 2. **Notifications**

These endpoints handle notifications for users.

- **index.js**:

  - Route: `/api/notifications`
  - Retrieves all notifications for a user.

- **markAsRead.js**:
  - Route: `/api/notifications/markAsRead`
  - Marks all notifications as read for a user.

### 3. **Tasks**

These endpoints handle task-related operations.

- **[taskId].js**:

  - Route: `/api/tasks/[taskId]`
  - Retrieves, updates, or deletes a specific task by its ID.

- **getTasksByStatus.js**:

  - Route: `/api/tasks/getTasksByStatus`
  - Fetches tasks based on their status (e.g., completed, pending).

- **index.js**:

  - Route: `/api/tasks`
  - Retrieves all tasks for the authenticated user.

- **status.js**:
  - Route: `/api/tasks/status`
  - Updates the status of a task.

### 4. **Users**

These endpoints manage user profiles and data.

- **index.js**:
  - Route: `/api/users`
  - Retrieves user details and handles profile-related operations.

### 5. **Seed**

- **seed.js**:
  - Seeds the database with initial data.
