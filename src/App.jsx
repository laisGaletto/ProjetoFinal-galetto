import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import ItemListContainer from './pages/ItemListContainer';
import ItemDetailContainer from './pages/ItemDetailContainer';
import Cart from './pages/Cart';
import CheckoutForm from './pages/CheckoutForm';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <footer className="bg-white shadow-inner mt-auto py-6">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>© 2023 Projeto Final Galetto - E-commerce. Todos os direitos reservados.</p>
            </div>
          </footer>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;