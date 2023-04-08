import styled from "@emotion/styled";

const Img = styled.img`
  width: 300px;
  height: 250px;
  object-fit: contain;
  background-color: #bbb;
  border: 2px solid #999;
  margin: 8px 10px;
`;

interface IProps {
  dogImageUrl: string[];
}

function DogImageList(props: IProps) {
  return (
    <div>
      {props.dogImageUrl.map((el, index) => (
        <>
          <Img key={index} src={el} />
          {(index + 1) % 3 === 0 && <br />}
        </>
      ))}
    </div>
  );
}

export default DogImageList;
