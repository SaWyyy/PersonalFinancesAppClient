import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
//import Index from "./components/Index";
import Main from "./components/Main";
import AuthGuard from "./components/AuthGuard";
import AddItem from "./components/AddItem";
import UpdateItem from "./components/UpdateItem"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard onAuth={<Navigate to="/main" />} onNotAuth={<Navigate to="/register" />} />
        }
      />
      <Route
        path="/register"
        element={
          <AuthGuard
            onAuth={<Navigate to="/main" />}
            onNotAuth={<Register />}
          />
        }
      />
      <Route
        path="/login"
        element={
          <AuthGuard onAuth={<Navigate to="/main" />} onNotAuth={<Login />} />
        }
      />
       <Route
        path="/main"
        element={
          <AuthGuard onAuth={<Main />} onNotAuth={<Navigate to="/login" />} />
        }
      />
       <Route
        path="/add"
        element={
          <AuthGuard onAuth={<AddItem />} onNotAuth={<Navigate to="/login" />} />
        }
      />
      <Route
        path="/update"
        element={
          <AuthGuard onAuth={<UpdateItem />} onNotAuth={<Navigate to="/login" />} />
        }
      />
    </Routes>
  );
}

export default App;
