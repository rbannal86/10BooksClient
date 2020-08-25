import React from "react";
import "./AdditionalInformation.css";

const AdditionalInformation = props => {
  const renderCategories = () => {
    if (props.book.categories === null) return "N/A";
    else {
      let categoryString = props.book.categories.join(", ");
      return categoryString;
    }
  };

  //conditional rendering based upon the open prop. Triggered by the 'Additional Information' button
  if (props.open) {
    return (
      <div className="ai_top_level">
        <div className="ai_information">
          {/* conditional rendering for all categories, since many records are incomplete */}
          <div className="ai_categories">
            Categories: <span>{renderCategories()}</span>
          </div>
          <div className="ai_publisher">
            Publisher: <span>{props.book.publisher || "N/A"}</span>
          </div>
          <div className="ai_published">
            Published: <time>{props.book.publishedDate || "N/A"}</time>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default AdditionalInformation;
