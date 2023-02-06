import { gql, useMutation } from "@apollo/client"
import { useState } from "react"

const CREATE_PRODUCT = gql`
    mutation createProduct($seller: String, $createProductInput: CreateProductInput!) {
        createProduct(seller: $seller, createProductInput: $createProductInput){
        _id
        number
        message
        }
    }
`

export default function GraphqlMutationPage(){
    const [createBoard] = useMutation(CREATE_PRODUCT)

    const onClickSubmit = async () => {
        const result = await createBoard({
            variables: {
                seller: "셀러 테스트",
                createProductInput: {
                    name: "네임 테스트",
                    detail: "디테일 테스트",
                    price: 3000
                }
            }
        })
        console.log(result)
    }


    return <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
}