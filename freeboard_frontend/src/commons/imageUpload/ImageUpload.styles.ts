import styled from "@emotion/styled";
import { ICssprops } from "./ImageUpload.types";

export const UploadBtn = styled.button`
  ${(props: ICssprops) =>
    props.isProduct
      ? "height: 140px; width: 140px;"
      : props.isProfile
      ? "height: 300px; width: 300px;"
      : "height: 100px; width: 100px;"};

  background: #eee;
  border: none;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
  padding: 20px;
`;

export const Plus = styled.div`
  font-size: 24px;
`;

export const UploadText = styled.div`
  font-size: 16px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Cancel = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
`;
