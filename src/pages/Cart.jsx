import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import styles from '../styles/Cart.module.css';

function Cart() {
  const { cart, total, clearCart } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.emptyCartIcon}>
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos ao seu carrinho para começar a comprar</p>
        <Link to="/" className={styles.continueShopping}>
          Ver Produtos
        </Link>
      </div>
    );
  }
  
  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Seu Carrinho</h1>
      
      <div className={styles.cartHeader}>
        <span className={styles.productHeader}>Produto</span>
        <span className={styles.priceHeader}>Preço</span>
        <span className={styles.quantityHeader}>Quantidade</span>
        <span className={styles.subtotalHeader}>Subtotal</span>
        <span className={styles.actionsHeader}></span>
      </div>
      
      <div className={styles.cartItems}>
        {cart.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      
      <div className={styles.cartFooter}>
        <button onClick={clearCart} className={styles.clearCartButton}>
          Limpar Carrinho
        </button>
        
        <div className={styles.cartSummary}>
          <h3 className={styles.totalLabel}>Total:</h3>
          <h3 className={styles.totalValue}>R$ {total.toFixed(2)}</h3>
        </div>
      </div>
      
      <div className={styles.cartActions}>
        <Link to="/" className={styles.continueShopping}>
          Continuar Comprando
        </Link>
        <Link to="/checkout" className={styles.checkoutButton}>
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
}

export default Cart;