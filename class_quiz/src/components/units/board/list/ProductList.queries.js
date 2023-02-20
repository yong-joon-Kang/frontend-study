import { gql } from "@apollo/client"

export const FETCH_PRODUCTS = gql`
    query{
        fetchProducts(page: 1){
            _id
            seller
            name
            detail
            price
        }
    }
`

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($productId: ID){
        deleteProduct(productId: $productId){
        _id
        message
        }
    }
` 