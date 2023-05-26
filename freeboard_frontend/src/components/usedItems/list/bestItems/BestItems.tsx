import { useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";
import { FETCH_USEDITEMS_OFTHEBEST } from "./BestItems.queries";
import styled from "@emotion/styled";
import LikeIcon from "../../../commons/icon/LikeIcon";
import { mideaQuery } from "../../../../../styles/common";
import { useMoveToPage } from "../../../../commons/customHooks/useMoveToPage/useMoveToPage";

const Title = styled.div`
  font-size: 1.7em;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ItemsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 850px;
  padding: 10px;
  overflow: hidden;
  @media (max-width: ${mideaQuery.width900}) {
    width: ${mideaQuery.width620};
  }
  @media (max-width: ${mideaQuery.width700}) {
    width: ${mideaQuery.width410};
  }
`;

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  height: 260px;
  padding: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0 5px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 170px;
  object-fit: contain;
`;

const BottomWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const SideWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props: ICssProps) => (props.isLeft ? "150px" : "30px")};
  align-items: ${(props: ICssProps) => (props.isLeft ? "" : "center")};
`;

const Label = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${(props: ICssProps) => props.name === "name" && "  font-size: 14px;"}
  ${(props: ICssProps) =>
    props.name === "remarks" && "  font-size: 12px; margin-bottom: 5px;"}
  ${(props: ICssProps) =>
    props.name === "price" && "  font-size: 14px; font-weight: bold"}
`;

interface ICssProps {
  name?: string;
  isLeft?: boolean;
}

function BestItems() {
  const { onClickMoveToPage } = useMoveToPage();
  const { data } = useQuery<Pick<IQuery, "fetchUseditemsOfTheBest">>(
    FETCH_USEDITEMS_OFTHEBEST
  );

  return (
    <div>
      <Title>베스트 상품</Title>
      <ItemsWrap>
        {data?.fetchUseditemsOfTheBest.map((el) => (
          <ItemWrap
            key={el._id}
            onClick={onClickMoveToPage(`/usedItems/detail/${el._id}`)}
          >
            <Img
              src={`https://storage.googleapis.com/${el.images?.[0] ?? ""}`}
              alt={el.images?.[0]}
            />
            <BottomWrap>
              <SideWrap isLeft={true}>
                <Label name="name">{el.name}</Label>
                <Label name="remarks">{el.name}</Label>
                <Label name="price">{el.name}</Label>
              </SideWrap>
              <SideWrap>
                <LikeIcon />
                <span>{el.pickedCount}</span>
              </SideWrap>
            </BottomWrap>
          </ItemWrap>
        ))}
      </ItemsWrap>
    </div>
  );
}

export default BestItems;
