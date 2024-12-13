import { useState, useEffect } from "react";
import "./App.css";
import Description from "./Description/Description";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import Notification from "./Notification/Notification";

function App() {
  const basicFeedback = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [options, setOptions] = useState(() => {
    const reviews = localStorage.getItem("reviews");

    if (reviews !== null) {
      return JSON.parse(reviews);
    }

    return basicFeedback;
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(options));
  }, [options]);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      return setOptions(() => {
        return basicFeedback;
      });
    }

    setOptions(() => {
      return {
        ...options,
        [feedbackType]: options[feedbackType] + 1,
      };
    }, [options]);
  };

  const totalFeedback = Object.values(options).reduce((total, value) => {
    return (total += value);
  }, 0);

  return (
    <>
      <Description />
      <Options
        onUpdate={updateFeedback}
        feedbackItems={options}
        keepFeedback={totalFeedback}
      />
      {totalFeedback > 0 && (
        <Feedback
          feedbackItems={options}
          total={totalFeedback}
          positiveFeedback={Math.round((options.good / totalFeedback) * 100)}
        />
      )}
      {totalFeedback === 0 && <Notification />}
    </>
  );
}

export default App;
