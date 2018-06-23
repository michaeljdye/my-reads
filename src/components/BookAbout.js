import React, { Component } from 'react';
import queryString from 'query-string';

class BookAbout extends Component {
  state = {
    book: {}
  };

  componentDidMount() {
    const query = queryString.parse(window.location.search);
    const id = query.id;
    const bookArray = this.props.books.filter(book => book.id === id);
    const book = bookArray[0];
    this.setState({ book });
    console.log(book);
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
        {bookImage}
        <p>{book.ratingsCount ? `Rating: ${book.ratingsCount}` : null}</p>
        <p>{book.pageCount ? `Page count: ${book.pageCount}` : null}</p>
        <h1>{book.title}</h1>
        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p>{book.publisher}</p>
        <p>{book.description ? `Rating: ${book.description}` : null}</p>
        <button
          className="btn-primary"
          onClick={() => window.open(book.previewLink)}
        >
          Preview
        </button>
      </React.Fragment>
    );
  }
}

export default BookAbout;
