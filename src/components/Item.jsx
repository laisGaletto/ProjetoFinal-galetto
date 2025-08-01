import { Link } from 'react-router-dom';
import styles from '../styles/Item.module.css';

function Item({ id, name, price, image, stock }) {
  return (
    <div className={styles.item}>
      <img src={image} alt={name} className={styles.itemImage} />
      
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{name}</h3>
        <p className={styles.itemPrice}>R$ {price.toFixed(2)}</p>
        
        <div className={styles.stockInfo}>
          {stock > 0 ? (
            <p className={styles.inStock}>Em estoque: {stock}</p>
          ) : (
            <p className={styles.outOfStock}>Fora de estoque</p>
          )}
        </div>
        
        <Link to={`/item/${id}`} className={styles.detailButton}>
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}

export default Item;