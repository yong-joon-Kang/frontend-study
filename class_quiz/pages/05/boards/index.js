import { useState } from "react"
import { gql, useMutation } from "@apollo/client"

const CREATE_PRODUCT = gql`
    mutation createProduct($seller: String, $createProductInput: CreateProductInput!){
        createProduct(seller: $seller, createProductInput: $createProductInput){
        _id
        message
        }
    }
`

export default function CreateProductPage(){

    const [seller, setSeller] = useState("")
    const [prdName, setprdName] = useState("")
    const [prdContent, setPrdContent] = useState("")
    const [prdPrice, setPrdPrice] = useState("")

    const [createProduct] = useMutation(CREATE_PRODUCT)

    const onChangeSeller = (event) => {
        setSeller(event.target.value)
    }

    const onChangePrdName = (event) => {
        setprdName(event.target.value)
    }

    const onChangePrdContent = (event) => {
        setPrdContent(event.target.value)
    }

    const onChangePrdPrice = (event) => {
        setPrdPrice(event.target.value)
    }

    
    const onClickBtn = async () => {
        const result = await createProduct({
            variables: {
                seller: seller,
                createProductInput: {
                    name: prdName,
                    detail: prdContent,
                    price: Number(prdPrice)
                }
            }
        })

        console.log(result)
    }

    return(
        <>
        판매자: <input type="text" onChange={onChangeSeller} /><br />
        상품명: <input type="text" onChange={onChangePrdName} /><br />
        상품내용: <input type="text" onChange={onChangePrdContent} /><br />
        상품가격: <input type="text" onChange={onChangePrdPrice} /><br />

        <input type="button" value="등록하기" onClick={onClickBtn} />
        </>
    )
}