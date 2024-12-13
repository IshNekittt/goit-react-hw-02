import s from "./Description.module.css";
export default function Description() {
  return (
    <div className={s.headerContainer}>
      <h1 className={s.heading}>Sip Happens Café</h1>
      <p className={s.title}>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
    </div>
  );
}
