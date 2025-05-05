
import { Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getPosts } from "../Features/PostSlice";
import moment from "moment";
import { likePost } from "../Features/PostSlice";
import { FaThumbsUp } from "react-icons/fa6";
const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.users.user.email);
  const posts = useSelector((state) => state.posts.posts);
  const userId = useSelector((state) => state.users.user._id);

  const handleLikePost = (postId) => {
    const postData = {
      postId: postId,
      userId: userId,
    };
    dispatch(likePost(postData));
    navigate("/home");
  };

  useEffect(() => {
    console.log(getPosts())
    dispatch(getPosts());
  }, [])
  return (
    <div className="postsContainer">
      <Table className="table table-striped">
        <thead></thead>
        <tbody>
          {Array.isArray(posts) && posts.map((post) => (
            <tr key={post._id}>
              {/* Ensure to add a unique key for each row */}
              <td>{post.email}</td>
              <td>
                <p> {moment(post.createdAt).fromNow()}</p>
                {post.postMsg}
                <p className="likes">
                  <a href="#" onClick={() => handleLikePost(post._id)}>
                    <FaThumbsUp />
                  </a>
                  ({post.likes.count})
                </p>

              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div> /* End of posts */
  );
};


export default Posts;
