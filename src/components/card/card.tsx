import { useEffect, useRef, useState } from "react";
import "./card.scss";
import axios from "axios";

function Card() {
  const [data, setdata] = useState<string>("");

  const inputsRef = useRef<HTMLInputElement[] | any>([]);

  useEffect(() => {
    axios.get("https://piccolo-server.vercel.app/words").then((res) => {
      const words = res.data.data;
      const ranodomIndex = Math.floor(Math.random() * words.length);
      console.log(ranodomIndex);
      const selectWords = words[ranodomIndex];
      setdata(selectWords);
    });
  }, []);

  function HandleInputChange(index: number, e: any) {
    const { value } = e.target;
    if (value.length === 1 && index < data.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  }

  const inputs = Array.from({ length: 25 }, (_, index) => (
    <input
      ref={(input) => (inputsRef.current[index] = input)}
      key={index}
      className="cards__content__box"
      type="text"
      maxLength={1}
      value={data[index]}
      onChange={(e) => HandleInputChange(index, e)}
    />
  ));
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
