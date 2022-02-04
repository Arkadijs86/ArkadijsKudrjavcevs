import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon2 from "./Vector.png"; 

const GET_CLOTHES = gql`
query {
    categories {
      name
      products {
        id
        name
        gallery
        brand
        inStock
        attributes { 
          items {
            displayValue
            value
          }
           id
          name
        
        }
      prices { 
      amount 
      currency {
        label
        symbol
      } 
      
      }
     }
  }
  }
`;

function Clothes({ handleAddProduct, value, checked}) {

    const { loading, error, data } = useQuery(GET_CLOTHES);

    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    const clothes = data.categories.filter(name => name.name === 'clothes');
    
    console.log({ loading, error, data }) ;
    console.log({ clothes}) ;
  return <div>

<div className='products'>
<div className='products-category'><h1>CLOTHES</h1></div>
{ checked === true && <div className='products-overlay'></div>}
           {clothes[0].products.map((productItem) => (
               <div className='card' >
                  
                   <Link to={`/${productItem.id}`}>
                   { productItem.inStock !== true && <div className='products-picture-overlay'><h1>OUT OF STOCK</h1></div>}
                   <img className='products-image' src={productItem.gallery[0]} alt=''/>
                   </Link>  
                   <div className='products-text'>
                  
                   <p>{productItem.brand}</p>
                   <p className='products-text-name'>{productItem.name}</p>
                  
                   </div>
                   <div >

                      {productItem.prices.filter(prices => prices.currency.label === value).map(filteredPrices => (
                           <div className='price'> 
                         {filteredPrices.currency.symbol}
                         {filteredPrices.amount}
                       
                          </div>
                        ))}


                   </div>
                   
                   
                   <button className='product-add-button' onClick={() => handleAddProduct(productItem)}>
                   <img className='add-to-cart' src={Icon2} alt=''/>
                       </button>
               </div>
           ) ) }
        </div>
    



  </div>;
}

export default Clothes;
