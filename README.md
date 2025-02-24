# 🛒 E-Commerce Admin & Product Management System

This project is a **Next.js**-based **E-commerce Admin Panel** and **Product Management System** integrated with **Firebase Firestore** for storing and managing product data. The application allows **product creation, editing, deletion, and listing**, with proper dynamic routing for detailed product views.

---

## 🚀 **Live Demo**
🔗 **[Live Project Link](https://zatiq-ecommerce.vercel.app/)**

---

## 📂 **Project Structure**
```
/project-root
│── /app
│   ├── /admin
│   │   ├── /adminProducts
│   │   │   ├── /create         # Create a new product
│   │   │   ├── /edit/[id]      # Edit a product by ID
│   │   │   ├── page.tsx        # Admin product listing
│   ├── /products
│   │   ├── /[id]               # Single product details page
│   │   ├── page.tsx            # List of all products
│   ├── layout.tsx              # Application layout
│   ├── page.tsx                # Homepage
│── /components
│   ├── ProductCard.tsx         # Reusable product card component
│   ├── AddToCartButton.tsx     # Add to cart button
│── /lib
│   ├── firebase.ts             # Firebase configuration & API functions
│── /styles
│   ├── globals.css             # Global styling
│── /public
│   ├── placeholder.jpg         # Placeholder image for missing products
│── /types
│   ├── index.ts                # TypeScript interfaces for products
│── .env                        # Environment variables (Firebase credentials)
│── next.config.js              # Next.js configuration
│── package.json                # Project dependencies
│── README.md                   # Project documentation
```

---

## ⚡ **Features**
✅ **Product Management**  
- Add, Edit, and Delete products from Firestore.  

✅ **Admin Panel**  
- Manage products from `/admin/adminProducts`.  

✅ **Dynamic Routing**  
- Click on a product to view its details dynamically.  

✅ **Firestore Integration**  
- All product data is stored in Firebase Firestore.  

✅ **Responsive Design**  
- Fully mobile-friendly UI.  

✅ **Error Handling & Validations**  
- Prevents invalid data submissions.  

---

## 🛠️ **Installation & Setup**
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Set Up Firebase**
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Add Firestore and enable **Firestore Database**.
3. Get your Firebase config and update `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ **Run Development Server**
```sh
npm run dev
```
🔹 Open [http://localhost:3000](http://localhost:3000) to view the project.

---

## 📌 **Navigation & Working Directions**
### 🏠 **Homepage**
- Accessible at `/`.
- Lists all products.

### 🛍️ **View All Products**
- Navigate to `/products`.
- Shows a list of all products.

### 🔍 **View Product Details**
- Clicking a product title takes you to `/product/[id]`.
- Displays product information with **Add to Cart** button.

### 🛠️ **Admin Panel**
- Accessible at `/admin/adminProducts`.
- Shows a list of products with **Edit** and **Delete** options.

### ➕ **Create a Product**
- Navigate to `/admin/adminProducts/create`.
- Fill out product details and submit.

### ✏️ **Edit a Product**
- Click **Edit** on any product in `/admin/adminProducts`.
- Modifies product details and saves changes.

### ❌ **Delete a Product**
- Click **Delete** on a product in `/admin/adminProducts`.
- Removes the product from Firestore.

---

## 🔥 **Technologies Used**
- **Next.js** (Framework)
- **TypeScript** (Strong Typing)
- **Firebase Firestore** (Database)
- **Tailwind CSS** (Styling)
- **React Hooks** (State Management)
- **Next.js Dynamic Routing** (Page Navigation)

---

## 📜 **Future Enhancements**
- ✅ Implement **User Authentication** (Signup).
- ✅ Add **Cart & Checkout** functionality.
- ✅ Improve **Admin Dashboard UI**.
- ✅ Implement **Pagination** for large product lists.


