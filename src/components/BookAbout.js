import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';

class BookAbout extends Component {
  state = {
    books: [],
    book: {}
  };

  static propTypes = {
    books: PropTypes.object.isRequired
  };

  /**
   * @description Retrieves book from local storage (if available),
   * and sets book state to book matching id found in URL query string.
   */
  componentDidMount() {
    const storedBooks = localStorage.getItem('books');
    let books = [];

    if (!storedBooks) {
      localStorage.setItem('books', JSON.stringify(this.props.books));
      books = this.props.books;
    } else {
      books = JSON.parse(storedBooks);
    }

    const query = queryString.parse(window.location.search);
    const id = query.id;
    const bookArray = books.filter(book => book.id === id);
    const book = bookArray[0];
    this.setState({ book });
  }

  render() {
    const { book } = this.state;
    const bookImage = book.imageLinks ? (
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${book.imageLinks.thumbnail}")`
        }}
      />
    ) : null;

    return (
      <React.Fragment>
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="book-about-container">
          {bookImage}
          <div className="book-about-content">
            <h1 className="book-about-title">{book.title}</h1>
            <h2 className="book-about-subtitle">{book.subtitle}</h2>
            <p>
              <em>{book.publisher}</em>
            </p>
            <p>{book.pageCount ? `Page count: ${book.pageCount}` : null}</p>
            <p>{book.ratingsCount ? `Rating: ${book.ratingsCount}` : null}</p>
            <p className="book-about-description">
              {book.description ? book.description : null}
            </p>
            <button
              className="btn-primary btn-primary-large"
              onClick={() => window.open(book.previewLink)}
            >
              Preview
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BookAbout;
