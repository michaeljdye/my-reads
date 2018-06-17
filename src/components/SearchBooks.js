import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import React, { Component } from 'react';

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  };

  updateQuery = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;

    if (query) {
      BooksAPI.search(query).then(books => this.setState({ books }));
    } else {
      BooksAPI.getAll().then(books => this.setState({ books }));
    }

    return (
      <React.Fragment>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                onChange={e => this.updateQuery(e.target.value)}
                type="text"
                value={this.state.query}
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.books.map((book, index) => (
                <Book
                  key={index}
                  book={book}
                  updateBook={this.props.updateBook}
                />
              ))}
            </ol>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBooks;
