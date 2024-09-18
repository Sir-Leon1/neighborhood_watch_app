# Fortress

The **Neighborhood Watch App** is a full-stack web application designed to enhance community security by enabling residents to report incidents, manage users, and receive real-time notifications of suspicious activities. It serves as a digital platform for communities to stay informed, connected, and vigilant about potential security threats.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Requirements](#requirements)
5. [Installation](#installation)
6. [Folder Structure](#folder-structure)
7. [API Documentation](#api-documentation)
8. [Usage](#usage)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Contributing](#contributing)
12. [License](#license)

---

## Overview

This app empowers communities by providing a platform to easily report incidents, such as robberies or vandalism, and receive alerts in real-time. It allows administrators to manage users and settings, ensuring that the right people have access to the right information. The app’s responsive design works across mobile and desktop devices, facilitating easy access for all users.

## Features

- **User Authentication**: Register, log in, and manage user roles with secure authentication mechanisms.
- **Incident Reporting**: Users can report suspicious activities and emergencies directly through the app.
- **User & Incident Management**: Admins have the ability to manage users, incidents, and notification settings.
- **Real-Time Notifications**: Instant alerts for critical events happening in the neighborhood.
- **Responsive Design**: Fully responsive, the app works seamlessly on mobile, tablet, and desktop devices.
- **Settings and Configurations**: Admins can modify global settings and configurations for the app.

---

## Technologies Used

The app is built using the following technologies:

### Frontend:
- **React**: A JavaScript library for building user interfaces, used to create responsive, dynamic pages.
- **React Bootstrap**: For styled components and UI consistency.
- **Axios**: Used to make HTTP requests to the backend API.
- **React Router**: To handle navigation between different pages of the application.
- **Jest** & **React Testing Library**: For unit testing components.

### Backend:
- **Flask**: A Python-based web framework used to build RESTful APIs for the application.
- **SQLAlchemy**: An ORM for managing the app’s interactions with the database.
- **Flask-SocketIO**: For real-time notifications.
- **MySQL**: A relational database used for structured data storage.
- **JWT (JSON Web Tokens)**: For secure authentication.

### Deployment & DevOps:
- **Docker**: To containerize the app and its services for easy deployment.
- **Nginx**: As a web server and reverse proxy for serving the application.
- **Gunicorn**: A WSGI HTTP server for running Python web applications.
- **Docker Compose**: For orchestrating multi-container applications (backend, frontend, and database).
- **GitHub Actions**: For continuous integration and deployment.

---

## Requirements

To run the application, you will need:

- **Node.js** (v14.x or later) and **npm** (for the frontend)
- **Python 3.8+** (for the backend)
- **Docker** and **Docker Compose** (for containerization)
- **MySQL** (v8.x or later)
- **Git** (to clone the repository)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/neighborhood-watch-app.git
cd neighborhood-watch-app
```

### 2. Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
pip install -r requirements.txt
```

### 3. Set up environment variables

Create a `.env` file in both the `frontend/` and `backend/` directories. Here’s an example of the `.env` files:

#### Backend `.env`

```bash
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=mysql+pymysql://user:password@localhost/neighborhood_watch_db
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
```

#### Frontend `.env`

```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### 4. Run the app locally

#### Backend

```bash
cd backend
flask run
```

#### Frontend

```bash
cd frontend
npm start
```

Both the frontend and backend should now be running locally. The frontend will be accessible at `http://localhost:3000` and the backend at `http://localhost:5000`.

---

## Folder Structure

```bash
neighborhood-watch-app/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic
│   │   ├── schemas/         # Input/output validation schemas
│   │   ├── __init__.py      # App initialization
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # React pages
│   │   ├── services/        # API communication
│   │   ├── App.js           # Main React component
│   ├── public/              # Public static files
│   └── package.json         # NPM dependencies
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # Project documentation
```

---

## API Documentation

The backend provides several RESTful API routes for interacting with the app.

### Authentication

- **`POST /api/auth/login`**  
  Logs in a user and returns a JWT token.

- **`POST /api/auth/register`**  
  Registers a new user.

### Incidents

- **`GET /api/incidents`**  
  Retrieves all incidents reported in the community.

- **`POST /api/incidents`**  
  Reports a new incident.

- **`GET /api/incidents/:id`**  
  Fetches details of a specific incident.

### Users

- **`GET /api/users`**  
  Retrieves all users.

- **`GET /api/users/:id`**  
  Fetches a user by their ID.

- **`PATCH /api/users/:id`**  
  Updates user details.

### Notifications

- **`GET /api/notifications`**  
  Retrieves all notifications.

- **`POST /api/notifications`**  
  Sends a notification to the community.

---

## Usage

### Running the development server

To run both the frontend and backend locally, start the backend Flask server first, then run the frontend React app.

```bash
# Run backend
cd backend
flask run

# Run frontend
cd frontend
npm start
```

### Running with Docker

The app can also be run using Docker Compose:

```bash
docker-compose up --build
```

This will start the frontend, backend, and database containers.

---

## Testing

### Backend

To run tests for the backend:

```bash
cd backend
pytest
```

### Frontend

To run frontend tests:

```bash
cd frontend
npm run test
```

---

## Deployment

For deployment, the app uses **Docker** and **GitHub Actions** for CI/CD. The following are supported deployment options:

- **Docker Compose**: For containerized deployments.
- **Cloud providers**: e.g., AWS, GCP, or Heroku.
  
To deploy with Docker:

```bash
docker-compose up --build -d
```

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

By developing the **Neighborhood Watch App**, I aim to provide a community-focused platform that enhances security and keeps residents connected. With an intuitive interface and powerful backend, the app is designed to be both scalable and secure.

