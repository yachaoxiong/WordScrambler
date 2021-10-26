import React from 'react';
//
interface Props {
  sentence: string;
}
const Sentence = ({ sentence }: Props): JSX.Element => {
  return <div id='scrambled-word'>{sentence}</div>;
};

export default Sentence;
