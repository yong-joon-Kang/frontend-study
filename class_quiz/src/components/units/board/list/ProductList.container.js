import ProductListPresenterPage from "./ProductList.presenter"
import { useMutation, useQuery } from "@apollo/client"
import { FETCH_PRODUCTS, DELETE_PRODUCT } from "./ProductList.queries"

export default function ProductListContainerPage(){
    const {data} = useQuery(FETCH_PRODUCTS)
    const [deleteProduct] = useMutation(DELETE_PRODUCT)

    const onClickDeleteBtn = async(event) => {
        const result = await deleteProduct({
            variables: {
                productId: event.target.id
            },
            refetchQueries: [{query: FETCH_PRODUCTS}]
        })
        console.log(result.data.deleteProduct.message)
    }

    return(
        <ProductListPresenterPage
            fetchProductData = {data}
            onClickDeleteBtn={onClickDeleteBtn}
        />
    )
}