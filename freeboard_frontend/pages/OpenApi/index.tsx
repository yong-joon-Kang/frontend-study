import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";

const Img = styled.img`
  width: 300px;
`;

function OpenApi() {
  const [dogImageUrl, setDogImagUrl] = useState("");
  const [qqq, setQqq] = useState(0);

  useEffect(() => {
    const dogFetch = async () => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      setDogImagUrl(result.data.message);
      console.log(result.data);
    };

    dogFetch();
  }, [qqq]);

  const onFetchDogImage = () => {
    setQqq((prev) => prev + 1);
  };
  return (
    <>
      <button onClick={onFetchDogImage}>사진 불러오기</button>
      <Img src={dogImageUrl} />
    </>
  );
}

export default OpenApi;
