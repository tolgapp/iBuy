import { useRef, useEffect, useState } from "react";
import "../style/Search.css";

type SearchProps = {
  showSearch(): void;
};

const Search: React.FC<SearchProps> = ({ showSearch }) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        showSearch();
        setOverlayVisible(false);
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
    setOverlayVisible(true);
  }, []);

  return (
    <>
      {isOverlayVisible && <div className="overlay" />}
      <div className="search" ref={searchRef}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search"
            name="search"
            id="search"
            ref={inputRef}
          />
          <button
            onClick={() => {
              showSearch();
              setOverlayVisible(false);
            }}
            className="close-search"
          >
            x
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
