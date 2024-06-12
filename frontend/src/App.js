import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            !user && <Route path="/login" element={
              <Login />
            } />
          }
          {!user &&
            <Route path="/signup" element={
              <SignUp />
            }
            /> 
          }

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
