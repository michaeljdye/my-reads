import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Book extends Component {
  state = {
    starClicks: [
      { firstStarClicked: false },
      { secondStarClicked: false },
      { thirdStarClicked: false },
      { fourthStarClicked: false }
    ]
  };

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  };

  updateShelf = (shelf, book) => {
    this.props.updateBook(shelf, book);
    localStorage.removeItem('books');
  };

  render() {
    const { book } = this.props;
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
              {book.shelf && (
                <Link to={`/book?id=${book.id}`}>
                  <button className="btn-primary">View Book</button>
                </Link>
              )}
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
}

export default Book;
