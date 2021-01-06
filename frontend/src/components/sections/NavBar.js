import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';

const NavBar = ({ setAuthenticated }) => {
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <ul>
        {user &&
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
          </NavLink>
          </li>
        }
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;