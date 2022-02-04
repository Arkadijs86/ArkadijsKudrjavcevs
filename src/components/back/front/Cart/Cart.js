import React, { useState } from 'react'
import './Cart.css';

const Cart = ({cartItems, handleAddProduct, handleRemoveProduct, value, activeButton, setActiveButton, checked}) => {

    
    
    
    const myName = cartItems.map(x => x.prices.find(prices => prices.currency.label === value));
    const skaits = cartItems.map(x => x.quantity);
    
   
    const skaitssssss = myName.map(x => x.amount);
 
    var sum = skaitssssss.map(function (num, idx) {
      return num * skaits[idx];
    });

    const totalPrice = sum.reduce((accumulator, item ) => {
      
      return accumulator + item;
    }, 0);
    
  
   var sm = totalPrice.toFixed(2);
 
   console.log({sm});
  

  
    return (
        <div className='cart-items-container'>
            { checked === true && <div className='products-overlay'></div>}
            <div className='cart-items-header'><h1>CART</h1></div>


            {cartItems.length === 0 && 
            (<div className='cart-items-empty'>no items in the cart</div>
            )}

        <div >
           {cartItems.map((item) => (
               <div className='cart-items' key={item.id}>
                  <div className='cart-items-text'> 
                 
                   
                <div><p>{item.brand}</p>
                <p>{item.name}</p></div>  



{item.prices.filter(prices => prices.currency.label === value).map((filteredPrices) => (
     <div>
   {filteredPrices.currency.symbol}
   {filteredPrices.amount}
   
    </div>
  ))}





<div>{item.attributes.map(attributes => (
                           <div > 
                         {attributes.name}
                              
                         <div >{attributes.items.map((item, index) => (
                           <button  style={{background: item.displayValue} } 
                           className={`btn ${activeButton === index ? 'active' : null}`}  
                           
                           onClick={ () => {setActiveButton(index)} }
                           >
                         {attributes.name !== "Color" && <div>{item.value}</div>}
                         
                              
                       
                          </button>
                        ))}
           </div>
                          </div>
                        ))}
           </div>

           </div>

                 <div className='cart-buttons'>  
                 <div className='cart-items-count'>  
                   <button className='cart-items-add' onClick={() => handleAddProduct(item)}>+</button>
                   <h1>{item.quantity}</h1>
                   <button className='cart-items-remove'onClick={() => handleRemoveProduct(item)}>-</button>
                   </div>
                   <div className='product-image-in-cart'><img className='product-image-cart' src={item.gallery[0]} /></div>
                   </div>
                 
               </div>
           ))}
        </div>





        

        </div>
    )
}

export default Cart;
