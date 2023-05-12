import Slider from "react-slick";
import styled from "@emotion/styled";
import { useState } from "react";

const Wrap = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const UploadImg = styled.img`
  width: 200px;
`;

const AWrap = styled.div`
  ${(props: { isCurr: boolean }) =>
    props.isCurr
      ? "border: 1px solid #ffd600;background: rgba(255, 214, 0, 0.2)"
      : ""};

  padding: 2px 10px;
  width: 100%;
  height: 100%;
`;

const AImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function SlickSlide(props: { images: string[] }) {
  // console.log(props);
  const imageArr = props?.images;
  // let currIdx;
  const [currIdx, setCurrIdx] = useState(0);
  const settings = {
    customPaging: function (i: number) {
      return (
        <AWrap isCurr={currIdx === i}>
          <a>
            <AImg src={`https://storage.googleapis.com/${imageArr[i]}`} />
          </a>
        </AWrap>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => <SlickDots>{dots}</SlickDots>,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrIdx(newIndex);
    },
  };

  const SlickDots = styled.ul`
    // slick-dots 스타일 변경
    width: 100%;
    bottom: -100px;
    display: flex;
    justify-content: center;

    li {
      width: 70px;
      height: 70px;
      margin-right: 30px;
    }
  `;

  return (
    <Wrap>
      <Slider {...settings}>
        {props.images?.map((el: string, index: number) => (
          <UploadImg
            key={index}
            src={`https://storage.googleapis.com/${el}`}
          ></UploadImg>
        ))}
      </Slider>
    </Wrap>
  );
}

export default SlickSlide;
