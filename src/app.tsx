import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./app.css";

interface AppProps {
  name: string;
  build?: string;
}
export interface Quote {
  quote: string;
  length: string;
  author: string;
  tags: string[];
  category: string;
  language: string;
  date: string;
  permalink: string;
  id: string;
  background: string;
  title: string;
}
const App = ({ name, build }: AppProps) => {
  const [quotesOfTheDay, setQuote] = useState({} as Quote);
  useEffect(() => {
    fetch("https://quotes.rest/qod?language=en")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const quote: Quote = data.contents.quotes[0];
          setQuote(quote);
        }
      });
  }, []);
  return (
    <div className="container">
      <header>
        <h2>Quote Of The Day Created by {name}</h2>
        <br />
        <blockquote>Current Build variant: {build}</blockquote>
      </header>
      {quotesOfTheDay.quote && (
        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              <img
                className="locandina"
                src={
                  "https://source.unsplash.com/700x100/?" +
                  quotesOfTheDay.category
                }
              />
              <h1>{quotesOfTheDay.author}</h1>
              <h4>{quotesOfTheDay.date}</h4>
              <p className="type">{quotesOfTheDay.tags.join(", ")}</p>
            </div>
            <br />
            <div className="movie_desc">
              <p className="text">{quotesOfTheDay.quote}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(
  <App name="deepak" build={process.env.NODE_ENV} />,
  document.getElementById("root")
);
