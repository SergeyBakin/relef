import React, { Component } from 'react';
import './App.css';
import NewsList from './components/NewsList';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <NewsList />
      </div>
    );
  }
}

export default App;
