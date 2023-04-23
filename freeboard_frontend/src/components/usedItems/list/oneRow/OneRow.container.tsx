import OneRowPresenter from "./OneRow.presenter";
import { IListProps } from "./OneRow.types";

function OneRowContainer(props: IListProps) {
  return <OneRowPresenter list={props.list} />;
}

export default OneRowContainer;
