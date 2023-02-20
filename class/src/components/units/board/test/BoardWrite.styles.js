import styled from "@emotion/styled"

export const RedInput = styled.input`
    border-color: red;
`

export const BlueButton = styled.button`
    font-size: ${props => props.fontSize};
    background-color: ${props => props.chk ? props.color1 : props.color2};
`