import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import User from "./User";
import { updateUserProfile } from "../Features/UserSlice";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";


const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.users.user.email);
  const user = useSelector((state) => state.users.user);


  const [userName, setUserName] = useState(user.name);
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("name", userName);
    formData.append("password", pwd);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }
  
    dispatch(updateUserProfile(formData));
    alert("Profile Updated.");
    navigate("/profile");
  };

  return (
    <Container fluid>
      <Row>
        <h1>Profile</h1>
        <Col>
          <Col md={2}>
            <User />
          </Col>
          <Col md={4}>Update Profile</Col>
        

        <Form onSubmit={handleUpdate}>
    <input
      type="file"
      name="profilePic"
      onChange={(e) => setProfilePic(e.target.files[0])}
    />
    <FormGroup>
      <Label for="name">Name</Label>
      <Input
        id="name"
        name="name"
        placeholder="Name..."
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </FormGroup>

    <FormGroup>
      <Label for="password">Password</Label>
      <Input
        id="password"
        name="password"
        placeholder="Password..."
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
    </FormGroup>
    <FormGroup>
      <Label for="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password..."
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </FormGroup>
    <Button color="primary" type="submit">
      Update Profile
    </Button>
  </Form>
  </Col>
      </Row>
      
    </Container>
  );
};

export default Profile;
