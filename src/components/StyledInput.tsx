import React, { useState } from 'react';
import styled from 'styled-components';

interface StyledCharInputProps {
  isCorrect?: boolean;
  value?: string;
  charValue?: string;
  maxLength?: number;
}
interface InputComponentProps {
  isCorrect?: boolean;
  value?: string;
  charValue?: string;
  inputIndex?: number;
  currentScore: boolean[];
  nextSentence: () => void;
  setRef: (inputEl: HTMLInputElement, inputIndex: number) => void;
  updateCurrentScore: (inputIndex: number, isCorrect: boolean) => void;
  changeFocus: (inputIndex: number) => void;
}

const StyledCharInput = styled.input<StyledCharInputProps>`
  width: 100%;
  height: 4.1rem;
  font-size: 1.2rem;
  flex: 1;
  margin: 1%;
  text-align: center;
  border: none;
  color: white;
  background: #e1e1e1;
  background: ${(props) => {
    switch (props.isCorrect) {
      case true:
        return '#4caf50';
      case false:
        return '#bb5b5b';
      default:
        return `${props.charValue === ' ' ? '#ffb74d' : '#e1e1e1'}`;
    }
  }};
`;

const InputComponent = ({
  value,
  inputIndex,
  setRef,
  updateCurrentScore,
  nextSentence,
  currentScore,
  changeFocus,
}: InputComponentProps): JSX.Element => {
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  return (
    <StyledCharInput
      maxLength={1}
      charValue={value}
      ref={(el: HTMLInputElement) => {
        inputIndex && el && setRef(el, inputIndex);
      }}
      onKeyDown={(e: { code: string }) => {
        typeof isCorrect === 'undefined' &&
          inputIndex &&
          e.code === 'Backspace' &&
          changeFocus(inputIndex - 1);

        currentScore.reduce((p, c) => p && c) &&
          e.code === 'Enter' &&
          nextSentence();
      }}
      isCorrect={isCorrect}
      onChange={(e: { target: { value: string | undefined } }) => {
        if (!e.target.value) {
          setIsCorrect(undefined);
          inputIndex && updateCurrentScore(inputIndex - 1, false);
        } else {
          inputIndex && changeFocus(inputIndex + 1);
          if (e.target.value === value) {
            inputIndex && updateCurrentScore(inputIndex - 1, true);
            setIsCorrect(true);
          } else {
            inputIndex && updateCurrentScore(inputIndex - 1, false);
            setIsCorrect(false);
          }
        }
      }}
    />
  );
};
export default InputComponent;
