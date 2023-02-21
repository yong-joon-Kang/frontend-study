import styled from "@emotion/styled"
import { useState } from "react"

const Row = styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
    background-color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
    text-align: center;
    padding: 10px;
`
const Column = styled.div`
    width: ${props => {
        if(props.width){
            return props.width
        }else return "10%"
    }};
    text-align: ${props => props.textAlign};
`

const Wrapper = styled.div`
    margin: 50px;
    border-top: 1px solid #ccc;
    font-size: 14px;
    width: 800px;
`

const dataList = [
    { id: "1", title: "9월달 시스템 점검 안내입니다.", createDate: "2020.09.19" },
    { id: "2", title: "안녕하세요! 공지사항 전달드립니다.", createDate: "2020.09.17" },
    { id: "3", title: "개인정보 처리방침 변경 사전 안내", createDate: "2020.09.12" },
    { id: "4", title: "IOS 10.0 이하 지원 중단 안내", createDate: "2020.08.10" },
    { id: "5", title: "이용약관 변경 사전 안내", createDate: "2020.08.01" },
    { id: "6", title: "개인정보 처리방침 변경 사전 안내", createDate: "2020.07.19" },
]

export default function filterMapPage3(){
    
    // 체크 할 때 마다 해당 id를 담아줄 배열
    const [checkList, setCheckList] = useState([])


    // 전체선택 누를 경우 
    const onClickCheckAll = () => {
        console.log("받아오는 데이터의 길이",dataList.length)
        console.log("현재 체크리스트에 들어있는 데이터의 길이",checkList.length)
        if (checkList.length !== dataList.length) {
            setCheckList(dataList);
        } else {
            setCheckList([]);
        }
    };

    // 체크리스트 선택
    const onChangeChk = (list) => {
        console.log("내가 누른 체크리스트가 뭔가?",list)
        // 모든 원소가 조건에 맞으면 true (checkList에 값이 없음)
        if (checkList.every((cur) => cur.id !== list.id)) {
            setCheckList([...checkList, list]);
        } else {
        // 체크된것만 제외하고 배열에 담는다.
            const result = checkList.filter((cur) => cur.id !== list.id);
            setCheckList(result);
        }
    }

    // 현재 체크리스트에 해당 list id가 있다면 true, 없으면 false
    const isChecked = (list) => {
        return checkList.some((cur) => cur.id === list.id);
    };


    return(
        <Wrapper>
            <Row color="#f9f9f9" fontWeight="bold">
                <Column>
                    <input type="checkbox"
                     onChange={onClickCheckAll}
                     checked={checkList.length === dataList.length}
                    />
                </Column>
                <Column>번호</Column>
                <Column width="70%">제목</Column>
                <Column>작성일</Column>
            </Row>
        {dataList.map(list =>(
            <Row key={list.id}>
                <Column>
                    <input type="checkbox" 
                    onChange={() => onChangeChk(list)}
                    checked={isChecked(list)}
                    />
                </Column>
                <Column>{list.id}</Column>
                <Column width="70%" textAlign="left">{list.title}</Column>
                <Column>{list.createDate}</Column>
            </Row>
        ))}
        </Wrapper>
    )
    
}