function CartPresenter(props) {
  console.log(props?.cart);
  return (
    <div>
      {props?.cart.map((el) => (
        <>
          <div>
            <img src={`https://storage.googleapis.com/${el.image}`}></img>
          </div>
          <div></div>
        </>
      ))}
    </div>
  );
}

export default CartPresenter;
