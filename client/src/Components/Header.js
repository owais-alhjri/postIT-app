import {
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';
import logo from '../Images/logo.png';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handelLogout = async () =>{
  dispatch(logout());
  await new Promise((resolve) => setTimeout(resolve,100));
  navigate('/');
}
const email = useSelector((state)=> state.users.user.email);
  return (
    <Navbar className='header'>
    <Nav>
      
      <NavItem>
        <Link to="/home">
            <img src={logo} alt='logo' />
        </Link>
      </NavItem>

      <NavItem>
        <Link to="/home">
          Home
        </Link>
      </NavItem>

      <NavItem>
        <Link to='/profile'>
          Profile
        </Link>
      </NavItem>
      {!email ?<NavItem>
        <Link to='/' >
        Login
        </Link>
      </NavItem> : null}
      { email ?
      <NavItem>
        <Link to='/logout' onClick={handelLogout}>
        Logout
        </Link>
      </NavItem> : null}
    </Nav>
  </Navbar>

  );
};

export default Header;
