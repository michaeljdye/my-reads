import PropTypes from 'prop-types';
import React from 'react';

const Bookshelf = props => {
  this.propTypes = {
    bookshelf: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  };

  const { bookshelf, children } = props;
  return (
    <React.Fragment>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{children}</ol>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Bookshelf;
