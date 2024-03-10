import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './Pages/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Pages/Footer';
import LandingPage from './Pages/LandingPage';
import ArticlesPage from './Pages/ArticlesPage';

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
          <Route path='/articles' element={
            <ArticlesPage/>
          }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
