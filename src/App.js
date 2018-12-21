import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

const Students = lazy(() => import('./routes/Students'));
const StudyPrograms = lazy(() => import('./routes/StudyPrograms'));

class App extends React.Component {  
  render() {
    return (
      <Router>
        <>
          <div className="nav">
            <ul>
              <li><Link to="/">Students</Link></li>
              <li><Link to="/study-programs">Study Programs</Link></li>
            </ul>
          </div>
          <React.Suspense fallback="Loading...">
            <Switch>
              <Route exact path="/" component={Students} />
              <Route path="/study-programs" component={StudyPrograms} />
            </Switch>
          </React.Suspense>
        </>
      </Router>
    );
  }
}

export default App;