### API Endpoints:

#### **User Management:**

- **POST** `/signup` - For user registration.
- **POST** `/login` - For user authentication.
- **GET** `/profile` - To retrieve user profile information.

#### **Project Management:**

- **POST** `/projects` - To create a new project.
- **GET** `/projects` - To list all projects for a user.
- **GET** `/projects/{id}` - To get details of a specific project.
- **PUT** `/projects/{id}` - To update a specific project.
- **DELETE** `/projects/{id}` - To delete a specific project.

#### **Task Management:**

- **POST** `/projects/{id}/tasks` - To create a task under a project.
- **GET** `/projects/{id}/tasks` - To list tasks under a project.
- **GET** `/tasks/{id}` - To get details of a specific task.
- **PUT** `/tasks/{id}` - To update a specific task.
- **DELETE** `/tasks/{id}` - To delete a specific task.

#### **Gantt Chart:**

- **GET** `/projects/{id}/gantt` - To generate and retrieve the Gantt chart for a project.
