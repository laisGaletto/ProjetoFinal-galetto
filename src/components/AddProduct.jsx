import React, { useState } from 'react';
import { addProduct } from '../firebase/firebaseService';
import styles from '../styles/AddProduct.module.css';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Validar dados
      if (!productData.name || !productData.price || !productData.category) {
        throw new Error('Nome, preço e categoria são obrigatórios');
      }

      // Converter preço para número
      const productToSave = {
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock) || 0
      };

      await addProduct(productToSave);
      setMessage('Produto adicionado com sucesso!');
      
      // Limpar formulário
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: ''
      });
    } catch (error) {
      setMessage(`Erro ao adicionar produto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Adicionar Novo Produto</h2>
      
      {message && (
        <div className={`${styles.message} ${message.includes('sucesso') ? styles.success : styles.error}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome do Produto *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            rows="3"
            className={styles.textarea}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price">Preço *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="stock">Estoque</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              min="0"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Categoria *</label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
            className={styles.select}
          >
            <option value="">Selecione uma categoria</option>
            <option value="electronics">Eletrônicos</option>
            <option value="clothing">Roupas</option>
            <option value="home">Casa & Decoração</option>
            <option value="sports">Esportes</option>
            <option value="books">Livros</option>
            <option value="others">Outros</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">URL da Imagem</label>
          <input
            type="url"
            id="image"
            name="image"
            value={productData.image}
            onChange={handleInputChange}
            placeholder="https://exemplo.com/imagem.jpg"
            className={styles.input}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? 'Adicionando...' : 'Adicionar Produto'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct; 