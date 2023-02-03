import {
Wrapper,
TopWrapper,
RoadIcon,
RoadText,
InputWrapper,
EmailInput,
BtnDefault,
ErrorText,
PasswordInput,
BtnLogin,
BtnEtcWrapper,
EtcLabel,
BtnKakaoLogin,
KakaoLogo,
KakaoLabel,
BtnUnimpl
} from '../../styles/itsRoad'
import {useState} from 'react'

export default function itsRoadLoginForm(){

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [EmailError, setEmailError] = useState("");
    const [PasswordError, setPasswordError] = useState("");

    function onEmailChanged(event){
        setEmail(event.target.value)
    }

    function onPasswordChanged(event){
        setPassword(event.target.value)
    }

    function onEmailDefaultClick(){
        setEmail("")
        document.getElementById("emailInput").value = ""
    }

    function onPasswordDefaultClick(){
        setPassword("")
        document.getElementById("passwordInput").value = ""
    }

    function onLoginBtnClick(){

        if(Email == "" || !Email.includes("@")){

            setEmailError("이메일 주소를 다시 확인해주세요.")

            if(Password != "" && Password.length >= 8 && Password.length <= 16){
                setPasswordError("")
            }else{
                setPasswordError("8~16자리 영문, 숫자, 특수 문자만 사용 가능합니다.")
            }
        }else{
            setEmailError("")

            if(Password != "" && Password.length >= 8 && Password.length <= 16){
                setPasswordError("")
                alert("정상적으로 로그인 되었습니다.")
            }else{
                setPasswordError("8~16자리 영문, 숫자, 특수 문자만 사용 가능합니다.")
            }
        }
    }

    function onBtnUnimplClick(){
        alert("기능 구현 예정입니다.")
    }
    

    return(
        <Wrapper>
            <TopWrapper>
                <RoadIcon src="/map2.png"></RoadIcon>
                <RoadText>잇츠로드</RoadText>
            </TopWrapper>
             <InputWrapper>
                <EmailInput type="text" onChange={onEmailChanged} id="emailInput" />
                <BtnDefault onClick={onEmailDefaultClick} src="/btnDefault.png"></BtnDefault>
            </InputWrapper>
            <ErrorText>{EmailError}</ErrorText>
            <InputWrapper>
                <PasswordInput type="password" onChange={onPasswordChanged} id="passwordInput" />
                <BtnDefault src="/btnDefault.png" onClick={onPasswordDefaultClick}></BtnDefault>
            </InputWrapper>
            
            <ErrorText>{PasswordError}</ErrorText>
            <BtnLogin onClick={onLoginBtnClick}>로그인</BtnLogin>
            <BtnEtcWrapper>
                <EtcLabel><BtnUnimpl onClick={onBtnUnimplClick}>이메일 찾기</BtnUnimpl></EtcLabel>
                <EtcLabel>|</EtcLabel>
                <EtcLabel><BtnUnimpl onClick={onBtnUnimplClick}>비밀번호 찾기</BtnUnimpl></EtcLabel>
                <EtcLabel>|</EtcLabel>
                <EtcLabel><BtnUnimpl onClick={onBtnUnimplClick}>회원가입</BtnUnimpl></EtcLabel>
            </BtnEtcWrapper>
            <BtnKakaoLogin onClick={onBtnUnimplClick}>
                <KakaoLogo src="/카카오톡.png"></KakaoLogo>
                <KakaoLabel>카카오톡으로 로그인</KakaoLabel>
            </BtnKakaoLogin>
        </Wrapper>
    )
}