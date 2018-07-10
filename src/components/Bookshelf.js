import React from 'react';
import PropTypes from 'prop-types';

const Bookshelf = ({
  bookshelf,
  children,
  moveMultiple,
  bulkMove,
  updateAllShelves
}) => {
  this.propTypes = {
    bookshelf: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    moveMultiple: PropTypes.func.isRequired,
    bulkMove: PropTypes.boolean,
    updateAllShelves: PropTypes.func.isRequired
  };

  return (
    <React.Fragment>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelf}</h2>
        <button className="btn-secondary" onClick={moveMultiple}>
          Bulk Move
        </button>
        {bulkMove && (
          <select
            className="bookshelf-bulk-select"
            onChange={e => updateAllShelves(e.target.value)}
            defaultValue="none"
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        )}
        <div className="bookshelf-books">
          <ol className="books-grid">{children}</ol>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Bookshelf;
