import { useState, useEffect } from 'react';
import styles from '../styles/ItemCount.module.css';

function ItemCount({ stock, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);
  
  useEffect(() => {
    setCount(initial);
  }, [initial]);
  
  const increment = () => {
    if (count < stock) {
      setCount(prev => prev + 1);
    }
  };
  
  const decrement = () => {
    if (count > 1) {
      setCount(prev => prev - 1);
    }
  };
  
  return (
    <div className={styles.counter}>
      <div className={styles.controls}>
        <button 
          onClick={decrement} 
          disabled={count <= 1}
          className={styles.btnControl}
        >
          -
        </button>
        
        <span className={styles.count}>{count}</span>
        
        <button 
          onClick={increment} 
          disabled={count >= stock}
          className={styles.btnControl}
        >
          +
        </button>
      </div>
      
      <button 
        onClick={() => onAdd(count)} 
        disabled={stock <= 0}
        className={styles.addButton}
      >
        {stock > 0 ? 'Adicionar ao Carrinho' : 'Sem Estoque'}
      </button>
    </div>
  );
}

export default ItemCount;