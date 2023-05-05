import React from "react";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form style={{ marginTop: "100px" }} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="myNumberInput"
        rules={{ required: true, min: 1 }}
        render={({ field }) => (
          <NumericFormat {...field} thousandSeparator={true} prefix="$" />
        )}
      />
      {errors.myNumberInput?.type === "required" && <p>숫자를 입력해주세요.</p>}
      {errors.myNumberInput?.type === "min" && (
        <p>숫자는 1 이상이어야 합니다.</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
