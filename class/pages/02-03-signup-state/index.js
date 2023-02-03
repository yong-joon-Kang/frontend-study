import {useState} from 'react'

export default function SignupStatePage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")

    function onChangeEmail(event){
        setEmail(event.target.value)
    }

    function onChangePassword(event){
        setPassword(event.target.value)
    }

    function onClickSignup(event){
        console.log(email)
        console.log(password)

        if(email.includes("@") === false){
            //alert("이메일이 올바르지 않습니다! @가 없습니다")
            setEmailError("이메일이 올바르지 않습니다! @가 없습니다")
        }else{
            setEmailError("")
            alert("회원가입을 축하합니다!")
        }
    }

    return (
        <>
            이메일: <input type="text" onChange={onChangeEmail} />
            <div id="error">{emailError}</div>
            비밀번호: <input type="password" onChange={onChangePassword} />
            <button onClick={onClickSignup}>회원가입</button>
        </>
    )

}