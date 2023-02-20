import * as S from "./BoardWrite.styles"

export default function BoardWriteUI(props){

    return(
        <>
        작성자: <S.RedInput type="text" onChange={props.onChangeWriter} /><br />
        제목: <S.RedInput type="text" onChange={props.onChangeTitle} /><br />
        내용: <S.RedInput type="text" onChange={props.onChangeContents} /><br />
    
        <S.BlueButton
            fontSize="20px"
            color1="green"
            color2="red"
            chk={props.mycolor}
            onClick={props.onClickSubmit}>등록하기</S.BlueButton>
        </>
    )
}

