import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './Pages/NavBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './Pages/Footer';
import LandingPage from './Pages/LandingPage';
import ArticlesPage from './Pages/ArticlesPage';
import LoginComponent from './Pages/LoginComponent';
import UserLanding from './Pages/UserLanding';
import { useState, useEffect } from 'react';
import api from './api';
import WritePage from './Pages/WritePage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // User info if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await api.getUserInfo();
        setUser(user);
        setLoggedIn(true);
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const doLogIn = async (credentials) => {
    try {
      const user = await api.logIn(credentials);
      setUser(user);
      setLoggedIn(true);
      return true;
    } catch (err) {
      return console.log(err);
    }
  };

  const doLogOut = () => {
    api.logOut()
      .then(() => setLoggedIn(false))
      .then(setUser({}))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Router>

        <NavBar
          loggedIn={loggedIn}
          logout={doLogOut}
          user={user}
        />

        <Routes>
          <Route exact path='/' element={
            loggedIn ?
              <UserLanding
                user={user} /> :
              <LandingPage />
          }
          />

          <Route path='/articles' element={
            <ArticlesPage />
          }
          />

          <Route path='/login' element={
            loggedIn ?
              <Navigate to='/' replace /> :
              <LoginComponent
                login={doLogIn}
                loading={loading}
              />
          }
          />

          <Route path='/write-article' element={
            <WritePage
              user={user}
              loggedIn={loggedIn} />
          } />

        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
