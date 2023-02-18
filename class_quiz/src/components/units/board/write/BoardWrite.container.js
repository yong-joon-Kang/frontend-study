import { useState } from "react"
import { useMutation } from "@apollo/client"
import CreateProductPresenterPage from './BoardWrite.presenter'
import { CREATE_PRODUCT } from "./BoardWrite.queries"

export default function CreateProductContainerPage(){

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
        <CreateProductPresenterPage
            onChangeSeller={onChangeSeller}
            onChangePrdName={onChangePrdName}
            onChangePrdContent={onChangePrdContent}
            onChangePrdPrice={onChangePrdPrice}
            onClickBtn={onClickBtn}
        />
    )

}