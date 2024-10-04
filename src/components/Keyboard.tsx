import { useState } from "react";

function Keyboard({ onKeyPress }: { onKeyPress: (letter: string) => void }) {
  const alphabet = 'AZERTYUIOPQSDFGHJKLMWXCVBN'.split('');
  const [pressedLetter, setPressedLetter] = useState<string | null>(null);

  const handleClick = (letter: string) => {
    setPressedLetter(letter);
    onKeyPress(letter); 

    setTimeout(() => {
      setPressedLetter(null);
    }, 200);
  };

  return (
    <>
      <div>
        <div className="xl:px-[340px] md:px-[200px] px-[30px]">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => handleClick(letter)}
              className={`px-4 py-2 m-1 rounded ${pressedLetter === letter ? 'bg-red-500' : 'bg-black'}`}
              tabIndex={-1}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Keyboard;
