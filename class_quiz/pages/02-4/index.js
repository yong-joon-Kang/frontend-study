import { useState } from "react";
import {ErrorLabel} from "../../styles/emotion"

export default function signUpForm(){
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [PasswordChk, setPasswordChk] = useState("")
    const [EmailError, setEmailError] = useState("")
    const [PasswordError, setPasswordError] = useState("")
    
    function onChangeEmail(event){
        setEmail(event.target.value)
    }
    function onChangePassword(event){
        setPassword(event.target.value)
    }
    function onChangePasswordChk(event){
        setPasswordChk(event.target.value)
    }

    function onSignUpClick(){

        if(Email != "" && Password != "" && PasswordChk != ""){
            if(Email.includes("@")){

                setEmailError("")
                
                if(Password == PasswordChk){
                    setPasswordError("")
                    alert("정상적으로 가입되었습니다.")
                }else{
                    setPasswordError("비밀번호가 일치하지 않습니다.")
                }
            }else{
                setEmailError("이메일 형식이 아닙니다.")
            }
        }else{
            alert("빈 입력값이 존재합니다.")
        }

        // if(!Email.includes("@")){
        //     setEmailError("이메일 형식이 아닙니다.")
        //     setCount(Count + 1)
        // }else{
        //     setEmailError("")
        //     setCount(0)
        // }

        // if(Password != PasswordChk){
        //     setPasswordError("비밀번호가 일치하지 않습니다.")
        //     setCount(Count + 1)
        // }else{
        //     setPasswordError("")
        //     setCount(0)
        // }

        // if(Count == 0){
        //     alert("정상적으로 가입되었습니다.")
        // }
    }

    return(
        <div>
            <div>이메일</div>
            <input type="text" onChange={onChangeEmail}/>
            <ErrorLabel>{EmailError}</ErrorLabel>
            <div>비밀번호</div>
            <input type="password" onChange={onChangePassword}/>
            <div>비밀번호 확인</div>
            <input type="password" onChange={onChangePasswordChk}/>
            <ErrorLabel>{PasswordError}</ErrorLabel>
            <button onClick={onSignUpClick}>가입하기</button>
        </div>
    )
}