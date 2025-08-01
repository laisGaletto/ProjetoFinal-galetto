import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../firebase/firebaseService';
import styles from '../styles/CheckoutForm.module.css';

function CheckoutForm() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.email !== formData.confirmEmail) {
      setError("Os emails não coincidem.");
      return;
    }
    
    if (cart.length === 0) {
      setError("Seu carrinho está vazio.");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const orderData = {
      buyer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        }
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
      date: new Date().toISOString()
    };
    
    try {
      const id = await createOrder(orderData);
      setOrderId(id);
      clearCart();
    } catch (err) {
      console.error("Error creating order:", err);
      setError("Ocorreu um erro ao finalizar a compra. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };
  
  if (orderId) {
    return (
      <div className={styles.orderSuccess}>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.successIcon}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h2>Pedido realizado com sucesso!</h2>
        <p>Seu número de pedido é: <strong>{orderId}</strong></p>
        <p>Em breve você receberá um email com os detalhes do seu pedido.</p>
        <button onClick={() => navigate('/')} className={styles.backToShopButton}>
          Voltar para a Loja
        </button>
      </div>
    );
  }
  
  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Finalizar Compra</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.checkoutContent}>
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <h2>Dados Pessoais</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">Nome</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Sobrenome</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmEmail">Confirmar Email</label>
              <input
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <h2>Endereço de Entrega</h2>
          <div className={styles.formGroup}>
            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">Cidade</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="postalCode">CEP</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </form>
        
        <div className={styles.orderSummary}>
          <h2>Resumo do Pedido</h2>
          
          <div className={styles.summaryItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemQuantity}>x{item.quantity}</span>
                <span className={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span className={styles.totalPrice}>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;