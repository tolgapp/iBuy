import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type SearchProps = {
  showSearch: () => void;
  handleSearchChange: (query: string) => void;
  searchQuery: string;
};

const Search: React.FC<SearchProps> = ({
  showSearch,
  handleSearchChange,
  searchQuery,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const navigate = useNavigate();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        showSearch();
        setOverlayVisible(false);
      }
    },
    [showSearch]
  );

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
    if (event.key === "Enter") {
      if (searchQuery.trim() !== "") {
        showSearch();
        navigate(`/search?query=${searchQuery}`);
      }
    }
  };

  return (
    <>
      {isOverlayVisible && <div className="fixed inset-0 bg-black/65 z-[99]" />}
      <div
        ref={searchRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] h-[2.7rem] w-[70rem] flex flex-col items-center justify-center
         "
      >
        <div className="relative w-full flex items-center justify-center md:w-[95%] sm:w-[95%]">
          <input
            type="text"
            placeholder="Search - e.g. Apple"
            name="search"
            id="search"
            ref={inputRef}
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full font-[Verdana] text-[1.4rem] text-black bg-white rounded-[0.2rem] px-[0.4rem] py-[0.6rem] leading-[0.1rem] border border-gray-600 outline-none placeholder:text-[1.2rem]"
          />
          <button
            onClick={() => {
              showSearch();
              setOverlayVisible(false);
            }}
            className="absolute right-0 h-[2.95rem] w-[3rem] bg-black text-white text-[1.6rem] cursor-pointer rounded-tr-[0.15rem] rounded-br-[0.15rem] border-none "
          >
            x
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
