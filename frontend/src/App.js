import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SideNav from "./pages/SideNav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";


import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Create from "./pages/Create";
function App() {
  const { user } = useAuthContext();
  const { username } = useParams();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/:username" 
        element={<><SideNav /><Profile /></>} />
          <Route
            path="/create"
            exact
            element={user ? <Create /> : <Navigate to="/login" />}
          />
          <Route
            path={"/"}
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
