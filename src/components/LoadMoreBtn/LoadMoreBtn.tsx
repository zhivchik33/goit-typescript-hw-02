import style from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button type="button" className={style.loadBtn} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
