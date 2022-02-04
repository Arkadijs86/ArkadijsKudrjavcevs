import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Icon from "./Brand-icon.png";
import Icon2 from "./Empty Cart.png";







function Header({handleChange, value, cartItems,activeButton, setActiveButton, handleAddProduct, handleRemoveProduct, checked, toggleChecked}) {

  

  console.log({checked});

  const myName = cartItems.map(x => x.prices.find(prices => prices.currency.label === value));
    const skaits = cartItems.map(x => x.quantity);
    
   
    const skaitssssss = myName.map(x => x.amount);
 
    var sum = skaitssssss.map(function (num, idx) {
      return num * skaits[idx];
    });

    const totalPrice = sum.reduce((accumulator, item) => {
      
      return accumulator + item;
    }, 0);
    
  
   var sm = totalPrice.toFixed(2);
 
   console.log({sm});

    return (
        <header className='header'> 
         <div className='header-nav'> 
         <div className='header-links'> 
             <ul>
                 <li>
                     <Link to="/">ALL</Link> 
                 </li>
             </ul>
             <ul>
                 <li>
                     <Link to="/clothes">CLOTHES</Link> 
                 </li>
             </ul>
             <ul>
                 <li>
                     <Link to="/tech">TECH</Link> 
                 </li>
             </ul>
         </div>
         <div className='logo'>
         <img src={Icon} alt=''/>
         </div>
         <div className='logos'>
 
         <div>
            <div>
            <button1 onClick={toggleChecked}><img className='cart' src={Icon2} alt=''/></button1> 
            {
              checked === true && 
  
              <div className='header-bag'>
             
              <div className='cart-items-header'>My bag. {cartItems.length} items</div> 
              {cartItems.length === 0 && 
                 (<div className='cart-items-empty'>no items in the cart</div>
                 )}
                  <div >
                {cartItems.map((item) => (
                    <div className='bag-items' key={item.id}>
                    <div className='bag-items-text'> 
                   
                     
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
                                
                           <div className='bag-atributes'>{attributes.items.map((item, index) => (
                             <button  style={{background: item.displayValue} } 
                             className={`btn1 ${activeButton === index ? 'active' : null}`}  
                             
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
                              
                            

  
                   <div className='bag-buttons'> 
                   <div className='cart-items-count'>  
                     <button className='cart-items-add' onClick={() => handleAddProduct(item)}>+</button>
                     <h1>{item.quantity}</h1>
                     <button className='cart-items-remove'onClick={() => handleRemoveProduct(item)}>-</button>
                     </div>
                     <div className='product-image-in-bag'><img className='product-image-bag' src={item.gallery[0]} /></div>
                     </div>
                   
                 </div>
                ))}
             </div>

             <div className='bag-total'>
                         <div>Total</div> 
                         <div>{value}{sm}</div> 
             </div>

             <div className='bag-btn'>
             <div >
                 <h1>
                   <Link to="/cart" className='cart'>
                      <button className='bag-btn1'>VIEW BAG</button>
                 </Link>    
                 </h1>
              </div>
              <div >
                 <h1>
                   <Link to="/" className='cart'>
                   <button className='bag-btn2'>CHECK OUT</button>
                 </Link>    
                 </h1>
              </div>
              </div>
              </div> 
             
            }
            </div>
         </div>


         <div >
      { cartItems.length > 0 &&
        <div className='cart-count'>
          <div className='cart-count-number'>
          {cartItems.length}
          </div>
        </div>
      }
        
        
      </div>

      <div >
        <select className='drop' value={value} onChange={handleChange}>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
          <option value="JPY">JPY</option>
          <option value="RUB">RUB</option>
        </select>
            </div>
        



         </div> 
         </div> 
         

        </header>
        
    )
};

export default Header;





