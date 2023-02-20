import * as S from "./ProductList.styles"

export default function ProductListPresenterPage(props){
    return(
        <>
        {props.fetchProductData?.fetchProducts.map(el => (
            <S.Row key={el._id}>
            <S.Column><input type="checkbox" /></S.Column>
            <S.Column>{el.seller}</S.Column>
            <S.Column>{el.name}</S.Column>
            <S.Column>{el.detail}</S.Column>
            <S.Column>{el.price}</S.Column>
            <S.Column><button id={el._id} onClick={props.onClickDeleteBtn}>삭제</button></S.Column>
            </S.Row>
        ))}
        </>
    )
}