import React, { useState, useEffect } from "react";
import SideBar from "../components/navBar/SideBar";
import Toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

export default function Profile() {
  //contex <<-----------
  const [auth, setAuth] = useAuth();

  //state <-----------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    if (auth.userResult) {
      setFirstName(auth.userResult.firstName);
      setLastName(auth.userResult.lastName);
      setMobileNumber(auth.userResult.mobileNumber);
      setDateOfBirth(auth.userResult.dateOfBirth);
      setAddress(auth.userResult.address);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.put(
        "/editProfile",
        {
          firstName,
          lastName,
          mobileNumber,
          dateOfBirth,
          address,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if(data?.error) {
        Toast.error(data.error)
      }
      else{
        let temp = data.result
        setAuth({...auth, userResult : temp});
        let localData = JSON.parse(localStorage.getItem('auth'));
        localData.userResult = data;
        localStorage.setItem('auth', JSON.stringify(localData));
        Toast.success(data.responseMessage)
        setLoading(false)
        Navigate("/dashboard")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contaienr-fluid mt-2">
      <SideBar />
      <div>
        <h2>User Profile Managment</h2>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-8 offset-lg-2 mt-2">
          <form onSubmit={handleSubmit}>
            {/* <input
              type="text"
              placeholder="Update Your firstName "
              className="form-control mb-4"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            /> */}
            <input
              type="text"
              placeholder="Update Your firstName "
              className="form-control mb-4"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Update Your lastName"
              className="form-control mb-4"
              value={lastName}
              onChange={(e) =>
                setLastName(slugify(e.target.value.toLocaleLowerCase()))
              }
            />

            <input
              type="text"
              placeholder="Update Your dateOfBirth"
              className="form-control mb-4"
              value={dateOfBirth}
              onChange={(e) =>
                setDateOfBirth(slugify(e.target.value.toLocaleLowerCase()))
              }
            />

            <input
              type="text"
              placeholder="Update Your dateOfBirth"
              className="form-control mb-4"
              value={mobileNumber}
              onChange={(e) =>
                setMobileNumber(slugify(e.target.value.toLocaleLowerCase()))
              }
            />

            <input
              type="text"
              placeholder="Update Your address"
              className="form-control mb-4"
              value={address}
              onChange={(e) =>
                setAddress(slugify(e.target.value.toLocaleLowerCase()))
              }
            />
            <button className="btn btn-primary col-12 mb-4" disabled={loading}>
              {" "}
              {loading ? "Processing..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
      <pre>
        {JSON.stringify({
          firstName,
          lastName,
          dateOfBirth,
          address,
        })}
      </pre>
    </div>
  );
}
