import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    arrows: false,
  };
  return (
    <BannerWrap>
      <Slider {...settings}>
        {Array(3)
          .fill("/bannerImage.jpg")
          .map((el, index) => (
            <Img key={index} src={el} />
          ))}
      </Slider>
    </BannerWrap>
  );
};

export default Banner;
