import React, { useState, useEffect, useRef } from 'react';
import fetchJsonData from './helpers/APIcalls/JsonData';
import { processSentence, finalSentence } from './helpers/randomizeWord';
import Sentence from './components/Sentence';
import InputComponent from './components/StyledInput';
import './App.css';
import Win from './components/Win';
const App = (): JSX.Element => {
  const [sentence, setSentence] = useState<string | undefined>(undefined);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [dataIndex, setDataIndex] = useState<number>(1);
  const [showWin, setShowWin] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<boolean[]>([]);
  const [charsArr, setCharsArr] = useState<string[]>([]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  let count = 0;
  useEffect(() => {
    const getSentence = async () => {
      try {
        const data = await fetchJsonData(dataIndex);
        if (data.data) {
          const s = processSentence(data.data.sentence);
          const final = finalSentence(data.data.sentence);
          setCharsArr(final);
          setSentence(s);

          let scoreboard: boolean[] = [];
          for (let i = 0; i < final.join('').length; i++) {
            scoreboard[i] = false;
            if (i === final.join('').length - 1)
              setCurrentScore([...scoreboard]);
          }
          changeFocus(1);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getSentence();
  }, [dataIndex]);

  const setRef = (inputEl: HTMLInputElement, inputIndex: number) => {
    inputRefs.current[inputIndex] = inputEl;
  };

  const nextSentence = () => {
    if (totalScore === 9) {
      setShowWin(true);
    } else {
      setTotalScore(totalScore + 1);
      setDataIndex(dataIndex + 1);
    }
  };
  const updateCurrentScore = (inputIndex: number, isCorrect: boolean) => {
    const updated = [...currentScore];
    updated[inputIndex] = isCorrect;
    setCurrentScore(updated);
  };

  const changeFocus = (inputIndex: number) => {
    const ref = inputRefs.current[inputIndex];
    if (ref) {
      ref.focus();
    }
  };

  const renderChars = (word: string) => {
    const chars = word.split('');
    return chars.map((c) => {
      count++;
      return (
        <InputComponent
          currentScore={currentScore}
          nextSentence={nextSentence}
          key={count.toString()}
          value={c}
          updateCurrentScore={updateCurrentScore}
          inputIndex={count}
          setRef={setRef}
          changeFocus={changeFocus}
        />
      );
    });
  };

  const renderWords = () => {
    return charsArr.map((w, i) => {
      return (
        <div key={(w + i).toString()} className='row'>
          {renderChars(w)}
        </div>
      );
    });
  };

  return (
    <div>
      {showWin ? (
        <Win />
      ) : (
        <div className='row flexCenter'>
          <div className='container'>
            <div className='topSentence'>
              {!!sentence && <Sentence sentence={sentence} />}
            </div>
            <div className='textCenter'>
              <div className='infoText'>
                Guess the sentence! Starting typing
              </div>
              <div className='infoText'>
                The yellow blocks are meant for spaces
              </div>
            </div>
            <div className='scoreText'>Score: {totalScore}</div>
            {renderWords()}
            <div className='btnRow'>
              {!!currentScore.length && currentScore.reduce((p, c) => p && c) && (
                <button onClick={nextSentence} className='nextBtn'>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
