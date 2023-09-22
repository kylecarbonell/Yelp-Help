import { useState } from "react";

import "./App.css";

import Review from "./Components/Reviews";

function App() {
  const [reviews, setReviews] = useState<any>();

  const [link, setLink] = useState("");

  const key = import.meta.env.VITE_REACT_APP_KEY;
  // console.log(key);

  const getApi = async () => {
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      async (tab) => {
        const url = tab[0].url as string;
        const newLink = formatUrl(url);
        setLink(newLink);
        console.log(`link : ${newLink}`);

        const data = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${newLink}&location=san%20jose&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${key}`,
              Origin: "localhost",
              withCredentials: true,
            } as any,
          }
        );

        if (!data.ok) {
          return;
        }

        const json = await data.json();
        console.log(json);
        const sb1 = json.businesses[0];
        const loc = sb1.alias;

        const reviewCall = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${loc}/reviews?offset=2&limit=20&sort_by=yelp_sort`,
          {
            headers: {
              Authorization: `Bearer ${key}`,
              Origin: "localhost",
              withCredentials: true,
            } as any,
          }
        );

        const reviewJson = await reviewCall.json();
        const reviews = reviewJson.reviews;
        setReviews(reviews);
      }
    );
  };

  const formatUrl = (url: string) => {
    const temp = url.split(".");
    return temp[1];
  };

  return (
    <>
      <h1>Yelp Help</h1>
      <div className="card">
        <button
          onClick={() => {
            getApi();
          }}
        >
          Get Reviews
        </button>
      </div>
      <h1>{link}</h1>

      {reviews && (
        <div>
          <Review reviews={reviews}></Review>
        </div>
      )}
    </>
  );
}

export default App;
