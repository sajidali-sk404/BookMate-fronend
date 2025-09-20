# 📚 Book Recommendation App

A full-stack **Book Recommendation and Management App** where users can browse books, add them to favourites or cart, leave reviews, and manage their collection. Admins can add, update, or remove books. The project demonstrates a production-like MERN (MongoDB, Express, React, Node.js) stack with authentication, role-based access, and email verification using NodeMailer.

---

## 🚀 Features

### 👤 User Features
- Sign up, login, and email verification (via **NodeMailer**).
- Browse books with detailed view (genre, description, price, etc).
- Add or remove books from:
  - **Favourites** ❤️
  - **Cart** 🛒
- Write, edit, and delete their own reviews.
- See reviews from other users.
- Star ratings using **React Stars**.
- Real-time UI updates (no refresh required).

### 🔑 Admin Features
- Add new books with image, title, description, price, genre.
- Update existing books.
- Delete books.
- Moderate (delete) reviews.

### 📬 Email Verification
- After registration, users receive an email with a verification link using **NodeMailer + Gmail SMTP**.
- Only verified users can access full app features.

---

## 🛠 Tech Stack

### **Frontend**
- React.js (Vite)
- React Router
- Redux (for authentication state)
- Axios (API calls)
- TailwindCSS (UI styling)
- React Toastify (notifications)
- SweetAlert2 (confirmation dialogs)
- React Icons / Lucide Icons

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose (data storage)
- JWT Authentication
- Bcrypt (password hashing)
- NodeMailer (email verification)
- Middleware for auth & role-based access

### **Database**
- MongoDB (hosted locally or on Atlas)

---

## 📂 Project Structure

```
📦 Book Recommendation App
├── 📁 backend
│ ├── server.js # Entry point
│ ├── models/ # Mongoose models (User, Book, Review, etc.)
│ ├── routes/ # Express routes
│ ├── controllers/ # Controllers for each module
│ ├── middleware/ # Auth middlewares
│ └── utils/ # Helper functions (mailer, tokens, etc.)
│
├── 📁 frontend
│ ├── src/
│ │ ├── components/ # React components (BookCard, AddReview, etc.)
│ │ ├── pages/ # Page components (Home, BookDetails, Favourites)
│ │ ├── redux/ # Redux slices for auth state
│ │ └── App.jsx
│ └── public/
│
└── README.md
```



## ⚙️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/sajidali-sk404/BookMate-fronend.git
cd frontend
```

### 2. Install Dependencies
```bash
npm intall
```

### 3. Star server
```bash
npm run dev
```

### 🚧 Known Issues


- Gmail profile picture cannot be fetched directly via NodeMailer. For that, you would need Google OAuth API.

- Some API responses need consistent schema for better frontend handling.

### 📌 Future Improvements
- Add Google/Facebook login with OAuth.

- Payment gateway integration for checkout.

- Add book recommendations using AI/ML (content-based filtering).

## 👨‍💻 Author

Developed by Sajid Ali
🔗 LinkedIn
 | GitHub