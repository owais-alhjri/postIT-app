import { Col, Container, Row,Input,FormGroup, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts, savePost } from "../Features/PostSlice";

const SharePosts = () => {
  const [postMsg, setpostMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.users.user.email);

  const handlePost = async () => {
    if (!postMsg.trim()) {
      alert("Post message is required."); 
      return; 
    }

    const postData = {
      postMsg: postMsg,
      email: email,
    };
    dispatch(savePost(postData)); 
    setpostMsg(""); 

  };


  return (
    <div>
      <Container>
        <Row>
          <Col>
          <FormGroup>
    <Input
      id="exampleText"
      name="text"
      type="textarea"
      placeholder="Share your thoughts..."
      value={postMsg}
      onChange={(e)=>setpostMsg(e.target.value)}
    />
  </FormGroup>
          </Col>
        </Row>
        <Button onClick={()=>handlePost()}> PostIT</Button> 
             </Container>
    </div>
  );
};

export default SharePosts;
