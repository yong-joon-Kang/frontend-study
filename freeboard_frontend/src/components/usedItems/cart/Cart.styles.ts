import styled from "@emotion/styled";

export const ItemWrap = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 20px;
  width: 100%;
  display: flex;
  padding: 10px 0;
`;

export const RightWrap = styled.div`
  width: 150px;
  height: 150px;
  padding: 20px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const MiddleWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: 30px;
`;

export const Price = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  display: flex;
`;

export const Name = styled.span`
  font-size: 1em;
`;

export const LeftWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const Quantity = styled.div`
  border: 1px solid #bbb;
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QuantityBtn = styled.div`
  font-size: 1.5em;
  cursor: pointer;
  height: 100%;
  flex: 1;
  text-align: center;
  font-weight: bold;
  height: 100%;
  color: #777;
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 1.5em;
  flex: 1;
  text-align: center;
`;

export const Title = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin: 60px 0;
`;

export const Label = styled.span`
  font-size: 1.2em;
  display: flex;
`;

export const CheckBox = styled.input`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const DeleteBtn = styled.div`
  border: 1px solid #ccc;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  align-items: center;
  padding-bottom: 10px;
`;

export const HeaderLeftWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
