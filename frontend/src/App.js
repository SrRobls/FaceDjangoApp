import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Inicio from './components/Inicio';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/' exact component = {Login} ></Route>
        <Route path='/registro' exact component={Register}></Route>
        <Route path='/inicio' exact component={Inicio} ></Route>
      </div>
    </Router>
  );
}

export default App;
