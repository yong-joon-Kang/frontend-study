import { GraphQLClient, gql } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async () => {
  try {
    // apollo-client 세팅이 완료되기 전이므로 mutation을 대체할 수 있는 것 사용
    // 쿠키에 httpOnly, secure 형식으로 밖에 받아오지 못하므로 https로 받아야함
    const graphQLClient = new GraphQLClient(
      "https://backendonline.codebootcamp.co.kr/graphql",
      {
        credentials: "include", // 중요한 기밀 정보를 포함할 것 인지?
      }
    );
    const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result?.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
