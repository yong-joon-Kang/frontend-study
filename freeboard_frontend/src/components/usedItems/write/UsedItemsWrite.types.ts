import { IQuery, IUseditem } from "../../../commons/types/generated/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

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
  isActive: boolean;
  onSubmit: (arg0: any) => void;
  register: any;
  handleSubmit: any;
  fileUrls: string[];
  setFileUrls: any;
  onClickUsedItemsList: () => void;
  // setFileUrls: Dispatch<SetStateAction<string[]>>;
  // fileUrls: string[];
  // writerErr: string;
  // passwordErr: string;
  // titleErr: string;
  // contentsErr: string;
  // isActive: boolean;
  isEdit: boolean;
  // address: string;
  // zipcode: string;
  // fetchBoardDataList?: Pick<IQuery, "fetchBoard">;
  // onWriterChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  // onPasswordChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  // onTitleChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  // onContentsChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  // onChangeDetailAddress: (event: ChangeEvent<HTMLInputElement>) => void;
  // onChangeYoutubeUrl: (event: ChangeEvent<HTMLInputElement>) => void;
  // onSubmitUpdate: () => void;
  // onClickPostCode: () => void;
}

export interface ICssprops {
  isContent?: boolean;
}

export interface ISubmitBtnProps {
  isActive: boolean;
}
