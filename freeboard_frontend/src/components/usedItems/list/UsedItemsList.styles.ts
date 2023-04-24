import { IKeywordProps } from "./UsedItemsList.types";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ListWrapper = styled.div`
  width: 1100px;
  margin-top: 70px;
`;

export const ListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
`;

export const SearchWrap = styled.div`
  flex: 3;
  margin-right: 50px;
  display: flex;
  background: #dbdbdb;
  border-radius: 10px;
  height: 40px;
  border: none;
  outline: none;
  align-items: center;
  padding: 0 20px;
`;

export const SearchInput = styled.input`
  background: #dbdbdb;
  height: 30px;
  border: none;
  outline: none;
  flex: 100;
`;

export const SearchImg = styled.img`
  height: 20px;
  margin: 0 10px 0 0;
  flex: 1;
`;

export const DateInput = styled(DatePicker)`
  border: 1px solid #bdbdbd;
  height: 40px;
  outline: none;
  font-size: 12px;
  flex: 1;
  margin-right: 20px;
  width: 100%;
  text-align: center;
`;

export const DateWrap = styled.div`
  flex: 0.5;
  margin-right: 20px;
`;

export const List = styled.div`
  width: 100%;
`;

export const ListFooter = styled.div``;

export const WriteImg = styled.img`
  height: 15px;
  margin-right: 5px;
`;

export const BoardWriteBtn = styled.button`
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  padding: 10px;
  background: #fff;
  cursor: pointer;
`;

export const Title = styled.span`
  background-color: ${(props: IKeywordProps) =>
    props.keyword ? "#d6efff" : ""};
`;