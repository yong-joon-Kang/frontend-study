import { IQuery } from "../../../commons/types/generated/types";

export interface indexPageProps {
  isEdit: boolean;
  fetchBoardDataList?: Pick<IQuery, "fetchBoard">;
}

export interface IUpdateBoardInput {
  youtubeUrl?: string;
  title?: string;
  contents?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
  images?: string[];
}

export interface IUsedItemsPresenterPageProps {
  data: Pick<IQuery, "fetchUseditem"> | undefined;
  control: any;
  errors: any;
  onSubmit: (arg0: any) => void;
  register: any;
  handleSubmit: any;
  fileUrls: string[];
  setFileUrls: any;
  onClickUsedItemsList: () => void;
  isEdit: boolean;
}

export interface ICssprops {
  isContent?: boolean;
  alignCenter?: boolean;
}
