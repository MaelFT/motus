import { useEffect, useState } from "react";
import Keyboard from "./Keyboard";

function Grid() {
  const [wordList] = useState([
    "PINE", "APPLE", "DANCE", "CHAIR", "EAGLE", "FROST", "GRAPE", "HOUSE", "IVORY", "JUDGE",
    "LEMON", "MONEY", "NORTH", "OCEAN", "PLANT", "QUEST", "RIVER", "SNAKE", "TABLE", "UNITY",
    "VOICE", "WATER", "XENON", "YOUTH", "ZEBRA", "BREAD", "CLOUD", "DREAM", "EARTH", "FLAME",
    "HEART", "IMAGE", "JEWEL", "KITES", "LIGHT", "MUSIC", "NIGHT", "OPERA", "PEACE", "QUILT",
    "ROYAL", "STONE", "TIGER", "UNDER", "VIVID", "WHALE", "ZESTY", "SILVER", "MYSTIC", "TUNING",
    "DOLPHIN", "RHYTHM", "BLOSSOM", "GLITTER", "PUMPKIN", "ZUCCHINI"
  ]);
  
  const [word, setWord] = useState("PUMPKIN");
  const [tryingWord, setTryingWord] = useState("P......");
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [letter, setLetters] = useState("P......");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setWord(randomWord);
    setLetters(randomWord[0] + ".".repeat(randomWord.length - 1));
    setTryingWord(randomWord[0] + ".".repeat(randomWord.length - 1));
  }, [wordList]);

  const handleWordValidation = () => {
    if (tryingWord.includes(".")) {
      setMessage("Warning, some letters are missing!");
      return;
    }

    if (tryingWord === word) {
      setMessage(`Well done! The word was: ${word}`);
    } else {
      const remainingAttempts = attemptsLeft - 1;

      if (remainingAttempts === 0) {
        setMessage(`Game over! The word was: ${word}`);
      } else {
        const updatedLetters = tryingWord.split("").map((char, index) => {
          return word[index] === char ? char : ".";
        });

        setAttempts((prev) => [...prev, tryingWord]);
        setLetters(updatedLetters.join(""));
        setTryingWord(updatedLetters.join(""));
        setAttemptsLeft(remainingAttempts);
        setMessage("");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.toUpperCase();

    setTryingWord((prev) => {
      const updatedWord = prev.split("");
      updatedWord[index] = value;
      return updatedWord.join("");
    });

    if (value !== "") {
      const nextInput = e.target.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;

    if (e.key === "Backspace") {
      setTryingWord((prev) => {
        const updatedWord = prev.split("");
        updatedWord[index] = ".";
        return updatedWord.join("");
      });

      if (target.value === "") {
        const prevInput = target.previousElementSibling as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
          prevInput.value = "";
          e.preventDefault();
        }
      } else {
        target.value = "";
        e.preventDefault();
      }
    }

    if (e.key === "Enter") {
      handleWordValidation();
    }
  };

  const handleVirtualKey = (letter: string) => {
    const firstEmptyIndex = tryingWord.indexOf(".");
    if (firstEmptyIndex !== -1) {
      setTryingWord((prev) => {
        const updatedWord = prev.split("");
        updatedWord[firstEmptyIndex] = letter;
        return updatedWord.join("");
      });
    }
  };

  const getClassForLetter = (letter: string, index: number, word: string) => {
    if (word[index] === letter) {
      return "text-red-500";
    } else if (word.includes(letter)) {
      return "text-yellow-500";
    }
    return "text-black";
  };

  const getMessageClass = () => {
    if (message.startsWith("Warning")) {
      return "text-yellow-500";
    } else if (message.startsWith("Game over")) {
      return "text-red-500";
    } else if (message.startsWith("Well done")) {
      return "text-green-500";
    }
    return "";
  };

  return (
    <>
      <div>
        <div className="">
          {attempts.map((attempt, attemptIndex) => (
            <div className="flex justify-center items-center gap-4 my-2" key={attemptIndex}>
              {Array.from({ length: letter.length }).map((_, charIndex) => (
                <span
                  key={charIndex}
                  className={`bg-white px-4 py-2 w-12 rounded text-xl text-center ${getClassForLetter(attempt[charIndex], charIndex, word)}`}
                >
                  {attempt[charIndex]}
                </span>
              ))}
            </div>
          ))}

          <div className="flex justify-center items-center gap-4 my-2">
            {Array.from({ length: letter.length }).map((_, index) => (
              <input
                key={index}
                className="bg-white text-black px-4 py-2 w-12 rounded text-xl text-center placeholder-red-200"
                placeholder={letter[index]}
                maxLength={1}
                value={tryingWord[index] === '.' ? '' : tryingWord[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                readOnly={letter[index] !== "."}
              />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 my-2">
            <button onClick={handleWordValidation}>Validate</button>
            <span>Attempt(s) left: {attemptsLeft}</span>
          </div>
          <button onClick={() => window.location.reload()}>Reset</button>
          <p className={`mt-4 ${getMessageClass()}`}>{message}</p>
        </div>
      </div>
      <Keyboard onKeyPress={handleVirtualKey} />
    </>
  );
}

export default Grid;
