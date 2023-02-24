import BoardWriteContainerPage from "../../../src/components/board/write/BoardWrite.container"

export default function CreateBoardPage(props){

    return(
        <BoardWriteContainerPage isEdit={props.isEdit} />
    )
}