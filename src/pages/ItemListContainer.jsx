import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../firebase/firebaseService';
import ItemList from '../components/ItemList';
import styles from '../styles/ItemListContainer.module.css';

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(categoryId);
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Erro ao carregar produtos. Tente novamente mais tarde.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryId]);
  
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Carregando produtos...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {categoryId 
          ? `Produtos: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`
          : "Todos os Produtos"}
      </h1>
      <ItemList products={products} />
    </div>
  );
}

export default ItemListContainer;