import React, { Component } from 'react';

class BookAbout extends Component {
  componentDidMount() {
    const params = new URLSearchParams(props.location.search);
    const id = params.get('id');
    console.log(id);
  }

  render() {
    return <div>Book About Works!</div>;
  }
}

export default BookAbout;
