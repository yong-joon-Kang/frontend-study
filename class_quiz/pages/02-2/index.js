import {useState} from 'react'

export default function CountUp(){
    
    const [count, setCount] = useState(0);

    function AddCount(){
        // let num = Number(document.getElementById("num").innerText) + 1;
        // document.getElementById("num").innerHTML = num;
        setCount(count + 1)
    }

    return(
        <div>
            <div>{count}</div>
            <button onClick={AddCount}>카운트 증가</button>
        </div>
    )
}