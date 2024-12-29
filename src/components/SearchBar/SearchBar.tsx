import style from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  return (
    <header className={style.header}>
      <form onSubmit={onSubmit}>
        <input
          className={style.input}
          name="searchBarInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={style.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
