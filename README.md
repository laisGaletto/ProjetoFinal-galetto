# Projeto Final Galetto - E-commerce

Este é um projeto de e-commerce desenvolvido com React e Firebase, utilizando Vite como ferramenta de build. O aplicativo permite aos usuários navegar por produtos, ver detalhes, adicionar ao carrinho e finalizar a compra.

## Funcionalidades

- Navegação de produtos por categorias
- Visualização detalhada de produtos
- Adição de produtos ao carrinho
- Atualização de quantidades no carrinho
- Finalização de compra com formulário de dados
- Integração com Firebase Firestore para gerenciamento de produtos e pedidos
- Design responsivo para diferentes tamanhos de tela

## Tecnologias utilizadas

- React.js
- Vite
- React Router DOM
- Firebase (Firestore)
- CSS Modules para estilização
- Context API para gerenciamento de estado global

## Estrutura do projeto

```
src/
  ├── components/         # Componentes reutilizáveis
  │   ├── NavBar.jsx
  │   ├── CartWidget.jsx
  │   ├── Item.jsx
  │   ├── ItemList.jsx
  │   ├── ItemDetail.jsx
  │   ├── ItemCount.jsx
  │   └── CartItem.jsx
  │
  ├── pages/              # Componentes de página
  │   ├── ItemListContainer.jsx
  │   ├── ItemDetailContainer.jsx
  │   ├── Cart.jsx
  │   └── CheckoutForm.jsx
  │
  ├── context/            # Contextos React
  │   └── CartContext.jsx
  │
  ├── firebase/           # Configuração e serviços do Firebase
  │   ├── firebaseConfig.js
  │   └── firebaseService.js
  │
  └── styles/             # Arquivos CSS Modules
      ├── NavBar.module.css
      ├── CartWidget.module.css
      └── ...
```

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm ou yarn

### Instalação

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/projeto-final-galetto.git
cd projeto-final-galetto
```

2. Instale as dependências:
```
npm install
# ou
yarn install
```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative o Firestore Database
   - Substitua as credenciais no arquivo `src/firebase/firebaseConfig.js`

4. Inicie o servidor de desenvolvimento:
```
npm run dev
# ou
yarn dev
```

5. Acesse `http://localhost:5173` no navegador

## Estrutura do Firestore

### Coleção 'products'
```
{
  id: string (automático do Firestore),
  name: string,
  price: number,
  description: string,
  image: string (URL da imagem),
  stock: number,
  category: string
}
```

### Coleção 'orders'
```
{
  buyer: {
    name: string,
    email: string,
    phone: string,
    address: {
      street: string,
      city: string,
      postalCode: string
    }
  },
  items: [
    {
      id: string,
      name: string,
      price: number,
      quantity: number
    }
  ],
  total: number,
  date: timestamp
}
```

## Deploy

O projeto pode ser implantado em plataformas como Netlify, Vercel ou Firebase Hosting.

## Autor

[Seu Nome] - [Seu Email]

## Licença

Este projeto está sob a licença MIT.# ProjetoFinal-galetto
