import {Wrapper, Title, Label, ID} from '../../styles/emotion'

export default function EmotionPage(){
    return(
        <Wrapper>
			<Title>로그인</Title>
			<Label>아이디</Label>
			<ID type="text" />
			<Label>비밀번호</Label>
			<ID type="password" />
		</Wrapper>
    )
}