import Item from './Item';
import styles from '../styles/ItemList.module.css';

function ItemList({ products }) {
  if (products.length === 0) {
    return <p className={styles.noProducts}>Nenhum produto encontrado</p>;
  }
  
  return (
    <div className={styles.itemList}>
      {products.map(product => (
        <Item 
          key={product.id} 
          id={product.id} 
          name={product.name} 
          price={product.price} 
          image={product.image} 
          stock={product.stock} 
        />
      ))}
    </div>
  );
}

export default ItemList;