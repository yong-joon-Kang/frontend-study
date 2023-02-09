import {
Wrapper,
HeaderTitle,
WriterWrap,
SubWrap,
RightWrap,
LeftWrap,
Label,
WriterInput,
TitleInput,
ContentsInput,
AddrNumInput,
AddrNumBtn,
UploadBtn,
SubmitBtn,
Plus,
UploadText,
RadioBtn,
SubmitWrap,
ErrorText
} from "../../../styles/createBoardEmotion"
import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { useRouter } from "next/router"

const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $password: String, $title: String!, $contents: String!){
        createBoard(createBoardInput:{
          writer: $writer
          password: $password
          title: $title
          contents: $contents
        }){
          _id
        }
      }
`

const test = gql`
mutation{
    createBoard(createBoardInput:{
      writer: "K"
      password: "1234"
      title: "K title"
      contents: "K contents"
    }){
      _id
    }
  }
`

export default function CreateBoardPage(){

    const [createBoard] = useMutation(CREATE_BOARD)

    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const [writerErr, setWriterErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [titleErr, setTitleErr] = useState("")
    const [contentsErr, setContentsErr] = useState("")

    const router = useRouter();

    const onWriterChanged = (event) => {
        setWriter(event.target.value)
    }

    const onPasswordChanged = (event) => {
        setPassword(event.target.value)
    }

    const onTitleChanged = (event) => {
        setTitle(event.target.value)
    }

    const onContentsChanged = (event) => {
        setContents(event.target.value)
    }
    
    const onSubmit = async () => {
        
        if(writer === ""){
            setWriterErr("작성자는 필수입력 입니다.")
        }else{
            setWriterErr("")
        }

        if(password === ""){
            setPasswordErr("비밀번호는 필수입력 입니다.")
        }else{
            setPasswordErr("")
        }

        if(title === ""){
            setTitleErr("제목은 필수입력 입니다.")
        }else{
            setTitleErr("")
        }

        if(contents === ""){
            setContentsErr("내용은 필수입력 입니다.")
        }else{
            setContentsErr("")
        }
        
        try{
            if(writer && password && title && contents){
                const result = await createBoard({
                    variables: {
                        writer: writer,
                        password: password,
                        title: title,
                        contents: contents
                    }
                })
                console.log(result)
                alert("정상적으로 등록되었습니다.")
                router.push(`/boards/detail/${result.data.createBoard._id}`)
            }
        }catch{

        }
        

    }


    return(
        <Wrapper>
            <HeaderTitle>게시물 등록</HeaderTitle>
            <WriterWrap>
                <LeftWrap>
                    <Label>작성자</Label>
                    <WriterInput type="text" onChange={onWriterChanged} placeholder="이름을 적어주세요."/>
                    <ErrorText>{writerErr}</ErrorText>
                </LeftWrap>
                <RightWrap>
                    <Label>비밀번호</Label>
                    <WriterInput type="password" onChange={onPasswordChanged}  placeholder="비밀번호를 적어주세요."/>
                    <ErrorText>{passwordErr}</ErrorText>
                </RightWrap>
            </WriterWrap>
            <SubWrap>
                <Label>제목</Label>
                <TitleInput type="text" onChange={onTitleChanged} placeholder="제목을 적어주세요." />
                <ErrorText>{titleErr}</ErrorText>
            </SubWrap>
            <SubWrap>
                <Label>내용</Label>
                <ContentsInput type="text" onChange={onContentsChanged} placeholder="내용을 적어주세요." />
                <ErrorText>{contentsErr}</ErrorText>
            </SubWrap>
            <SubWrap>
                <Label>주소</Label>
                <AddrNumInput type="text" placeholder="07592" />
                <AddrNumBtn>우편번호 검색</AddrNumBtn>
                <TitleInput type="text" />
                <TitleInput type="text" />
            </SubWrap>
            <SubWrap>
                <Label>유튜브</Label>
                <TitleInput type="text" />
            </SubWrap>
            <SubWrap>
                <Label>사진 첨부</Label>
                <UploadBtn>
                    <Plus>+</Plus><UploadText>Upload</UploadText>
                </UploadBtn>
                <UploadBtn>
                    <Plus>+</Plus><UploadText>Upload</UploadText>
                </UploadBtn>
                <UploadBtn>
                    <Plus>+</Plus><UploadText>Upload</UploadText>
                </UploadBtn>
            </SubWrap>
            <SubWrap>
                <Label>메인 설정</Label>
                <label><RadioBtn type="radio" name="chkMainOption" /> 유튜브</label>
                <label><RadioBtn type="radio" name="chkMainOption" /> 사진</label>
            </SubWrap>
            <SubmitWrap>
                <SubmitBtn onClick={onSubmit}>등록하기</SubmitBtn>
            </SubmitWrap>
        </Wrapper>
    )
}