# 📇 Contact Submission App

A full-stack web application for submitting, validating, and retrieving contact information. The project uses **React with Material UI (MUI)** for the frontend and **ASP.NET Core** with an **in-memory database** for the backend. The app enables users to submit contact information via a sleek form and view submitted contacts in a well-styled table — complete with real-time feedback and validations that go beyond standard expectations.

---

## 🚀 How to Run the App

### ✅ Prerequisites
- [.NET SDK](https://dotnet.microsoft.com/en-us/download) (for backend)
- [Node.js & npm](https://nodejs.org/) (for frontend)

### 🛠 Backend Setup (ContactApi)
```bash
cd contact-app-backend/ContactApi
dotnet restore
dotnet run
```
Runs on: `http://localhost:5203`

### 🖥 Frontend Setup
```bash
cd contact-app-frontend
npm install
npm start
```
Runs on: `http://localhost:3000`

---


**Folder structure :**
contact-app/
├── contact-form-backend/
│ └── ContactApi/
├── contact-form-frontend/
│ └── [ReactApplication]
├── docker-compose.yml
└── README.md

**API Overview**

| Method | Endpoint                         | Description                  |
|--------|------------------------------    |------------------------------|
| GET    | `/api/contacts/GetContacts`      | Retrieve all contacts        |
| POST   | `/api/contacts/CreateContact`    | Submit a new contact         |

**Payload example:**
```json
{
  "name": "Ronak Shah",
  "email": "Ronak@gmail.com",
  "phone": "+1234567890"
}
```

**Backend (API)**
**Environment Variables**
For configurable settings, such as retry count for API requests, create a .env file in the frontend directory and set the following variables:

REACT_APP_MAX_API_RETRIES=3
REACT_APP_RETRY_DELAY_MS=1500


**Other:**

Docker (for containerization)
Snackbar (for displaying success/error messages)

---

## 💡 Design Decisions & Assumptions

- **Authentication**: Not implemented, as it was assumed out of scope.  
- **Form Validation**: Client-side validation includes max character limits and format enforcement (e.g., phone numbers accept only digits and `+`, blocking alphabetic input even via copy-paste).  
- **UI Feedback**: Invalid inputs are highlighted in **red**, while valid ones turn **green with a checkmark** after focus loss.  
- **State Management**: Uses `useState` for controlled form inputs and validation handling.  
- **Code Separation**: Validation and sanitization logic are isolated in separate utility functions for clarity and maintainability.  
- **Backend Simplicity**: An **in-memory database using Entity Framework** is used for fast iteration and ease of development.  
- **API Design**: Follows RESTful principles with attribute-based routing (`/api/contacts` for GET/POST).
- **API Retry Logic**: The API uses an automatic retry mechanism for failed submissions (due to network issues or server downtime). This is configured in the frontend with a retry count of 3 by default, which can be modified using the .env file
- **Resilient API Calls**: Implements retry logic with `async/await` and exponential backoff for handling transient failures.
- **Error Handling**: If the backend service is down or an error occurs while submitting a contact, the application will display a Snackbar with an error message and automatically retry the submission a configurable number of times.
- **Configurable Settings**: Retry limits and timeouts are defined in `config.ts` to prevent hardcoded values.  
- **Styling Consistency**: Leverages Material UI’s theming system for a unified look and feel.  
- **Dockerization**: Both frontend and backend are containerized with dedicated Dockerfiles for easy deployment.  
- **API Documentation**: Integrated Swagger (`Swashbuckle.AspNetCore`) for interactive API testing at `/swagger`.  
---

## ⏱ If I Had More Time

- 🔐 Add authentication (JWT or OAuth2).
- 👥 Add role-based authorization with Single Sign-On (SSO) or form-based authentication, enabling dynamic form rendering based on user roles.
- 💾 **Replace in-memory DB with PostgreSQL or SQLite or SQLServer**
- 🧪 Write Unit tests for components and validation logic and integration tests.
- 📊 Pagination and Filtering - For displaying a large number of contacts, we can add pagination, sorting, and filtering options.
- 📄 Improve error handling and API response structure.
- 🧪Advanced Validation- Implement more robust form validation on the frontend (email format, phone number format, etc.) and backend.
- 📦 Setup CI/CD pipeline using GitHub Actions or Azure DevOps.

