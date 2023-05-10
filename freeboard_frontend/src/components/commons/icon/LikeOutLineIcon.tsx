import { HeartOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { color } from "../../../../styles/common";

const Like = styled(HeartOutlined)`
  color: ${color.primary};
`;

function LikeOutLineIcon() {
  return <Like />;
}

export default LikeOutLineIcon;
