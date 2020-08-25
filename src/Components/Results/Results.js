import React, { useEffect, useState } from "react";
import Book from "../Book/Book";

import "./Results.css";

const Results = props => {
  const [results, setResults] = useState([]);
  let [clicked, setClick] = useState(false);

  //Forces rerender to handle props change for expanding searches
  if (clicked) setClick(false);

  //creates new array for rendering which searches are open and
  //passes it back to the parent component
  const handleCloseSearch = search => {
    if (props.toggleOpen.includes(search)) {
      let newToggleOpen = props.toggleOpen.filter(item => item !== search);
      console.log("opening", newToggleOpen);
      setClick(true);
      return props.setToggleOpen(newToggleOpen);
    } else {
      let newToggleOpen = props.toggleOpen;
      newToggleOpen.push(search);
      console.log("closing", newToggleOpen);
      setClick(true);
      return props.setToggleOpen(newToggleOpen);
    }
  };

  const renderResults = () => {
    let searchQuery = "";
    return results.map((book, index) => {
      //creates a unique li in order to identify separate search results
      if (typeof book === "string") {
        searchQuery = book;
        return (
          <li key={book} className="results_list_item search_title">
            <button
              className="results_list_toggle"
              onClick={() => handleCloseSearch(book)}
            >
              Results for Search: {book}
            </button>
          </li>
        );
      } else if (!props.toggleOpen.includes(searchQuery)) {
        if (book.title === "No Results Found") {
          return (
            <li
              key={book.title + searchQuery}
              className="results_list_item results_empty"
            >
              {book.title}
            </li>
          );
        } else
          return (
            <li key={`${book.title}${index}`} className="results_list_item">
              <Book book={book} />
            </li>
          );
      } else return null;
    });
  };

  //rerender when new results are added to the current results in Main, or
  //when the results are cleared
  useEffect(() => setResults(props.results), [props.results]);

  return (
    <div className="results">
      <ul className="results_list">{renderResults()}</ul>
    </div>
  );
};

export default Results;
