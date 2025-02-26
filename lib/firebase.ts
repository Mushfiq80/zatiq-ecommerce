import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


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
  price: number;
  image?: string;
  description?: string;
  stock: number;
  category?: string;
}) => {
  try {

    const newProduct = {
      name: product.name || "Unnamed Product",
      price: product.price || 0,
      image: product.image || "/placeholder.jpg",
      description: product.description || "No description available.",
      stock: product.stock ?? 0,
      category: product.category || "Uncategorized",
      createdAt: new Date(), // 
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

export const deleteProduct = async (id: string) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};


export const getProductById = async (id: string) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

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

// Check out order fetch
export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt).toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// Delete order
export const deleteOrder = async (id: string) => {
  try {
    await deleteDoc(doc(db, "orders", id));
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};
