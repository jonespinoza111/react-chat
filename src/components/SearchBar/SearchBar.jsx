import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.scss";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchError, setSearchError] = useState(null);
  const navigate = useNavigate();

  const searchUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://chat-server-wc7r.onrender.com/users/username/${inputValue.toLowerCase()}`
      );

      const body = await response.json();

      if (body.success) {
        setSearchError(null);
        navigate(`/user/${body.user._id}`);
      }

      if (!body.success) {
        let error = "User not found";
        throw error;
      }
    } catch (err) {
      setSearchError(err);
    }
  };

  return (
    <>
      <form className="search" onSubmit={searchUser}>
        <button
          type="submit"
          disabled={inputValue.length < 1}
          className="search-icon-container"
        >
          <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        </button>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className="search-bar"
          placeholder="Enter a username"
        />
      </form>
      <h3 className="search-error">{searchError}</h3>
    </>
  );
};

export default SearchBar;
