import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './Pages/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={
            <LandingPage />
          }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
