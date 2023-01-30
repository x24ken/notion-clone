import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./components/page/Login";
import Register from "./components/page/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
