import React from 'react';
import { Link } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
  import './Products.css';
  import Icon2 from "./Vector.png"; 
  import checked from '../Header/Header';
 

const GET_LIST = gql`
query {
    category {
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

const Products = ({ handleAddProduct, value, checked}) => {

    

    const { loading, error, data } = useQuery(GET_LIST);



    console.log({ loading, error, data }) ;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
   
      console.log({checked});
    return (
        
        <div className='products'>
          <div className='products-category'><h1>ALL</h1></div>
          { checked === true && <div className='products-overlay'></div>}
          
           {data.category.products.map((productItem) => (
               <div className='card' >
                  
                   <Link to={`/${productItem.id}`}>
                   { productItem.inStock !== true && <div className='products-picture-overlay'><h1>OUT OF STOCK</h1></div>}
                   <img className='products-image' src={productItem.gallery[0]} />
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
                   <img className='add-to-cart' src={Icon2}/>
                       </button>
               </div>
           ) ) }
        </div>
    );
};

export default Products;
