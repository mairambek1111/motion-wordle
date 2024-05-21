import { useEffect, useRef, useState } from "react";
import "./card.scss";
import axios from "axios";

function Card() {
  const [data, setData] = useState<string[]>([""]);

  const inputsRef = useRef<HTMLInputElement[] | any>([]);

  const [answer, setAnswer] = useState<string[]>(Array(25).fill(""));

  const [enter, setEnter] = useState<boolean>(false);

  useEffect(() => {
    axios.get("https://piccolo-server.vercel.app/words").then((res) => {
      const words = res.data.data;
      const randomIndex = Math.floor(Math.random() * words.length);
      const selectedWord = words[randomIndex];
      const paddedWord = selectedWord.padEnd(5);
      setData(paddedWord.split(""));
    });
  }, []);

  function handleInputChange(index: number, e: any) {
    const { value } = e.target;
    const newInputValue = [...answer];
    newInputValue[index] = value.toUpperCase();
    setAnswer(newInputValue);
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      const isMatch = data.every((char, i) => char === answer[i]);
      if (isMatch) {
        alert("Поздравляем вы угадали слово!!!");
        window.location.reload();
      }
      setEnter(true);
    } else {
      setEnter(false);
    }
    if (e.key === "Backspace" && index > 0 && answer[index] === "") {
      const newAnswer = [...answer];
      newAnswer[index - 1] = "";
      setAnswer(newAnswer);
      inputsRef.current[index - 1].focus();
    }
  }

  const inputs = Array.from({ length: 25 }, (_, index) => {
    const adjustedIndex = index % 5;
    return (
      <input
        ref={(input) => (inputsRef.current[index] = input)}
        key={index}
        className="cards__content__box"
        type="text"
        maxLength={1}
        value={answer[index]}
        onChange={(e) => handleInputChange(index, e)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        style={{
          background: enter
            ? data[adjustedIndex] && answer[index] === data[adjustedIndex]
              ? "#15C285"
              : data.includes(answer[index]) && answer[index] !== ""
              ? "#FBBF54"
              : "#C2C3C7"
            : "#C2C3C7",
        }}
      />
    );
  });

  console.log(data);

  return (
    <>
      <section className="cards">
        <div className="container">
          <div className="cards__content">
            <div className="cards__content__card">{inputs}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Card;
