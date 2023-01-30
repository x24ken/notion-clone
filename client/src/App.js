import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./components/page/Login";
import Register from "./components/page/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { blue } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
