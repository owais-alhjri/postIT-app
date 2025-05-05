import { 
  Form,
  Input,
  Label, 
  Container, Button,
  Col, Row 
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (isSuccess) {
      navigate("/home");
      console.log("home");
    } else {
      navigate("/");
    }
  }, [user, isError, isSuccess, navigate]);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center mt-5">
        <Col lg="6" className="p-4 shadow rounded bg-light">
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <div className="form-group mb-3">
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter email..."
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter password..."
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button color="primary" block onClick={handleLogin}>
              Login
            </Button>
          </Form>
          <p className="text-center mt-3">
            No Account?{" "}
            <Link to="/register" className="text-primary">
              Sign Up now.
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
