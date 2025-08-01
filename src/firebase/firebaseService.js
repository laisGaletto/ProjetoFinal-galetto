import { collection, getDocs, doc, getDoc, addDoc, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Get all products
export const getProducts = async (categoryId) => {
  try {
    const productsRef = collection(db, "products");
    
    // If categoryId is provided, filter by category
    const querySnapshot = categoryId 
      ? await getDocs(query(productsRef, where("category", "==", categoryId)))
      : await getDocs(productsRef);
    
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`Fetched ${products.length} products${categoryId ? ` for category: ${categoryId}` : ''}`);
    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productDoc = await getDoc(productRef);
    
    if (productDoc.exists()) {
      return {
        id: productDoc.id,
        ...productDoc.data()
      };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw error;
  }
};

// Add new product
export const addProduct = async (productData) => {
  try {
    const productsRef = collection(db, "products");
    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log("Product added successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

// Add sample products for testing
export const addSampleProducts = async () => {
  const sampleProducts = [
    {
      name: "Smartphone Galaxy S23",
      description: "Smartphone Samsung Galaxy S23 com 128GB, tela de 6.1 polegadas",
      price: 3999.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      stock: 15
    },
    {
      name: "Camiseta Básica",
      description: "Camiseta 100% algodão, disponível em várias cores",
      price: 49.90,
      category: "clothing",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      stock: 50
    },
    {
      name: "Vaso Decorativo",
      description: "Vaso de cerâmica para decoração de interiores",
      price: 89.90,
      category: "home",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
      stock: 8
    },
    {
      name: "Bola de Futebol",
      description: "Bola oficial de futebol, tamanho 5",
      price: 129.90,
      category: "sports",
      image: "https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=400",
      stock: 12
    },
    {
      name: "Livro JavaScript Moderno",
      description: "Guia completo de JavaScript ES6+",
      price: 79.90,
      category: "books",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      stock: 25
    }
  ];

  try {
    const productsRef = collection(db, "products");
    const promises = sampleProducts.map(product => 
      addDoc(productsRef, {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );
    
    const results = await Promise.all(promises);
    console.log("Sample products added successfully:", results.length);
    return results.map(doc => doc.id);
  } catch (error) {
    console.error("Error adding sample products: ", error);
    throw error;
  }
};

// Save order in Firestore
export const createOrder = async (orderData) => {
  try {
    const ordersRef = collection(db, "orders");
    const docRef = await addDoc(ordersRef, orderData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating order: ", error);
    throw error;
  }
};