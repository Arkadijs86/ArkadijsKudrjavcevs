import React, { useState } from 'react'
import { useParams } from 'react-router';
import { useCharacter } from './useProduct';
import {
    
    useQuery,
    gql
  } from "@apollo/client";
import './Product.css';
 



const Product = ({value, handleAddProduct, activeButton, setActiveButton, checked}) => {


  


    const { id } = useParams();
    console.log({id});

    

    const { loading, error, data } = useCharacter(id);

    console.log({data});


    
    
    
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

      

    
      

    
    
    return (
        <div className='product'>
           { checked === true && <div className='products-overlay'></div>}
           <div className='product-card'>
          <div className='product-images-container'>{data.product.gallery.map(product => (
                         <img className='product-images' src={product} />
                        ))}
           </div>
           <div className='pd'>
           <div className='product-image-container'>
           <img className='product-image' src={data.product.gallery[0]} />
           </div>
           
           <div className='product-text-container'> 
        <div className='product-text'> 
           <div className='product-brand'>
             {data.product.brand}
           </div>
           
           <div className='product-name'>
             {data.product.name}
           </div>

           <div className='product-atributes'>{data.product.attributes.map(attributes => (
                           <div> 
                             
                             <div className='product-atributes-name'>{attributes.name}</div>

                         <div className='buttons'>{attributes.items.map((item, index) => (
                           <button  style={{background: item.displayValue } } 
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
           
           <div className='product-atributes-name'>Price</div>


           <div >

              {data.product.prices.filter(prices => prices.currency.label === value).map(filteredPrices => (
           <div className='product-price'>
           {filteredPrices.currency.symbol}
           {filteredPrices.amount}

          </div>
  ))}


           </div>
           
         

           <div className='product-add-btn-container'>
           <button className='product-add' onClick={() => handleAddProduct(data.product)}>
                       Add to cart
          </button>
          </div>
          <div className='description'> 
           <div dangerouslySetInnerHTML={{__html:data.product.description }}/>
          </div>
          </div>
          </div>  
          </div>
          </div>
        </div>
    )
    
}



export default Product;
