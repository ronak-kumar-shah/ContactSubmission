Contact Submission App
A full-stack application for submitting and displaying contact information. It features a front-end built with React and Material UI, along with a back-end API for handling the submission of contact data.

Setup & Running Instructions
Prerequisites
Node.js and npm installed:

Download Node.js from here.

Verify installation:

node -v
npm -v
.NET Core SDK for the backend:

Download and install the .NET SDK from here.

PostgreSQL (if using PostgreSQL as the database) or configure your own database in the backend.

Folder structure :
contact-app/
├── backend/
│ └── ContactApi/
├── frontend/
│ └── [React app here]
├── docker-compose.yml
└── README.md

**Backend (API)**
Navigate to the backend folder:

cd contact-app-backend
Install required packages:

dotnet restore
Build and run the API:

dotnet run
The API should be running on http://localhost:5203.

Frontend (React App)
Navigate to the frontend folder:

cd contact-app-frontend
Install dependencies:

npm install
Start the React app:

npm start
The React app should now be running on http://localhost:3000.

Environment Variables
For configurable settings, such as retry count for API requests, create a .env file in the frontend directory and set the following variables:

REACT_APP_MAX_API_RETRIES=3
REACT_APP_RETRY_DELAY_MS=1500

API Overview
Endpoints
GET /api/contacts: Fetch all contacts.

POST /api/contacts: Submit a new contact.

The API expects the following JSON payload for the POST request:

{
"name": "Ronak Shah",
"email": "ronak.shah@example.com",
"phone": "+1234567890"
}
Tech Stack
Frontend:

React.js (with TypeScript)

Material UI (MUI) for UI components

Axios for making HTTP requests

Backend:

ASP.NET Core (C#)

PostgreSQL (or other database, depending on configuration)

Other:

Docker (for containerization)

Snackbar (for displaying success/error messages)

Design Decisions
API Retry Logic: The API uses an automatic retry mechanism for failed submissions (due to network issues or server downtime). This is configured in the frontend with a retry count of 3 by default, which can be modified using the .env file.

UI Framework: Material UI (MUI) was chosen for its ready-to-use components and customizable theming. This speeds up development while providing a polished user interface.

Backend Data Storage: We use PostgreSQL as the default database. The API handles CRUD operations on the contacts, and it's extendable for future use cases.

Error Handling: If the backend service is down or an error occurs while submitting a contact, the application will display a Snackbar with an error message and automatically retry the submission a configurable number of times.

Future Improvements

Authentication: Add user authentication using OAuth or JWT tokens for secure access to the contact submission system.

Advanced Validation: Implement more robust form validation on the frontend (email format, phone number format, etc.) and backend.

Pagination and Filtering: For displaying a large number of contacts, we can add pagination, sorting, and filtering options.

Unit and Integration Tests: Add unit tests for frontend components and backend API endpoints to ensure stability and reliability.

UI Enhancements: Improve UI further by adding animations, improving accessibility, and enhancing responsiveness for mobile devices.

State Management: As the application grows, consider using a state management library (like Redux or React Query) to handle more complex state and API interactions.

Containerization for Backend: Containerize the backend API using Docker to simplify deployment and scaling.
