import {useState} from 'react'

export default function sendNum(){
    const [num, setNum] = useState("000000")

    function sendNumber(){
        setNum("123456")
    }

    return(
        <div>
            <div>{num}</div>
            <button onClick={sendNumber}>인증번호전송</button>
        </div>
    )
}