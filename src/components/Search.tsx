import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type SearchProps = {
  showSearch(): void;
};

const Search: React.FC<SearchProps> = ({ showSearch }) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        showSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="search" ref={searchRef}>
      <h2>
        <Link to={"/"}>iBuy</Link>
      </h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search"
          name="search"
          id="search"
          ref={inputRef}
        />
        <button onClick={showSearch} className="close-search">
          x
        </button>
      </div>
    </div>
  );
};

export default Search;
