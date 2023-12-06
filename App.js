import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddData from "./AddData";
import ListData from "./ListData";
import NavigationPage from "./NavigationPage";
import GuestAddData from "./Guest";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<NavigationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Guest" element={<GuestAddData />} />
          <Route element={<PrivateRoutes />}>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/AddData" element={<AddData />} />
            <Route path="/ListData" element={<ListData />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
