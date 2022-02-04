import {
    
    useQuery,
    gql
  } from "@apollo/client";

const GET_CHARACTER = gql`
query ($id: String!){
  product(id: $id) {
    id
    name
    brand
    gallery
    description
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
`;
export const useCharacter = (id) => {
    
  const { loading, error, data } = useQuery(GET_CHARACTER, {

    variables: {

      id,

    }
      
    });

    return { loading, error, data };


}