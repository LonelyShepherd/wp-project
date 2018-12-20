import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import StudyPrograms from './pages/StudyPrograms';
import './App.css';

class App extends React.Component {  
  render() {
    return (
      <Router>
        <>
          <div className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/study-programs">Study Programs</Link></li>
            </ul>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/study-programs" component={StudyPrograms} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;