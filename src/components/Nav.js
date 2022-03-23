import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/">Posts</NavLink>
      <NavLink to="/sign-in">Sign-in</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}
