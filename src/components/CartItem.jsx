import { useCart } from '../context/CartContext';
import styles from '../styles/CartItem.module.css';

function CartItem({ id, name, price, quantity, image }) {
  const { removeItem, updateItemQuantity } = useCart();
  
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 1) {
      updateItemQuantity(id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    removeItem(id);
  };
  
  return (
    <div className={styles.cartItem}>
      <img src={image} alt={name} className={styles.itemImage} />
      
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{name}</h3>
        <p className={styles.itemPrice}>R$ {price.toFixed(2)}</p>
      </div>
      
      <div className={styles.quantityControl}>
        <label htmlFor={`quantity-${id}`}>Qtd:</label>
        <input
          id={`quantity-${id}`}
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className={styles.quantityInput}
        />
      </div>
      
      <p className={styles.subtotal}>
        R$ {(price * quantity).toFixed(2)}
      </p>
      
      <button onClick={handleRemove} className={styles.removeButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  );
}

export default CartItem;