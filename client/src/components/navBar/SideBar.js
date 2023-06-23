// components/nav/Sidebar.js
// even though it's called sidebar, it will sit on top, just below main nav
// feel free to put it on side
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/propertyManagment">
          Property Managment
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile">
          Profile Managment
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/wishlist/list">
          wishList
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/agents/list">
          Agents
        </NavLink>
      </li>
    </ul>
  );
}