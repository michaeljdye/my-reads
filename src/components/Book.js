import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
    bulkMove: PropTypes.boolean,
    updateChecked: PropTypes.func.isRequired
  };

  /**
   * @description Updates selected book's shelf property
   * @param { string } shelf - the new shelf the book should be located on
   * @param { object } book  - the book that needs to be updated
   */
  updateShelf = (shelf, book) => {
    this.props.updateBook(shelf, book);
    localStorage.removeItem('books');
  };

  render() {
    const { book, bulkMove, updateChecked } = this.props;

    const bookCover = book.imageLinks ? (
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${book.imageLinks.thumbnail}")`
        }}
      />
    ) : (
      ''
    );

    return (
      <React.Fragment>
        <li>
          <div>
            <div className="book">
              <div className="book-top">
                {bookCover}
                <div className="book-shelf-changer">
                  <select
                    onChange={e => this.updateShelf(e.target.value, book)}
                    defaultValue={book.shelf || 'none'}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors || null}</div>
              {book.shelf &&
                book.shelf !== 'none' && (
                  <Link to={`/book?id=${book.id}`}>
                    <button className="btn-primary">View Book</button>
                  </Link>
                )}

              {bulkMove && (
                <input
                  type="checkbox"
                  name="move"
                  id="move"
                  onChange={() => updateChecked(book.id)}
                  className="book-checkbox"
                />
              )}
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
}

export default Book;
