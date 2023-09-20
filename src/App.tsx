import { useState } from "react";

import "./App.css";

import Review from "./Components/Reviews";

function App() {
  const [reviews, setReviews] = useState<any>();
  const [loc, setLoc] = useState<string>("");
  const key = import.meta.env.VITE_REACT_APP_KEY;
  console.log(key);

  const getLoc = async () => {
    const searchTerm = "starbucks";
    const data = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=san%20jose&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
          Origin: "localhost",
          withCredentials: true,
        } as any,
      }
    );

    const json = await data.json();
    const sb1 = json.businesses[1];
    setLoc(sb1.alias);
  };

  const getApi = async () => {
    const data = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${loc}/reviews?offset=2&limit=20&sort_by=yelp_sort`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
          Origin: "localhost",
          withCredentials: true,
        } as any,
      }
    );

    const json = await data.json();
    const reviews = json.reviews;
    setReviews(reviews);
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
        <button
          onClick={() => {
            getLoc();
          }}
        >
          Get Location
        </button>
      </div>

      {reviews && (
        <div>
          <Review reviews={reviews}></Review>
        </div>
      )}
    </>
  );
}

export default App;
