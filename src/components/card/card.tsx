import { useEffect, useRef, useState } from "react";
import "./card.scss";
import axios from "axios";

function Card() {
  const [data, setdata] = useState<string>("");

  const inputsRef = useRef<HTMLInputElement[] | any>([]);

  const [answer, setAnswer] = useState<string[]>(
    Array.from({ length: 25 }, () => "")
  );
  const [answers, setAnswers] = useState<boolean[]>(
    Array.from({ length: 25 }, () => false)
  );

  useEffect(() => {
    axios.get("https://piccolo-server.vercel.app/words").then((res) => {
      const words = res.data.data;
      console.log(words);
      const ranodomIndex = Math.floor(Math.random() * words.length);
      console.log(ranodomIndex);
      const selectWords = words[ranodomIndex];
      setdata(selectWords);
    });
  }, []);

  console.log(data);

  // window.addEventListener("keydown", function (e: KeyboardEvent) {
  //   if (e.key === "Backspace") {
  //     setAnswer(answer.slice(0, -1));
  //   }
  // });

  function HandleInputChange(index: number, e: any) {
    const { value } = e.target;
    const newINput = [...answer];
    newINput[index] = value.toUpperCase();
    setAnswer(newINput);

    if (value.toUpperCase() === data.charAt(index).toUpperCase()) {
      const newMatched = [...answers];

      newMatched[index] = true;

      setAnswers(newMatched);
    } else {
      const newMatched = [...answers];
      newMatched[index] = false;
      setAnswers(newMatched);
    }
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  }

  const inputs = Array.from({ length: 25 }, (_, index) => (
    <input
      ref={(input) => (inputsRef.current[index] = input)}
      key={index}
      className={`cards__content__box ${answers[index] ? "matched" : ""}`}
      type="text"
      maxLength={1}
      value={answer[index] || ""}
      onChange={(e) => HandleInputChange(index, e)}
    />
  ));

  return (
    <>
      <section className="cards">
        <div className="container">
          <div className="cards__content">
            <div className="cards__content__card">{inputs}</div>
            <button>Click</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Card;
