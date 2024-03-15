
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { useDataProvider } from "../components/dataProvider";

export function SearchBar() {
  const { updateSelectedFilter, searchedItem, updateSearch } = useDataProvider();
//sconst [setShowSearch] = useState(false); // Initialize showSearch state variable

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("query", searchedItem);
    if (searchedItem !== "") {
      updateSelectedFilter("Search");
      navigate("/menu");
}};

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  return (
    <div style={{ borderRadius: "25px" }} display="grid">
      <form data-test="Search-Form"className="search-bar" onSubmit={handleSubmit}>
        <label htmlFor="searchInput" className="sr-only"></label>
        <input
          data-test="Search-Input"
          title="SearchInput"
          type="text"
          id="searchInput"
          value={searchedItem}
          onChange={handleChange}
          placeholder="Search..."
          aria-label="Search"
        />
        <Button
          data-test="Search-Input-Button"
          type="submit"
          bg="none"
          _hover={{ bg: "none" }}
          _active={{ transform: "translateY(2px)" }}
          title="Search"
        >
          <FaSearch data-test="Search-Input-Icon" className="search-icon" />

        </Button>
      </form>
 
    </div>
  );
}
