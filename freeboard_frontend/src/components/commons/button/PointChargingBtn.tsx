import styled from "@emotion/styled";
import { Modal } from "antd";
import { color } from "../../../../styles/common";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
  IUser,
} from "../../../commons/types/generated/types";
import Head from "next/head";
import { userInfoState } from "../../../commons/libraries/recoil";
import { useRecoilState } from "recoil";

export const Charging = styled.span`
  border-radius: 5px;
  background-color: ${color.primary};
  color: #111;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 40px;
`;

interface IProps {
  selectedOption: {
    value: boolean | number;
  };
}

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      impUid
      amount
      status
    }
  }
`;

declare const window: typeof globalThis & {
  IMP: any;
};

function PointChargingBtn(props: IProps) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [createPointTransactionOfLoading] = useMutation<
    Pick<IMutation, "createPointTransactionOfLoading">,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT_TRANSACTION_OF_LOADING);

  const onClickCharging = () => {
    if (!props.selectedOption.value) {
      Modal.warning({ content: "충전하실 금액을 선택해주세요!" });
      return;
    }

    const IMP = window.IMP; // 생략 가능
    IMP?.init("imp49910675"); // 실제로 현재 사용중인 백엔드랑 연동된 가맹점 식별코드임

    IMP?.request_pay(
      {
        // param
        pg: "nice",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011", // 중복되면 안됨
        name: "포인트 충전",
        amount: props.selectedOption.value,
        buyer_email: userInfo.email,
        buyer_name: userInfo.name,
        // buyer_tel: "010-4242-4242",
        // buyer_addr: "서울특별시 강남구 신사동",
        // buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/28-01-payment", // 모바일인경우 결제 시 모바일결제창으로 사이트가 이동됨
      },
      async (rsp: any) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          console.log(rsp);
          // rsp.imp_uid
          // rsp.paid_amount
          // const paymentDate = new Date(); // 프론트엔드에서 시간을 만드는 것은 안됨!

          // 백엔드에 결제관련 데이터 넘겨주기 => 즉, 뮤테이션 실행하기
          // createPointTransactionOfLoading
          try {
            const result = await createPointTransactionOfLoading({
              variables: {
                impUid: rsp.imp_uid,
              },
            });
            console.log(result);

            const resultAmount =
              Number(userInfo.userPoint?.amount) + Number(rsp.paid_amount);

            setUserInfo({
              ...userInfo,
              userPoint: {
                _id: userInfo?.userPoint?._id as string,
                user: Object.create(null) as IUser,
                ...userInfo.userPoint,
                amount: resultAmount,
              },
            });

            Modal.success({ content: "결제가 정상적으로 완료되었습니다!" });
          } catch (error) {
            if (error instanceof Error) console.log(error.message);
          }
        } else {
          // 결제 실패 시 로직,
          Modal.warning({ content: "결제에 실패했습니다! 다시 시도해주세요." });
        }
      }
    );
  };

  return (
    <>
      <Head>
        <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      </Head>
      <Charging onClick={onClickCharging}>충전하기</Charging>
    </>
  );
}

export default PointChargingBtn;
