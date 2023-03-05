import "./App.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
var randomWords = require("random-words");
var Highlight = require("react-highlighter");
function App() {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [words, setWords] = useState<string[]>(generateNewWords());
  const [typingWord, setTypingWord] = useState("");
  const [temp, setTemp] = useState<string[]>(words[0].split(" "));
  const [currentWord, setCurrentWord] = useState(temp[0]);
  function generateNewWords(): string[] {
    let temp: string[] = randomWords({
      exactly: 1,
      wordsPerString: 30,
      formatter: (word: string, index: number) => {
        return index === 0
          ? word.slice(0, 1).toUpperCase().concat(word.slice(1))
          : word;
      },
    });

    return temp;
  }
  function reset() {
    try {
      window.location.reload();
    } catch (error) {}
  }
  function checkWord(e: any) {
    setTypingWord(e.target.value.trim());
    if (currentWord == typingWord) {
      setWordIndex(wordIndex + 1);
      e.target.value = "";
    }
  }
  useEffect(() => {
    generateNewWords();
  }, []);

  useEffect(() => {
    if (wordIndex < 30) {
      setCurrentWord(temp[wordIndex]);
    } else {
      alert("Completed");
      reset();
    }
  }, [temp, wordIndex]);

  return (
    <>
      <style>
        {`
        .yellow-highlight {
          background-color: #90EE90;
          font-weight: bold;
          color:black
        }
      `}
      </style>
      <div className="App">
        <div className="MainDiv">
          <div className="TopSection">
            <div className="p-5 fs-4 ">
              <Highlight search={currentWord} matchClass="yellow-highlight">
                {words[0]}
              </Highlight>
              <div className="w-50 p-3 mx-auto">
                <InputGroup
                  size="lg"
                  className="p-5 m-2 mx-auto"
                  onChange={(e: any) => checkWord(e)}
                >
                  <Form.Control
                    autoFocus
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
              </div>
            </div>
          </div>
          <div className="BottomSection">
            <h5>Made with ❤️ </h5>
            <p>Sreenivas k</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
