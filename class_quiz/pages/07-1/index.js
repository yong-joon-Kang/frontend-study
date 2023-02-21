export default function FilterMapPage(){

    const classmates = [
        { name: "철수", age: 10, school: "토끼초등학교" },
        { name: "영희", age: 13, school: "다람쥐초등학교" },
        { name: "훈이", age: 11, school: "토끼초등학교" }
    ]

    const result = classmates.filter(el => el.school === "토끼초등학교")
    result.map(el => el.candy = "10개")
    console.log(result)

    const result2 = classmates.filter(el => el.school === "다람쥐초등학교")
    result2.map(el => el.name += "어린이")
    console.log(result2)


    return(
        <>
            {/* {result.map(el => (
                <div></div>
            ))} */}
        </>
    )
}