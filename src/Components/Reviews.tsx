import "./Reviews.css";
import five from "../Images/yelp_stars/web_and_ios/regular/regular_5.png";
import four from "../Images/yelp_stars/web_and_ios/regular/regular_4.png";
import fourHalf from "../Images/yelp_stars/web_and_ios/regular/regular_4.5.png";
import three from "../Images/yelp_stars/web_and_ios/regular/regular_3.png";
import threeHalf from "../Images/yelp_stars/web_and_ios/regular/regular_3.5.png";
import two from "../Images/yelp_stars/web_and_ios/regular/regular_2.png";
import twoHalf from "../Images/yelp_stars/web_and_ios/regular/regular_2.5.png";
import one from "../Images/yelp_stars/web_and_ios/regular/regular_1.png";
import oneHalf from "../Images/yelp_stars/web_and_ios/regular/regular_1.5.png";
import zero from "../Images/yelp_stars/web_and_ios/regular/regular_0.png";

interface ReviewProps {
  reviews: Array<any>;
}

function Review(props: ReviewProps) {
  const convertRating = (rating: number) => {
    let starImage = "";
    if (rating == 5) {
      starImage = five;
    } else if (rating == 4.5) {
      starImage = fourHalf;
    } else if (rating == 4) {
      starImage = four;
    } else if (rating == 3.5) {
      starImage = threeHalf;
    } else if (rating == 3) {
      starImage = three;
    } else if (rating == 2.5) {
      starImage = twoHalf;
    } else if (rating == 2) {
      starImage = two;
    } else if (rating == 1.5) {
      starImage = oneHalf;
    } else if (rating == 1) {
      starImage = one;
    } else {
      starImage = zero;
    }

    return starImage;
  };

  const formatDate = (date: string) => {
    const [year, month, tempDay] = date.split("-");
    const day = tempDay.split(" ");
    return `${month}/${day[0]}/${year}`;
  };

  return (
    <>
      <div>
        {props.reviews?.map((val: any) => {
          console.log(val);
          const profImage = val.user.image_url;
          const rating = val.rating;
          const starImage = convertRating(rating);

          const date = formatDate(val.time_created);
          return (
            <div className="Reviews">
              <div className="Review">
                <div>
                  <span
                    className="Review-Image"
                    style={{
                      backgroundImage: `url(${profImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></span>
                </div>
                <div className="Review-Info">
                  <h2 className="Review-Name">{val.user.name}</h2>
                  <h2 className="Review-Date">{date}</h2>
                </div>
              </div>
              <div className="Reviews-Rating">
                <span
                  className="Reviews-Rating-Image"
                  style={{
                    backgroundImage: `url(${starImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                ></span>
              </div>
              <div>
                <h1 className="Reviews-Text">{val.text}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Review;
