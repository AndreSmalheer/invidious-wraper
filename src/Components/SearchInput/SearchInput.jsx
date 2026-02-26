import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StyleSearchInput.css"

export default function SearchInput({ classname, searchText: initialSearchText = "" }) {
  const [searchText, setSearchText] = useState(initialSearchText);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleEnter = () => {
      navigate(`/Search?query=${encodeURIComponent(searchText)}`);
  };

  return (
      <input
        type="text"
        placeholder="Search videos..."
        className={classname}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleEnter();
        }}
      />
);
}
