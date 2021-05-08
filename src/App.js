import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Playground from './components/Playground';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/play' component={Playground} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
