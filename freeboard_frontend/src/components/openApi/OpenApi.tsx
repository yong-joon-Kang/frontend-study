import axios from "axios";
import { useEffect, useState } from "react";
import DogImageList from "./dogImageList";
import styled from "@emotion/styled";

const BtnGetImage = styled.div`
  border: 1px solid black;
  width: 200px;
  height: 40px;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 12px 0 8px 0;
  cursor: pointer;
`;

function OpenApi() {
  const [dogImageUrl, setDogImageUrl] = useState<string[]>([]);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setDogImageUrl([]);
    const dogFetch = () => {
      new Array(9).fill("").forEach(async (_) => {
        const result = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        setDogImageUrl((prev) => [...prev, result.data.message]);
      });
    };

    dogFetch();
  }, [isChange]);

  const onFetchDogImage = () => {
    setIsChange(!isChange);
  };
  return (
    <>
      <BtnGetImage onClick={onFetchDogImage}>사진 불러오기</BtnGetImage>
      <DogImageList dogImageUrl={dogImageUrl} />
    </>
  );
}

export default OpenApi;
