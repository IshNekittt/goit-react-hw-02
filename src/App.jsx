import { useState, useEffect } from "react";
import "./App.css";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

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

  const updateFeedback = (feedbackType = "reset") => {
    if (feedbackType === "reset") {
      return setOptions(() => {
        return basicFeedback;
      });
    }

    setOptions((prev) => {
      return {
        ...prev,
        [feedbackType]: prev[feedbackType] + 1,
      };
    });
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
