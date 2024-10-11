# Submission Portal - Assignment GrowthX
Instructions on how to set up and run the Node.js backend application


## Getting Started

Follow these steps to set up and run the application locally:

### 1. Install Dependencies

After cloning the repository, navigate to the project directory and run:

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory by copying the provided `.envSample` file:

```bash
cp .envSample .env
```

Fill in the necessary credentials and configuration values in the .env file with your own details.


### 3. Run the Application

Start the development server:

```bash
npm run dev
```

The application will now be running locally.

## Models

The application uses three primary models:

1. **User**: Upload assignments.
2. **Admin**: Accept or reject assignments
3. **Assignments**: Tasks assigned to users

## Authentication

- JWT (JSON Web Token) is used for authentication
- A JWT token is generated upon successful login or registration

## Input Validation

- `express-validator` validates incoming request data
- Failed validations return appropriate error messages

## Error Handling

- A global error middleware handles errors consistently
- Custom API error classes manage specific error types

## Routes

The application includes separate routes for admin and user functionalities:

### User Routes

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: User login (returns JWT token)
- `GET /api/users/assignments`: Retrieve user assignments (JWT required)

### Admin Routes

- `POST /api/admin/login`: Admin login (returns JWT token)
- `POST /api/admin/assignments`: Create a new assignment (JWT required)
- `GET /api/admin/users`: Retrieve all users (JWT required)

## Testing

Use an API client like Postman or Thunder Client to test the endpoints. 
