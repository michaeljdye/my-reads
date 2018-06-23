import './App.css';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './components/Book';
import Bookshelf from './components/Bookshelf';
import React from 'react';
import SearchBooks from './components/SearchBooks';
import BookAbout from './components/BookAbout';

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
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  updateBook = (shelf, book) => {
    const currentBook = book;
    currentBook.shelf = shelf;
    BooksAPI.update(currentBook, shelf);
    this.setState(state => ({
      books: state.books
        .filter(book => book.title !== currentBook.title)
        .concat([currentBook])
    }));
  };

  render() {
    return (
      <div className="app">
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
                    <Bookshelf key={index} bookshelf={bookshelf.title}>
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
                              shelvedBooks={this.state.books}
                              updateBook={this.updateBook}
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
      </div>
    );
  }
}

export default BooksApp;
