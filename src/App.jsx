import './App.scss';
import {
  Route,
  Routes
} from "react-router-dom";
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import Home from './pages/HomePage/Home';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  const { checkAuthUser, isUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser, isUserLoggedIn]);

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route element={<ProtectedRoutes />}>
            <Route
                isUserLoggedIn={isUserLoggedIn}
                exact
                path="/home"
                element={<Home />}
              />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route 
                isUserLoggedIn={isUserLoggedIn}
                exact
                path="/room/:chatId"
                element={<Home />}
            />
          </Route>
        </Routes>
      </div>
  );
}

export default App;
