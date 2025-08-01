import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';
import styles from '../styles/ItemDetail.module.css';

function ItemDetail({ item }) {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useCart();
  
  if (!item) {
    return <div className={styles.loading}>Carregando...</div>;
  }
  
  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    addItem(item, quantity);
  };
  
  return (
    <div className={styles.itemDetail}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.name} className={styles.itemImage} />
      </div>
      
      <div className={styles.itemInfo}>
        <h2 className={styles.itemName}>{item.name}</h2>
        <p className={styles.itemPrice}>R$ {item.price.toFixed(2)}</p>
        <p className={styles.itemDescription}>{item.description}</p>
        
        <div className={styles.stockInfo}>
          {item.stock > 0 ? (
            <p className={styles.inStock}>Em estoque: {item.stock}</p>
          ) : (
            <p className={styles.outOfStock}>Fora de estoque</p>
          )}
        </div>
        
        {quantityAdded > 0 ? (
          <div className={styles.goToCartContainer}>
            <Link to="/cart" className={styles.goToCartButton}>
              Ir para o Carrinho
            </Link>
            <Link to="/" className={styles.continueShopping}>
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <ItemCount stock={item.stock} onAdd={handleOnAdd} />
        )}
      </div>
    </div>
  );
}

export default ItemDetail;