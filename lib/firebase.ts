import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyvc6VmGh7DehoRF89w_J063xEnAm7gFs",
  authDomain: "zatiq-ecommerce.firebaseapp.com",
  projectId: "zatiq-ecommerce",
  storageBucket: "zatiq-ecommerce.firebasestorage.app",
  messagingSenderId: "271581989581",
  appId: "1:271581989581:web:e1b48e16f31972bf66f784"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Firestore CRUD functions
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products")); // Fetch from Firestore
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addProduct = async (product: {
  name: string;
  price: number | string;
  image?: string;
  description?: string;
  stock: number;
  category?: string;
}) => {
  try {
    // ✅ Ensure `price` is always stored as a number
    const newProduct = {
      name: product.name || "Unnamed Product",
      price: typeof product.price === "number" ? product.price : parseFloat(product.price) || 0,
      image: product.image || "/placeholder.jpg",
      description: product.description || "No description available.",
      stock: product.stock ?? 0,
      category: product.category || "Uncategorized",
      createdAt: new Date(),
    };

    await addDoc(collection(db, "products"), newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, product: { [key: string]: any }) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, product);
};

interface Product {
  [key: string]: any;
}

export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "products", id));
};


export const getProductById = async (id: string) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null; // ✅ Return `null` if product doesn't exist

    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name || "Unnamed Product",
      price: data.price || 0,
      image: data.image || "/placeholder.jpg",
      description: data.description || "No description available.",
      stock: data.stock ?? 0,
      category: data.category || "Uncategorized",
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
