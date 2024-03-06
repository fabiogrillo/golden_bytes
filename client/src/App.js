import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './Pages/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Pages/Footer';
import { Button } from 'react-bootstrap';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={
            <LandingPage />
          }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
