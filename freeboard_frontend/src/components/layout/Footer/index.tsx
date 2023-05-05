import styled from "@emotion/styled";

const Wrap = styled.div`
  width: 100%;
  background-color: #6a6a6a;
`;

const Inner = styled.div`
  width: 500px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 13px;
  color: #fff;
  margin: 10px 0;
`;

const Title = styled.div`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

function Footer() {
  return (
    <Wrap>
      <Inner>
        <div>
          <Title>Contact</Title>
          <Label>phone: 010-5571-1068</Label>
          <Label>email: kangyj2197@gmail.com</Label>
        </div>
        <div>
          <Title style={{ marginBottom: "10px" }}>Link</Title>
          <svg
            style={{ marginRight: "10px", cursor: "pointer" }}
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            data-view-component="true"
            onClick={() => {
              window.open(
                "https://github.com/yong-joon-Kang",
                "_blank",
                "noopener, noreferrer"
              );
            }}
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          <svg
            style={{ cursor: "pointer" }}
            width="30"
            height="30"
            viewBox="0 0 192 192"
            fill="currentColor"
            onClick={() => {
              window.open(
                "https://velog.io/@kangyj2197",
                "_blank",
                "noopener, noreferrer"
              );
            }}
          >
            <path
              d="M24 0H168C181.255 0 192 10.7451 192 24V168C192 181.255 181.255 192 168 192H24C10.7451 192 0 181.255 0 168V24C0 10.7451 10.7451 0 24 0ZM49 57.9199V65.48H67L80.6799 142.52L98.5 141.26C116.02 119.06 127.84 102.44 133.96 91.3999C140.2 80.24 143.32 70.9399 143.32 63.5C143.32 59.0601 142 55.7 139.36 53.4199C136.84 51.1399 133.66 50 129.82 50C122.62 50 116.62 53.0601 111.82 59.1799C116.5 62.3 119.68 64.8799 121.36 66.9199C123.16 68.8401 124.06 71.4199 124.06 74.6599C124.06 80.0601 122.44 86.1799 119.2 93.02C116.08 99.8601 112.66 105.92 108.94 111.2C106.54 114.56 103.48 118.7 99.76 123.62L88.0601 57.2C87.1001 52.3999 84.1001 50 79.0601 50C76.78 50 72.3999 50.96 65.9199 52.8799C59.4399 54.6799 53.8 56.3601 49 57.9199Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </Inner>
    </Wrap>
  );
}

export default Footer;
