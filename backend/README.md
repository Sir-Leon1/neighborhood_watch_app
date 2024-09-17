
# Neighborhood Watch App - Backend

This is the backend API for the **Neighborhood Watch App**, which serves as the core functionality for managing user accounts, reporting incidents, handling authentication, and providing administrative control. This service is built with Flask and SQLAlchemy to handle all core operations, and is designed to be modular and easy to extend.

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Services](#services)
7. [Database Models](#database-models)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)

---

## Requirements

- Python 3.8 or higher
- Flask
- SQLAlchemy
- PostgreSQL or MySQL
- Docker & Docker Compose (for containerized deployment)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/username/neighborhood-watch-backend.git
cd neighborhood-watch-backend
```

### 2. Set up a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up the database

Create a PostgreSQL or MySQL database and update the configuration in `.env` (see [Configuration](#configuration)).

### 5. Initialize the database

```bash
flask db upgrade
```

This will run the database migrations and set up the necessary tables.

### 6. Run the application

```bash
flask run
```

By default, the app will run on `http://127.0.0.1:5000/`.

## Configuration

The application configuration is stored in an `.env` file. Here's an example of the necessary environment variables:

```
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
SQLALCHEMY_DATABASE_URI=postgresql://username:password@localhost/db_name
JWT_SECRET_KEY=your-jwt-secret-key
```

Make sure to update the values based on your environment.

## Usage

The backend provides a RESTful API to handle user registration, incident reporting, user authentication, and more. It also supports administrative tasks such as role assignments.

To interact with the backend, you can use Postman or cURL to send requests to the endpoints listed in the [API Endpoints](#api-endpoints) section.

---

## API Endpoints

### **Authentication**

- **POST /api/auth/login**: Logs a user in and returns a JWT.
- **POST /api/auth/register**: Registers a new user.

### **User Management**

- **GET /api/users/:id**: Fetches user details by user ID.
- **PUT /api/users/:id**: Updates a user's profile information.
- **DELETE /api/users/:id**: Deletes a user.

### **Incident Management**

- **POST /api/incidents**: Reports a new incident.
- **GET /api/incidents**: Retrieves all reported incidents.
- **GET /api/incidents/:id**: Retrieves a specific incident by ID.
- **PUT /api/incidents/:id**: Updates an incident.
- **DELETE /api/incidents/:id**: Deletes an incident.

### **Settings**

- **GET /api/settings**: Retrieves application settings.
- **PUT /api/settings**: Updates application settings.

### **Admin**

- **GET /api/admin/overview**: Provides an overview of user and system activity.
- **POST /api/admin/assign-role**: Assigns a role to a user.

For more detailed descriptions of all available API routes, refer to the [API Documentation](docs/API.md).

---

## Services

The application logic is decoupled from the routing logic using service layers. Each service is responsible for interacting with the database and performing necessary business logic.

- **UserService**: Handles user registration, login, profile management, and deletion.
- **IncidentService**: Handles reporting, updating, and retrieving incidents.
- **AuthService**: Handles JWT token generation and validation.
- **SettingsService**: Manages global app settings.
- **AdminService**: Handles administrative tasks like role management.

---

## Database Models

The following are the primary models used in the application:

- **User**: Stores user information, including username, email, and password hash.
- **Incident**: Stores details of reported incidents, such as the title, description, and date of the report.
- **Role**: Defines the user roles within the system, including basic user and admin roles.
- **Settings**: Stores application settings and user preferences.

Each model is defined in `models/` and integrated with SQLAlchemy.

---

## Testing

Testing is a crucial part of this application. We use `pytest` for running unit tests and integration tests.

### Running tests

```bash
pytest
```

Tests are written for the following parts of the application:
- User registration and authentication
- Incident reporting and management
- Admin features

### Test Coverage

To check the test coverage:

```bash
pytest --cov=services
```

This command will provide a coverage report for all service layer logic.

---

## Deployment

For production deployment, we recommend using **Docker** and **Docker Compose** for containerized environments.

### 1. Build the Docker image

```bash
docker-compose build
```

### 2. Run the containers

```bash
docker-compose up -d
```

This will launch the application in production mode along with a database container.

You can find the deployment configuration in `docker-compose.yml`.

---

## Contributing

If you would like to contribute to the project, feel free to submit a pull request or open an issue in the GitHub repository.

### Setting up development environment

1. Fork the repository.
2. Clone your forked repository:

```bash
git clone https://github.com/your-username/neighborhood-watch-backend.git
cd neighborhood-watch-backend
```

3. Install the dependencies as described in the [Installation](#installation) section.

### Coding Guidelines

- Follow PEP 8 standards for Python code.
- Ensure all code is properly tested using `pytest`.
- Add clear and concise comments where necessary.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This backend API is built with scalability and security in mind, providing a robust foundation for your Neighborhood Watch application.
