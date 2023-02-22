import styled from "@emotion/styled"

export const Wrapper = styled.div`
    
`

export const ListWrapper = styled.div`
width: 1000px;
`

export const ListHeader = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 10px;
`

export const SearchBox = styled.div`
width: 650px;
height: 40px;
border-radius: 10px;
background: #dbdbdb;
`

export const SearchInput = styled.input`
background: none;
width: 90%;
height: 100%;
border: none;
outline: none;
`

export const DateInput = styled.input`
border: 1px solid #BDBDBD;
width: 170px;
height: 40px;
outline: none;
font-size: 12px;
`

export const SearchBtn = styled.button`
border: 1px solid black;
width: 80px;
height: 40px;
border-radius: 10px;
background: #000;
color: #fff;
`

export const List = styled.div`
width: 100%;
`

export const Table = styled.table`
width: 100%;
border-top: 2px solid black;
border-bottom: 2px solid black;
border-collapse: collapse;
font-size: 14px;
`

export const Tr = styled.tr`
border-top: 1px solid #ccc;
cursor: ${props => {
        if(props.pointer){
            return props.pointer;
        }else{
            return "pointer";
        }
    }};
&:hover{
    background: ${props => {
        if(props.hvBgColor){
            return props.hvBgColor;
        }else{
            return "#eee";
        }
    }};
}
`

export const Th = styled.th`
padding: 5px;
text-align: center;
width: ${props => props.width};
`

export const Td = styled.td`
padding: 5px;
text-align: center;
`

export const ListFooter = styled.div`

`

export const PageNumber = styled.div`

`

export const BoardWriteBtn = styled.button`
border: 1px solid #ccc;
border-radius: 10px;
font-size: 12px;
font-weight: bold;
padding: 10px;
background: #fff;
cursor: pointer;
`