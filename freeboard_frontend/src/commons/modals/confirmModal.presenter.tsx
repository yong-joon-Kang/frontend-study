import { Modal } from "antd";

const ConfirmModalPresenter = (props: any) => {
  console.log("===================");
  console.log(props.password);
  return (
    <>
      <Modal
        open={props.ismodalToggle}
        onOk={props.handleOk}
        onCancel={props.onToggleModal}
      >
        {props.btnFnc === "boardDelete" && <p>정말로 삭제하시겠습니까?</p>}
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
      </Modal>
    </>
  );
};

export default ConfirmModalPresenter;
