import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../firebase/firebaseService';
import ItemDetail from '../components/ItemDetail';
import styles from '../styles/ItemDetailContainer.module.css';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { itemId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!itemId) return;
      
      setLoading(true);
      try {
        const data = await getProductById(itemId);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Produto não encontrado ou ocorreu um erro ao carregá-lo.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [itemId]);
  
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Carregando detalhes do produto...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className={styles.backButton}>
            Voltar para Catálogo
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <ItemDetail item={product} />
    </div>
  );
}

export default ItemDetailContainer;