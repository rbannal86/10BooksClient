import React, { useState } from "react";
import AdditionalInformation from "../AdditionalInformation/AdditionalInformation";
import "./Book.css";

const Book = props => {
  const [openInformation, setOpenInformation] = useState(false);

  const moreInformation = e => {
    e.preventDefault();
    setOpenInformation(!openInformation);
  };

  const renderAuthors = authors => {
    return authors.map((author, index) => {
      return <li key={index}>{author}</li>;
    });
  };

  //work around for empty results: the book will receive a 'title' with 'No Results Found'
  //and display only that
  if (props.book.title === "No Results Found")
    return <h4>{props.book.title}</h4>;
  //more conditional rendering, taking into consideration more incomplete records or books
  //without subtitles
  else
    return (
      <div>
        <div className="book_information">
          {props.book.coverImage ? (
            <img
              alt={`Cover of ${props.book.title}`}
              src={props.book.coverImage}
              className="book_image"
            />
          ) : (
            <div className="book_no_image"></div>
          )}
          <div className="book_text_information">
            <h5 className="book_title">{props.book.title}</h5>
            {props.book.subtitle ? (
              <h6 className="book_subtitle">{props.book.subtitle}</h6>
            ) : null}
            {props.book.authors ? (
              <ul className="book_authors">
                {renderAuthors(props.book.authors)}
              </ul>
            ) : (
              <></>
            )}
            {/*Button container. All books returned from GoogleBooks should have a Link*/}
            <div className="book_buttons">
              <div className="book_buttons_container">
                <button className="book_preview_link_button">
                  <a
                    className="book_preview_link"
                    href={props.book.previewLink}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    Preview
                  </a>
                </button>
                <button
                  className="additional_information_button"
                  onClick={e => moreInformation(e)}
                >
                  {openInformation ? "Close" : "Additional Information"}
                </button>
              </div>

              <AdditionalInformation book={props.book} open={openInformation} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Book;
