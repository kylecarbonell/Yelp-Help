import { useEffect, useRef, useState } from "react";

import "./App.css";

import Review from "./Components/Reviews";

function App() {
  const [reviews, setReviews] = useState<any>();
  const [loc, setLoc] = useState("");
  const [link, setLink] = useState("");
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);

  const key = import.meta.env.VITE_REACT_APP_KEY;
  let cityRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  // console.log(key);

  useEffect(() => {
    console.log("GOT IT NOW");
    getResto();
    setLocations([]);
  }, [loc]);

  const onChange = (e: any) => {
    cityRef.current.value = e.target.value;
    console.log(cityRef);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const c = cityRef.current.value.toUpperCase();
    setCity(c);

    cityRef.current.value = "";
  };

  const getLoc = async () => {
    setReviews([]);
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      async (tab) => {
        const url = tab[0].url as string;
        const newLink = formatUrl(url);
        setLink(newLink);
        console.log(`link : ${newLink}`);
        const cityLoc = city
          ? ` &location=${city.replace(" ", "%20")}`
          : "&location=San%20Francisco";
        console.log(cityLoc);
        const data = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${newLink}&limit=5${cityLoc}`,
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
        console.log("HERHE");
        console.log(json.businesses);
        console.log("end HERHE");

        setLocations(json.businesses);
      }
    );
  };

  const getResto = async () => {
    const query = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${loc}/reviews?offset=2&limit=20&sort_by=yelp_sort`;
    console.log(query);
    const reviewCall = await fetch(query, {
      headers: {
        Authorization: `Bearer ${key}`,
        Origin: "localhost",
        withCredentials: true,
      } as any,
    });

    const reviewJson = await reviewCall.json();
    const reviews = reviewJson.reviews;
    setReviews(reviews);
  };

  const formatUrl = (url: string) => {
    const temp = url.split(".");
    return temp[1];
  };

  const onLocClick = (id: string) => {
    const a = id as string;
    setLoc(a);
    console.log(id);
  };

  useEffect(() => {
    getLoc();
  }, []);

  return (
    <>
      <h1>Yelp Help</h1>
      <h1>{link.toUpperCase()}</h1>
      <div className="card">
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <input onChange={onChange} ref={cityRef}></input>
        </form>
        <button
          onClick={() => {
            setLocations([]);
            getLoc();
          }}
        >
          Get Reviews <span>{city && "in " + city}</span>
        </button>
      </div>

      {locations.map((val: any) => {
        return (
          <h1
            className="locationButton"
            onClick={() => {
              onLocClick(val.alias);
            }}
          >
            {val.location.display_address.join(",")}
          </h1>
        );
      })}
      {reviews && (
        <div>
          <Review reviews={reviews}></Review>
        </div>
      )}
    </>
  );
}

export default App;
