import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import React, { Component } from 'react';

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  };

  searchBooks = query => {
    this.setState({ query });

    if (query) {
      BooksAPI.search(query)
        .then(books => this.setState({ books }))
        .catch(err => console.log('error', err));
    }
  };

  render() {
    const { query, books } = this.state;
    const searchContent = this.state.books.map((book, index) => (
      <Book key={index} book={book} updateBook={this.props.updateBook} />
    ));

    console.log(books);

    return (
      <React.Fragment>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                onChange={e => this.searchBooks(e.target.value)}
                type="text"
                value={query}
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {query && !books.error && searchContent}
            </ol>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBooks;
