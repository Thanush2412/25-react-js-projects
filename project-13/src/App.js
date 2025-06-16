import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route exact path="/posts" component={Posts} />
              <Route path="/posts/:id" component={PostDetail} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
