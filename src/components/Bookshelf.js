import PropTypes from 'prop-types';
import React from 'react';

const Bookshelf = props => {
  this.propTypes = {
    bookshelf: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  };

  const { bookshelf, children, moveMultiple, bulkMove } = props;
  return (
    <React.Fragment>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{children}</ol>
        </div>
        <button onClick={moveMultiple}>Bulk Move</button>
        { bulkMove &&
          <select onChange={e => props.updateAllShelves(e.target.value)} defaultValue="none">
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        }

      </div>
    </React.Fragment>
  );
};

export default Bookshelf;
