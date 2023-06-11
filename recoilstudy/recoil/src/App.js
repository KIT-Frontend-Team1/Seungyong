import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

// recoilRoot는 recoil 상태를 사용하는 컴포넌트는 부모 트리에 recoilRoot가 필요하다
function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

// atom은 상태의 일부다
// 어디에서든 읽고 쓸 수 있다.
// atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다.
// 그래서 atom에 어떤 변화가 있으면 atom을 사용하는 모든 컴포넌트가 리렌더링한다.
const textState = atom({
  key: "textState",
  default: "",
});

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}
// 컴포넌트가 atom을 읽고 쓰게 하기 위해서는 useRecoilState()를 아래와 같이 사용하면 된다.
function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

// Selector는 파생된 상태(derived state)의 일부를 나타낸다.
// 파생된 상태는 상태의 변화다.
// 파생된 상태를 어떤 방법으로든 주어진
// 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.
const charCountState = selector({
  key: "charCountState",
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

// useRecoilValue() 훅을 사용해서 charCountState 값을 읽을 수 있다.
function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

export default App;

// 사실 잘 모르겠다!!!!
// 공부를 했는데도 모르겠다!!!!
// 뭘까!!!! 왜 쓰는거지!!!!
// 글자수하나 체크하겠다고 이렇게 사용하는건가!!!
// 진짜 모르겠다!!!! 궁금하다!!!! 화요일날 수업을 들으면 알수있을까?
