import React, { useState } from 'react';
import AddProduct from '../components/AddProduct';
import { addSampleProducts } from '../firebase/firebaseService';
import styles from '../styles/Admin.module.css';

const Admin = () => {
  const [loadingSamples, setLoadingSamples] = useState(false);
  const [sampleMessage, setSampleMessage] = useState('');

  const handleAddSamples = async () => {
    setLoadingSamples(true);
    setSampleMessage('');
    
    try {
      await addSampleProducts();
      setSampleMessage('Produtos de exemplo adicionados com sucesso!');
    } catch (error) {
      setSampleMessage(`Erro ao adicionar produtos de exemplo: ${error.message}`);
    } finally {
      setLoadingSamples(false);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Painel de Administração</h1>
        <p className={styles.subtitle}>Gerencie seus produtos aqui</p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.sampleSection}>
          <h3 className={styles.sectionTitle}>Produtos de Exemplo</h3>
          <p className={styles.sectionDescription}>
            Adicione produtos de exemplo para testar o sistema
          </p>
          
          {sampleMessage && (
            <div className={`${styles.message} ${sampleMessage.includes('sucesso') ? styles.success : styles.error}`}>
              {sampleMessage}
            </div>
          )}
          
          <button 
            onClick={handleAddSamples}
            disabled={loadingSamples}
            className={styles.sampleButton}
          >
            {loadingSamples ? 'Adicionando...' : 'Adicionar Produtos de Exemplo'}
          </button>
        </div>
        
        <div className={styles.divider}></div>
        
        <AddProduct />
      </div>
    </div>
  );
};

export default Admin; 