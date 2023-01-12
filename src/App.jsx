import './App.scss';
import {
  Route,
  Routes
} from "react-router-dom";
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<SignUp />} exact />
        </Routes>
      </div>
  );
}

export default App;
