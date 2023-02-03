import {useState} from 'react'

export default function ReactHooks(){
    const [Btn, setBtn] = useState("안녕하세요")

    function onClickBtn(){
        //document.getElementById("id_btn").innerHTML = "반갑습니다.";
        setBtn("반갑습니다!!")
    }

    return(
        <div>
            <button onClick={onClickBtn}>{Btn}</button>
        </div>
    )
}