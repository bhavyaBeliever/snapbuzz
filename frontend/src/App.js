import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SideNav from "./pages/SideNav";
import Home from "./pages/Home";


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={user ? (<><SideNav /> <Home /></>) : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            exact
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            exact
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
