import styled from "@emotion/styled";
import { ChangeEvent } from "react";

export const Wrap = styled.div`
  display: flex;
  background: #f2f2f2;
  height: 40px;
  border: none;
  outline: none;
  align-items: center;
  padding: 0 20px;
`;

export const Input = styled.input`
  background: #f2f2f2;
  height: 30px;
  border: none;
  outline: none;
  flex: 100;
`;

export const SearchImg = styled.img`
  height: 15px;
  margin: 0 10px 0 0;
  flex: 1;
`;

interface IProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style?: any;
}

function SearchInput(props: IProps) {
  return (
    <Wrap style={props.style}>
      <SearchImg src="/search.png" />
      <Input
        onChange={props.onChange}
        type="text"
        placeholder={props.placeholder}
      />
    </Wrap>
  );
}

export default SearchInput;
