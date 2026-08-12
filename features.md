# Blood Bank Management System (MERN Stack)

## Overview
This is a full-stack Blood Bank Management System built using the MERN stack (MongoDB, Express.js, React, Node.js). The application serves as a centralized platform to connect blood donors, patients in need of blood, healthcare organizations, and administrators to seamlessly manage blood donation and acquisition processes.

## Technology Stack

### Frontend
- **React.js (via Vite):** Core UI framework for building a fast and interactive user interface.
- **Tailwind CSS & DaisyUI:** For responsive, modern, and highly customizable styling and pre-built UI components.
- **Redux Toolkit:** Used for predictable state management across the application.
- **React Router Dom:** For client-side routing, featuring role-based route protection.
- **Axios:** For making HTTP requests to the backend API.
- **React Hook Form:** For efficient and validated form handling.
- **Recharts:** For data visualization (likely used in the Admin dashboard for statistics).

### Backend
- **Node.js & Express.js:** Server-side runtime and framework for building scalable RESTful APIs.
- **MongoDB (Mongoose):** NoSQL database for storing user profiles, donation histories, and blood inventory.
- **JWT & Bcrypt:** For secure authentication, authorization, and password hashing.
- **Nodemailer:** For sending emails (e.g., OTPs, notifications).
- **Cookie Parser:** For managing HTTP-only cookies to handle user sessions securely.

---

## Key Features

### 1. Multi-Role Authentication System
The application supports distinct user roles with protected routes and customized experiences for each:
- **Admin:** Complete oversight over the platform.
- **Donor:** Individuals willing to donate blood.
- **Patient/Recipient:** Individuals in need of blood.
- **Organization:** Hospitals, clinics, or blood banks managing bulk requests or donations.
- **OTP Verification:** Patients or users can verify their identity via OTP during the login/registration process for added security.

### 2. Admin Dashboard & Management
- **Centralized Dashboard:** A comprehensive view for administrators to monitor platform activity.
- **User Management:** Admins can view and manage the list of registered Donors and Organizations.
- **Role-based Access Control:** Dedicated middleware (`verifyJwt`, `adminroute`) ensures only authorized administrators can access sensitive data.

### 3. Donor Features
- **Donor Registration & Login:** Simple onboarding process for new donors to register their blood group, location, and contact details.
- **Profile Management:** Donors can securely log in and view their current user profile.
- **Donation History:** (Tracked via database models) Donors can potentially view their past donations.

### 4. Patient/Recipient Features
- **Find Blood (`/find_blood` & `/details`):** A dedicated search interface allowing patients to find available blood based on their specific blood group.
- **Blood Matching Engine:** The backend provides a `matchBloodGroup` endpoint to algorithmically find suitable donors or inventory for the requested blood type.
- **Secure Authentication:** OTP-based login ensures secure access for patients in emergency situations without needing to remember complex passwords.

### 5. Organization Features
- **Organization Registration:** Hospitals or blood banks can register themselves on the platform to facilitate larger-scale blood management.

### 6. Modern User Interface
- **Landing Page:** A welcoming home page featuring a Carousel, Mission statement, and quick links to find blood or register.
- **Responsive Design:** Optimized for both mobile and desktop screens using Tailwind CSS.
- **Data Visualization:** Utilizes Recharts to show analytics (like blood stock levels or donation trends) in the admin dashboard.

## Application Architecture

- **Client-Side Security:** Uses custom React middleware wrappers (`Adminroute`, `Patientroute`) to conditionally render components based on the user's authentication status.
- **Modular Backend:** The server is well-structured using the MVC pattern:
  - `controllers/`: Contains the business logic for each route.
  - `routers/`: Defines the API endpoints (`admin.routes.js`, `donor.routes.js`, `patient.routes.js`).
  - `model/`: Mongoose schemas for various entities (Admin, Donor, Patient, Organization, Request Management, Location, Donation History).
  - `middleware/`: Custom authentication middleware to verify JWTs for different user roles.
