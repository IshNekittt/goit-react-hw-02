import s from "./Feedback.module.css";
export default function Feedback({ feedbackItems, total, positiveFeedback }) {
  return (
    <div className={s.feedbackContainer}>
      <ul className={s.feedbackList}>
        {Object.keys(feedbackItems).map((property, id) => {
          return (
            <li className={s.listItem} key={id}>
              {property}: {feedbackItems[property]}
            </li>
          );
        })}
        <li className={s.listItem}>total: {total}</li>
        <li className={s.listItem}>positive: {positiveFeedback}%</li>
      </ul>
    </div>
  );
}
