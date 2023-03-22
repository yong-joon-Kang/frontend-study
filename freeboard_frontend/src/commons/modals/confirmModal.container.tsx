import ConfirmModalPresenter from "./confirmModal.presenter";
import { useState } from "react";

export default function confirmModalContainer() {
  const [ismodalToggle, setModalToggle] = useState(false);

  const onToggleModal = () => {
    setModalToggle(!ismodalToggle);
  };

  const handleOk = () => {
    setModalToggle(!ismodalToggle);
    // props.onClickBoardDelete?.();
  };

  return (
    <ConfirmModalPresenter
      onToggleModal={onToggleModal}
      handleOk={handleOk}
      ismodalToggle={ismodalToggle}
    />
  );
}
