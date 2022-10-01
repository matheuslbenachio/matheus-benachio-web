import { useCallback, useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "../../Icons/search.svg";
import "./Search.scss";

/**
 * Props for the search component.
 */
interface SearchProps {
  onSubmit: (value: string) => void;
}

/**
 * Component with an input and a button to perform a query.
 */
function Search(props: SearchProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const { onSubmit } = props;

  /**
   * Validates if the input has something written in it and then calls the onSubmit prop.
   * If the input is empty, the input will be refocused.
   */
  const search = useCallback(() => {
    if (value.trim()) {
      onSubmit(value.trim());
    } else {
      ref.current?.focus();
    }
  }, [onSubmit, value]);

  const possiblyMobile = window.innerWidth <= 768;

  return (
    <div className="search">
      <SearchIcon data-testid="search-icon" />

      <input
        autoComplete="username"
        autoFocus={!possiblyMobile}
        data-testid="search-input"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search github users"
        ref={ref}
        value={value}
      />

      <button data-testid="search-submit" onClick={search}>
        Submit
      </button>
    </div>
  );
}

export default Search;
