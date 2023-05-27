import OneRowPresenter from "./OneRow.presenter";
import { IProps } from "./OneRow.types";

function OneRowContainer(props: IProps) {
  return (
    <OneRowPresenter list={props.list} searchKeyword={props.searchKeyword} />
  );
}

export default OneRowContainer;
