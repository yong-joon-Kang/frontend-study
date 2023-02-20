import {RedInput, BlueButton} from "./BoardWrite.styles"

export default function BoardWriteUI(props){

    return(
        <>
        작성자: <RedInput type="text" onChange={props.onChangeWriter} /><br />
        제목: <RedInput type="text" onChange={props.onChangeTitle} /><br />
        내용: <RedInput type="text" onChange={props.onChangeContents} /><br />
    
        <BlueButton onClick={props.onClickSubmit}>등록하기</BlueButton>
        </>
    )
}

