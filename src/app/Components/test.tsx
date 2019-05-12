import * as React from "react";

interface Props {
  count: number;
  onCountChange(newCount: number): void;
}
export const Test = ({ count, onCountChange }: Props) => {
  return (
    <>
      Count = {count}
      <br />
      <button onClick={() => onCountChange(count + 1)}>+1</button>
    </>
  );
};
Test.displayName = "my-test";
