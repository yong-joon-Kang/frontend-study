import Slider from "react-slick";
import styled from "@emotion/styled";

const BannerWrap = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 100px;
`;

const Img = styled.img`
  width: 100px;
  height: 400px;
  object-fit: cover;
`;

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    appendDots: (dots: any) => <SlickDots>{dots}</SlickDots>,
  };

  const SlickDots = styled.ul`
    // slick-dots 스타일 변경
    width: auto;
    bottom: 6px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    display: flex;
    height: 25px;
    align-items: center;

    .slick-prev {
      /* 이전 버튼 스타일 변경 */
      left: 20px !important;
      z-index: 1 !important;
    }

    button:before {
      color: #fff !important;
    }

    .slick-active {
      // slick-dots 내부 active 스타일 변경
      color: #fff;
    }
    li.slick-active button:before {
      color: #fff;
    }
    li.slick-active button {
      color: #fff;
    }
  `;

  const SlickSlider = styled(Slider)`
    /* slick-slider 스타일 변경 */
    display: flex;
    justify-content: center;

    .slick-arrow {
      &.slick-prev {
        left: 20px;
        z-index: 1;
      }
    }

    .slick-arrow {
      &.slick-next {
        right: 20px;
        z-index: 1;
      }
    }
  `;

  return (
    <BannerWrap>
      <SlickSlider {...settings}>
        {Array(3)
          .fill("/bannerImage.jpg")
          .map((el, index) => (
            <Img key={index} src={el} />
          ))}
      </SlickSlider>
    </BannerWrap>
  );
};

export default Banner;
