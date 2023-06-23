// pages/Login.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function ChangePassword() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `/changePassword`,
        { oldPassword, newPassword },
        {
          headers: {
            token: auth.token,
          },
        }
      );

      console.log("---------------------Your Responce Data-----", data);
      if (data?.error) {
        toast.error(data?.responseMessage);
        setLoading(false);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        setLoading(false);
        toast.success(data.responseMessage);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.responseMessage);
    }
  };

  // console.log("----------TOken--------------------------",auth);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-5">
            <form onSubmit={handleSubmit}>
              <input
                type="Password"
                placeholder="Enter your Old Password"
                className="form-control mb-4"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                autoFocus
              />

              <input
                type="password"
                placeholder="Enter New password"
                className="form-control mb-4"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                required
              />

              <button
                className="btn btn-primary col-12 mb-4"
                disabled={loading}
              >
                {loading ? "Processing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
