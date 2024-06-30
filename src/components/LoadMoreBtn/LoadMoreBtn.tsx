import css from "./LoadMoreBtn.module.css";

interface LoadMore {
  newSubmit: () => void;
}
export default function LoadMoreBtn({ newSubmit }: LoadMore) {
  return (
    <>
      <button className={css.btn} onClick={newSubmit}>
        Load More
      </button>
    </>
  );
}
