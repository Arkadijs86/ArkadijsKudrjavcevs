import React, { useState } from 'react'
import data from './components/back/data/Data';
import Header from './components/back/front/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Products from './components/back/front/Products/Products';
import Cart from './components/back/front/Cart/Cart';
import Product from './components/back/front/Product/Product';
import Clothes from './components/back/front/Products/Clothes';
import Tech from './components/back/front/Products/Tech';




const App = () => {

  const [value, setValue] = useState('USD');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [activeButton, setActiveButton] = useState(0);

  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(e => ! e);


  
  const {productItems} = data;
  const [cartItems, setCartItems] = useState([]);

const handleAddProduct = (product) => {

const ProductExist = cartItems.find((item) => item.id === product.id);
 if (ProductExist) {
   setCartItems(cartItems.map((item) => item.id === product.id ?
   {...ProductExist, quantity: ProductExist.quantity + 1}: item)
   );
 }
  else {
    setCartItems([...cartItems, {...product, quantity: 1}]);
  }
  };

  const handleRemoveProduct = (product) => {

    const ProductExist = cartItems.find((item) => item.id === product.id);
     if (ProductExist.quantity === 1) {
       setCartItems(cartItems.filter((item) => item.id !== product.id));
      
     } else {
       setCartItems(
        cartItems.map((item) => item.id === product.id ? {...ProductExist, quantity: ProductExist.quantity - 1} 
        : item
        )
       
       );
      }
      };

      const handleCartClearence = () => {
        setCartItems([]);
      }

  return (
  <div>
  
    <Header handleChange={handleChange} cartItems={cartItems} value={value} toggleChecked={toggleChecked} checked={checked} handleRemoveProduct={handleRemoveProduct} handleAddProduct={handleAddProduct} setActiveButton={setActiveButton} activeButton={activeButton} />
    <Routes>
   
      <Route strict exact path="/" element={<Products  checked={checked} productItems={productItems} handleAddProduct={handleAddProduct} value={value}/>}/>
    
      <Route strict exact path="/clothes"  element={<Clothes checked={checked} productItems={productItems} handleAddProduct={handleAddProduct} value={value}/>}/>
      <Route strict exact path="/tech"  element={<Tech checked={checked} productItems={productItems} handleAddProduct={handleAddProduct} value={value}/>}/>

      <Route strict exact path="/:id"  element={<Product checked={checked} productItems={productItems} handleAddProduct={handleAddProduct} value={value} setActiveButton={setActiveButton} activeButton={activeButton}/>}/>
   
      <Route strict exact path="/cart" element={<Cart checked={checked} cartItems={cartItems} value={value} handleRemoveProduct={handleRemoveProduct} handleAddProduct={handleAddProduct} setActiveButton={setActiveButton} activeButton={activeButton}/>}/>
    
   </Routes>
  
  </div>
  );
};

export default App;
