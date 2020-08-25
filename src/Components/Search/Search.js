import React, { useState } from "react";
import "./Search.css";

const Search = (props) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  //Handles errors. Mainly prevents a user from inputting an empty string.
  //Unrenders any error message by removing it from state
  const handleChange = (e) => {
    if (error !== "") setError("");
    setSearch(e.target.value);
  };

  //Main fetch call. Grabs books data and sends it back to Main, where it gets passed to Results and
  //Processed through the children components
  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `https://books10.herokuapp.com/api/books/${search}`;
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setError(res.error);
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        props.handleResults(res, search);
        setSearch("");
      })
      .catch((error) => {
        //Displays any further errors
        console.log(error);
        setError(error);
      });
  };

  //sets error when user tries to input a blank item
  const handleEmptySubmit = (e) => {
    e.preventDefault();
    setError("Please Enter A Search Query");
  };

  return (
    <div className="search">
      <form className="search_form">
        <input
          className="search_input"
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Enter Search Terms..."
          value={search}
          aria-label="book search bar"
        />
        {/* conditional rendering of the submit button to prevent empty
        searches. */}
        <div className="search_button_bar">
          {search.length === 0 ? (
            <button
              className="search_button"
              type="submit"
              onClick={(e) => handleEmptySubmit(e)}
            >
              Submit
            </button>
          ) : (
            <button
              className="search_button"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          )}
          <button
            className="search_button"
            onClick={(e) => props.handleReset(e)}
          >
            Clear Results
          </button>
        </div>
      </form>
      <div className="search_error">{error ? <h4>{error}</h4> : <></>}</div>
    </div>
  );
};

export default Search;
