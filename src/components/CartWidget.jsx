import { useCart } from '../context/CartContext';
import styles from '../styles/CartWidget.module.css';

function CartWidget() {
  const { itemCount } = useCart();
  
  return (
    <div className={styles.cartWidget}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cartIcon}>
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {itemCount > 0 && (
        <span className={styles.cartBadge}>{itemCount}</span>
      )}
    </div>
  );
}

export default CartWidget;