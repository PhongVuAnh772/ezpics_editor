import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import Login from "./components/auth/login/Login";
import Dashboard from "./components/home/Dashboard/Dashboard";
import ForYouPage from "./components/home/ForYou/ForYouPage";
import SignUp from "./components/auth/signup/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route exact path="/" element={<Dashboard />}>
              <Route exact path="/" element={<ForYouPage />} />
              
            
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
