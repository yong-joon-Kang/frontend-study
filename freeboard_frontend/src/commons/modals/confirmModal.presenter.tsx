import { Modal } from "antd";
import * as S from "./confirmModal.styles";
import Select from "react-select";
import PointChargingBtn from "../../components/commons/button/PointChargingBtn";

const ConfirmModalPresenter = (props: any) => {
  return (
    <>
      <Modal
        open={props.ismodalToggle}
        onOk={props.handleOk}
        onCancel={props.onToggleModal}
        footer={false}
        width={props.btnFnc === "charging" ? 350 : 400}
      >
        {props.btnFnc === "charging" && (
          <>
            <S.Header>
              <S.Img src="/charging.png" />
              <div>
                <strong>충전하실 금액을 선택해주세요!</strong>
              </div>
            </S.Header>
            <Select
              defaultValue={props.selectedOption}
              onChange={props.setSelectedOption}
              options={props.options}
            />
          </>
        )}

        {props.btnFnc === "boardDelete" && <p>정말로 삭제하시겠습니까?</p>}
        {props.btnFnc === "deleteUseditem" && <p>정말로 삭제하시겠습니까?</p>}
        {props.btnFnc === "usedItemQuestionDelete" && (
          <p>정말로 삭제하시겠습니까?</p>
        )}
        {props.btnFnc === "cartIn" && (
          <p>
            장바구니에 담겼습니다! <br />
            장바구니로 이동하시겠습니까?
          </p>
        )}
        {props.btnFnc === "boardCommentDelete" && (
          <>
            <input
              type="text"
              onChange={props.onChangePassword}
              value={props.password}
            />
            <p>비밀번호를 입력하세요.</p>
          </>
        )}
        <S.Footer>
          {props.btnFnc === "charging" ? (
            <PointChargingBtn selectedOption={props.selectedOption} />
          ) : (
            <>
              <S.Button onClick={props.handleOk}>확인</S.Button>
              <S.Button isCancel={true} onClick={props.onToggleModal}>
                취소
              </S.Button>
            </>
          )}
        </S.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModalPresenter;
