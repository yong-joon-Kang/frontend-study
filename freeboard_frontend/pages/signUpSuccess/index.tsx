import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Wrap = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.div`
  font-size: 2em;
  margin-bottom: 10px;
`;

const Btn = styled.div`
  border: 1px solid #000;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border-radius: 30px;
  cursor: pointer;
`;

function signUpSuccess() {
  const router = useRouter();
  const onClickLogin = () => {
    router.push("/signIn");
  };
  return (
    <Wrap>
      <Text>WELCOME!!</Text>
      <Text>회원가입이 완료되었습니다!</Text>
      <Btn onClick={onClickLogin}>로그인 페이지로 이동</Btn>
    </Wrap>
  );
}

export default signUpSuccess;
