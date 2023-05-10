import { HeartFilled } from "@ant-design/icons";
import styled from "@emotion/styled";
import { color } from "../../../../styles/common";

const Like = styled(HeartFilled)`
  color: ${color.primary};
`;

function LikeIcon() {
  return <Like />;
}

export default LikeIcon;
