// reducers/counter.js

// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣습니다.
export const BANNERIMAGE = "BANNERIMAGE";
export const bannerImageList = (imageList) => ({
  type: BANNERIMAGE,
  payload: { imageList: imageList },
});

const initalState = [];

const bannerImage = (state = initalState, action) => {
  switch (action.type) {
    case BANNERIMAGE:
      return [...state, action.payload];

    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};

export default bannerImage;
