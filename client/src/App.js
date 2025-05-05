import { Container, Row } from "reactstrap";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from './Components/Profile.js';
import Footer from './Components/Footer.js';
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import UpdateUser from "./Components/UpdateUser.js"; // Import the UpdateUser component
import { useSelector } from "react-redux";
const App = () => {
  const email = useSelector((state)=> state.users.user.email);
  console.log(email);
  return (
    <Router>
    <Container fluid>
      <Row>
        {email ? <Header /> : null}
      </Row>
      <Row className="main">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update/:user_email/:user_name/:user_password" element={<UpdateUser />} /> {/* Use UpdateUser component */}
        </Routes>
      </Row>
      {email ? <Footer /> : null}
    </Container>
  </Router>
  );
};

export default App;