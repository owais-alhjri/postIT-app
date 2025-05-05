import {
  Button,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchemaValidation } from "../Validation/UserValidations.js";
import { useState } from "react";
import { addUser, deleteUser, registerUser } from "../Features/UserSlice.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.users.user);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchemaValidation),
  });

  const onSubmit = (data) => {
    handleSubmit(data);
  };

  const handleSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    dispatch(registerUser(userData));
    //navigate("/");
  };

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

  return (
    <Container fluid className="register-container">
      <Row className="justify-content-center mt-5">
        <Col lg="6" className="p-4 shadow rounded bg-light">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={submitForm(onSubmit)}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name..."
                {...register("name", {
                  onChange: (e) => setname(e.target.value),
                })}
              />
              <p className="text-danger small">{errors.name?.message}</p>
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email..."
                {...register("email", {
                  onChange: (e) => setemail(e.target.value),
                })}
              />
              <p className="text-danger small">{errors.email?.message}</p>
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password..."
                {...register("password", {
                  onChange: (e) => setpassword(e.target.value),
                })}
              />
              <p className="text-danger small">{errors.password?.message}</p>
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password..."
                {...register("confirmPassword", {
                  onChange: (e) => setconfirmPassword(e.target.value),
                })}
              />
              <p className="text-danger small">{errors.confirmPassword?.message}</p>
            </div>
            <Button color="primary" block>
              Register
            </Button>
          </form>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/" className="text-primary">
              Login
            </Link>
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3 className="text-center registered-users-title ">Registered Users</h3>
          <Table bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userList) &&
                userList.map((user) => (
                  <tr key={user.email}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <Button
                        color="danger"
                        size="sm"
                        className="me-2"
                        onClick={() => handleDelete(user.email)}
                      >
                        Delete
                      </Button>
                      <Link
                        to={`/update/${user.email}/${user.name}/${user.password}`}
                      >
                        <Button color="warning" size="sm">
                          Update
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;