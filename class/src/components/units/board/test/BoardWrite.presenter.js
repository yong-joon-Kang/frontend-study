import * as S from "./BoardWrite.styles"

export default function BoardWriteUI(props){

    return(
        <>
        작성자: <S.RedInput type="text" onChange={props.onChangeWriter} /><br />
        </>
    )
}

