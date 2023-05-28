import styled from "@emotion/styled";

export const A = styled.a`
  border: 1px solid black;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0 15px;
  background-color: #fff;
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  text?: string;
  onClick?: () => void;
  height: string;
  width: string;
}

function DefaultButton(props: IProps) {
  return (
    <>
      <A onClick={props.onClick} width={props.width} height={props.height}>
        {props.text}
      </A>
    </>
  );
}

export default DefaultButton;
