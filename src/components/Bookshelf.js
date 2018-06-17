import React from 'react';

const Bookshelf = props => {
  const { bookshelf } = props;
  return (
    <React.Fragment>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{props.children}</ol>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Bookshelf;
