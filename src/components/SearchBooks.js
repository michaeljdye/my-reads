import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  };

  static propTypes = {
    shelvedBooks: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  };

  /**
   * Credit to Sai Gowtham for code example
   *  @link https://codeburst.io/comparison-of-two-arrays-using-javascript-3251d03877fe
   */

  compareArrays(arr1, arr2) {
    arr1.forEach(e1 =>
      arr2.forEach(e2 => {
        if (e1.id === e2.id) {
          e1.shelf = e2.shelf;
        }
      })
    );

    return arr1;
  }

  searchBooks = query => {
    this.setState({ query });

    if (query) {
      BooksAPI.search(query)
        .then(books => {
          books = this.compareArrays(books, this.props.shelvedBooks);
          this.setState({ books });
        })
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
