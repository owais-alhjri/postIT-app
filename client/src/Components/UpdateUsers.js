import { useParams } from "react-router-dom";
import { updateUser } from "../Features/UserSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchemaValidation } from "../Validation/UserValidations";
import { useForm } from "react-hook-form";

const UpdateUsers = () => {
  const dispatch = useDispatch();

  const { user_email, user_name, user_password } = useParams();

  const [name, setname] = useState(user_name);
  const [email, setemail] = useState(user_email);
  const [password, setpassword] = useState(user_password);
  const [confirmPassword, setconfirmPassword] = useState(user_password);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchemaValidation),
  });

  const handleUpdate = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    dispatch(updateUser(userData));
  };

  return (
    <Container fluid>
      <Row className="formrow">
        <Col className="columndiv1" lg="6">
          <form className="div-form" onSubmit={handleSubmit(handleUpdate)}>
            <div className="appTitle"></div>
            <section className="form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  placeholder="Enter your name..."
                  {...register("name", {
                    onChange: (e) => setname(e.target.value),
                  })}
                />
                <p className="error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  placeholder="Enter your email..."
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
                <p className="error">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  placeholder="Enter your password..."
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
                <p className="error">{errors.password?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm your password..."
                  {...register("confirmPassword", {
                    onChange: (e) => setconfirmPassword(e.target.value),
                  })}
                />
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>
              <Button color="primary" className="button">
                Update
              </Button>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
    </Container>
  );
};

export default UpdateUsers;