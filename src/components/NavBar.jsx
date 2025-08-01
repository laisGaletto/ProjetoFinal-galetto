import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import styles from '../styles/NavBar.module.css';

function NavBar() {
  const categories = [
    { id: 'electronics', name: 'Eletrônicos' },
    { id: 'clothing', name: 'Roupas' },
    { id: 'home', name: 'Casa & Decoração' },
    { id: 'sports', name: 'Esportes' },
    { id: 'books', name: 'Livros' },
    { id: 'others', name: 'Outros' }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Galetto Store
        </Link>
        
        <div className={styles.navLinks}>
          {categories.map(category => (
            <NavLink 
              key={category.id}
              to={`/category/${category.id}`}
              className={({ isActive }) => 
                isActive ? styles.activeLink : styles.navLink
              }
            >
              {category.name}
            </NavLink>
          ))}
          <Link to="/admin" className={styles.adminLink}>
            Admin
          </Link>
        </div>
        
        <Link to="/cart" className={styles.cartLink}>
          <CartWidget />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;