# Mini Collection Management System - Frontend

## 🚀 Overview

This is the frontend for the Mini Collection Management System, a full-stack application for managing customer payments, real-time notifications, and bulk data operations. The frontend is built with React, Redux Toolkit, and TailwindCSS, providing a modern, responsive, and real-time user experience.

---

## 🧩 Features

- **Authentication:** Admin registration and login, JWT-based session
- **Customer Management:**
  - Add, edit, delete, and view customers
  - Filter and sort by name, due date, and status
  - Bulk upload customers via Excel (.xlsx)
  - Downloadable Excel template
  - Import summary with validation feedback
- **Payment Management:**
  - Mark payments as pending or completed
  - View payment status for each customer
  - Overdue detection and notification
- **Notification System:**
  - Real-time notifications (Socket.io)
  - Notification center UI for past and live events
- **Responsive UI:**
  - Mobile-friendly, clean layout (TailwindCSS)
  - Toast feedback for all actions

---

## 🛠️ Tech Stack

- **React** (Vite, SPA)
- **Redux Toolkit** (state management)
- **React Router** (routing)
- **TailwindCSS** (UI styling)
- **React Hook Form** (form handling)
- **Yup** (validation)
- **Socket.io-client** (real-time notifications)
- **Axios** (API calls)
- **React Toastify** (feedback)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Mini-Collection-Management-System/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

- Ensure the backend is running at the expected URL (default: `http://localhost:5000`).
- If needed, set up a `.env` file for custom API URLs (see Vite docs).

### 4. Start the Development Server

```bash
npm run dev
```

- The app will be available at `http://localhost:5173` (default Vite port).

---

## 🧑‍💻 Usage

1. **Register** as an admin or login with your credentials.
2. **Manage Customers:** Add, edit, delete, filter, and bulk upload customers.
3. **Manage Payments:** Mark payments as completed or pending, view status.
4. **Notifications:** Receive real-time updates for new customers, payments, and overdue events.
5. **Download/Upload Excel:** Use the provided template for bulk operations.

---

## 🚢 Deployment Notes

- **Production Build:**
  ```bash
  npm run build
  ```
  The static files will be generated in the `dist/` folder.
- **Serve Production Build:**
  Use a static server (e.g., Vercel, Netlify, Nginx, or `vite preview`).
- **Environment Variables:**
  - Configure API base URL if deploying backend separately (see Vite docs for `VITE_` prefixed env vars).
- **Docker:**
  - You can containerize the frontend for deployment. Add a `Dockerfile` if needed.

---

## 📚 Additional Notes

- Ensure the backend is running and accessible for full functionality.
- For real-time features, both frontend and backend must be served from compatible origins or CORS must be configured.
- See the backend README for API and database setup.

---

## 📞 Support & Contributions

- Open issues or pull requests for bugs, improvements, or questions.

---

**Enjoy using the Mini Collection Management System!**
