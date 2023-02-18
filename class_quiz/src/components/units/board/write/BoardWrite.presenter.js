import {RedInput, BlueButton} from "./BoardWrite.styles"

export default function CreateProductPresenterPage(props){

    return(
        <>
        판매자: <RedInput type="text" onChange={props.onChangeSeller} /><br />
        상품명: <RedInput type="text" onChange={props.onChangePrdName} /><br />
        상품내용: <RedInput type="text" onChange={props.onChangePrdContent} /><br />
        상품가격: <RedInput type="text" onChange={props.onChangePrdPrice} /><br />
    
        <BlueButton onClick={props.onClickBtn}>등록하기</BlueButton>
        </>
    )
}

