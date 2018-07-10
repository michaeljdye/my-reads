import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './components/Book';
import BookAbout from './components/BookAbout';
import Bookshelf from './components/Bookshelf';
import SearchBooks from './components/SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    bookshelves: [
      {
        title: 'Currently Reading'
      },
      {
        title: 'Want to Read'
      },
      {
        title: 'Read'
      }
    ],
    books: [],
    bulkMove: false,
    checkedBooks: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  /**
   * @description Updates selected book's shelf property
   * @param { string } shelf - the new shelf the book should be located on
   * @param { object } book - the book that needs to be updated
   */
  updateBook = (shelf, book) => {
    const currentBook = book;
    currentBook.shelf = shelf;
    BooksAPI.update(currentBook, shelf);
    this.setState(state => ({
      books: state.books
        .filter(book => book.title !== currentBook.title)
        .concat([currentBook])
    }));
    localStorage.removeItem('books');
  };

  /**
   * @description Toggles state of bulkMove
   */
  moveMultiple = () => {
    this.setState(state => ({
      bulkMove: !state.bulkMove
    }));
  };

  /**
   * @description Adds checked books to checkedBooks array
   * @param { string } id - the id of the book that was checked
   */
  updateChecked = id => {
    const book = this.state.books.filter(book => book.id === id);
    book[0].checked = true;
    const checkedBooks = [...book, ...this.state.checkedBooks];
    this.setState({ checkedBooks });
  };

  /**
   * @description Updates all selected book's shelf property with new shelf value
   * @param { string } value - the name of the new shelf the books belong on
   */
  updateAllShelves = value => {
    this.state.checkedBooks.map(book => this.updateBook(value, book));
    this.setState({ checkedBooks: [], bulkMove: false });
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/book"
            render={() => <BookAbout books={this.state.books} />}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <SearchBooks
                shelvedBooks={this.state.books}
                updateBook={this.updateBook}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {this.state.bookshelves.map((bookshelf, index) => (
                      <Bookshelf
                        key={index}
                        bookshelf={bookshelf.title}
                        moveMultiple={this.moveMultiple}
                        bulkMove={this.state.bulkMove}
                        updateAllShelves={this.updateAllShelves}
                      >
                        {this.state.books.map((book, index) => {
                          if (
                            book.shelf.toLowerCase() ===
                            bookshelf.title
                              .split(' ')
                              .join('')
                              .toLowerCase()
                          ) {
                            return (
                              <Book
                                key={index}
                                book={book}
                                updateBook={this.updateBook}
                                updateChecked={this.updateChecked}
                                bulkMove={this.state.bulkMove}
                              />
                            );
                          }
                          return null;
                        })}
                      </Bookshelf>
                    ))}
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
