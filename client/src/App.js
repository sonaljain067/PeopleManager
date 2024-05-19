import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './components/Home.js';
import Person from './components/Person.js';
import CreatePerson from './components/CreatePerson.js';
import UpdatePerson from './components/UpdatePerson.js';
import DeletePerson from './components/DeletePerson.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div className="App">
      <Router>
        <Link to="/create">Create Person</Link>
        <Link to="/">Home</Link>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/create" element = {<CreatePerson />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/person/:id/update" element={<UpdatePerson />} />
          <Route path="/person/:id/delete" element={<DeletePerson />} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
