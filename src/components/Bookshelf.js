import React from 'react';

const Bookshelf = props => {
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{props.children}</ol>
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
