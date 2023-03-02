import React, { useState } from "react";

function InputSample() {
  const [text, setText] = useState("");

  const displayText = (e) => {
    setText(e.target.value);
  };

  const onReset = (e) => {
    setText("");
  };

  return (
    <div>
      <input onChange={displayText} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값 : {text}</b>
      </div>
    </div>
  );
}

export default InputSample;