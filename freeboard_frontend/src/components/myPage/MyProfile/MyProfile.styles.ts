import styled from "@emotion/styled";

interface cssProps {
  isLast?: boolean;
}

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 52px;
`;

export const RowWrap = styled.div`
  display: flex;
  justify-content: ${(props: cssProps) =>
    props.isLast ? "end" : "space-between"};
  width: 800px;
  margin-bottom: 20px;
  align-items: center;
`;

export const Button = styled.div`
  width: 150px;
  height: 42px;
  font-size: 14px;
  background-color: #bdbdbd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Label = styled.span`
  font-size: 16px;
`;

export const Input = styled.input`
  width: 590px;
  height: 52px;
  background: #eee;
  outline: none;
  border: none;
  padding-left: 20px;
`;
