import { useRef, useEffect, useState, useCallback } from "react";
import "../style/Search.css";
import { useNavigate } from "react-router-dom"; 

type SearchProps = {
  showSearch: () => void;
  handleSearchChange: (query: string) => void;
  searchQuery: string;
};

const Search: React.FC<SearchProps> = ({ showSearch, handleSearchChange, searchQuery }) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const navigate = useNavigate(); 
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      showSearch();
      setOverlayVisible(false);
    }
  }, [showSearch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setOverlayVisible(true);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchQuery.trim() !== "") {
        showSearch(); 
        navigate(`/search?query=${searchQuery}`);  
      } 
    }
  };

  return (
    <>
      {isOverlayVisible && <div className="overlay" />}
      <div className="search" ref={searchRef}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search - e.g. Apple"
            name="search"
            id="search"
            ref={inputRef}
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}  
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