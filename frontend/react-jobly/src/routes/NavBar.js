import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navbar.css";


/** Navbar for site shows up on every page.
*
* show login and signup when not logged in and the rest when logged in
*
*/  

function Navbar({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.debug("NavBar", "currentUser=", currentUser);

    function loggedOutNav() {
        return (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </ul>
        );
    } 
    function loggedInNav() {
        return (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/companies">
                  Companies
                </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/jobs">
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  Log out {currentUser.first_name || currentUser.username}
                </Link>
              </li>
            </ul>
        );
    }
    
    return (
      <nav className="NavBar navbar navbar-expand-md">
        <Link className="navbar-brand" to="/">
          Jobly
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
    )
}

export default Navbar;