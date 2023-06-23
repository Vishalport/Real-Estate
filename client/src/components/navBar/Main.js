import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { useNavigate } from "react-router-dom";

export default function Main() {

    const [auth, setAuth] = useAuth();
    const loggedIn = auth?.user !== null && auth?.token !== "";

    const navigate = useNavigate();

    const logout = () => {
        setAuth({ userResult: null, token: "", refreshToken: "" });
        localStorage.removeItem("auth");
        navigate("/Login");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-Dark">
                <NavLink className="navbar-brand" to="/">LOGO@Here</NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Register"> Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/search">Search</NavLink>
                        </li>

                        <div className="dropdown">
                            <li>
                                <NavLink className="nav-link pointer dropdown-toggle" data-bs-toggle="dropdown" >
                                    {/* {auth?.userResult.firstName ? auth?.userResult.firstName : "User"}  */}
                                    User
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className="nav-link" to={`/dashboard`}> Dashboard </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="nav-link" to={`/change-password`}>Change Password</NavLink>
                                    </li>
                                    <li> <NavLink onClick={logout} className="nav-link pointer">Logout </NavLink> </li>
                                </ul>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>

        </div>
    )

    // return (
    //     <div>
    //         <nav className="navbar navbar-expand-lg bg-Dark">
    //             <NavLink className="navbar-brand" to="/">Home</NavLink>
    //             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span className="navbar-toggler-icon" />
    //             </button>
    //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //                 <ul className="navbar-nav mr-auto">

    //                     {!loggedIn ? (
    //                         <>
    //                             <li className="nav-item">
    //                                 <NavLink className="nav-link" to="/Register"> Register</NavLink>
    //                             </li>
    //                             <li className="nav-item">
    //                                 <NavLink className="nav-link" to="/login">Login</NavLink>
    //                             </li>
    //                         </>
    //                     ) : ( "" )}
    //                     {loggedIn ? (

    //                         <div>
    //                             <div className="dropdown">
    //                                 <li>
    //                                     <a
    //                                         className="nav-link pointer dropdown-toggle"
    //                                         data-bs-toggle="dropdown"
    //                                     >
    //                                         {/* {auth?.user?.name ? auth.user.name : auth.user.mobileNumber} */}
    //                                         User
    //                                     </a>
    //                                     <ul className="dropdown-menu">
    //                                         <li>
    //                                             <NavLink className="nav-link" to={`/dashboard`}> Dashboard </NavLink>
    //                                         </li>
    //                                         <li> <NavLink onClick={logout} className="nav-link pointer">Logout </NavLink> </li>
    //                                     </ul>
    //                                 </li>
    //                             </div>

    //                         </div>
    //                     ) : ( "" )}
    //                 </ul>
    //             </div>
    //         </nav>

    //     </div>
    // )
}



// import { NavLink } from "react-router-dom";

// export default function Menu() {
//   return (
//     <ul className="nav d-flex justify-content-between p-2 lead">
//       <li>
//         <NavLink className="nav-link" to="/">
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink className="nav-link" to="/login">
//           Login
//         </NavLink>
//       </li>
//       <li>
//         <NavLink className="nav-link" to="/register">
//           Register
//         </NavLink>
//       </li>

//       <div className="dropdown">
//         <li>
//           <a
//             className="nav-link pointer dropdown-toggle"
//             data-bs-toggle="dropdown"
//           >
//             User
//           </a>
//           <ul className="dropdown-menu">
//             <li>
//               <NavLink className="nav-link" to={`/dashboard`}>
//                 Dashboard
//               </NavLink>
//             </li>
//             <li>
//               <a className="nav-link">Logout</a>
//             </li>
//           </ul>
//         </li>
//       </div>
//     </ul>
//   );
// }