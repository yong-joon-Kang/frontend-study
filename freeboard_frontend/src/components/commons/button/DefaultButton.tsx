import styled from "@emotion/styled";

export const Input = styled.input`
  border: ${(props: IProps) =>
    props.isActive ? "1px solid #53bd53" : "1px solid#000"};
  color: ${(props) => (props.isActive ? "#fff" : "#000")};
  font-weight: ${(props) => (props.isActive ? "bold" : "")};
  width: 200px;
  height: 40px;
  margin: ${(props) => (props.margin ? "0" : "0 15px")};
  background-color: ${(props) => (props.isActive ? "#53bd53" : "#fff")};
  font-size: 16px;
  cursor: pointer;
`;

interface IProps {
  text?: string;
  onClick?: () => void;
  isActive?: boolean;
  isSubmitting?: boolean;
  margin?: string;
}

function DefaultButton(props: IProps) {
  return (
    <>
      <Input
        onClick={props.onClick}
        type="submit"
        value={props.text}
        disabled={props.isSubmitting}
        isActive={props.isActive}
        margin={props.margin}
      />
    </>
  );
}

export default DefaultButton;
