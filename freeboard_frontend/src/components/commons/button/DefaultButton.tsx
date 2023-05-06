import styled from "@emotion/styled";

export const Input = styled.input`
  border: 1px solid black;
  width: 200px;
  height: 40px;
  margin: 0 15px;
  background-color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

interface IProps {
  text?: string;
  onClick?: () => void;
  isActive?: boolean;
}

function DefaultButton(props: IProps) {
  return (
    <>
      <Input onClick={props.onClick} type="submit" value={props.text} />
    </>
  );
}

export default DefaultButton;
