interface IProps {
  width: string;
  height: string;
  marginTop: string;
}

function Point(props: IProps) {
  return (
    <img
      style={{
        width: props.width,
        height: props.height,
        marginTop: props.marginTop,
      }}
      src="/point.png"
    />
  );
}

export default Point;
