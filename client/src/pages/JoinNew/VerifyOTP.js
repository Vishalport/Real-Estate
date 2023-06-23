import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Toast, { toast } from 'react-hot-toast';
import { API } from '../../config/config';
import { useAuth } from '../../context/auth';

export default function VerifyOTP() {

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("")
  const [loading, setLoding] = useState(false)
  const [resent, setRent] = useState(false)

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handlSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoding(true)
      const  res  = await axios.post(`${API}/verifyOTP`, { otp, email })
      if (res?.error) {
        Toast.error(res.error);
        setLoding(false)
        console.log(res.error)
      } else {
        localStorage.setItem("auth", JSON.stringify(res));
        Toast.success("OTP Verify Success")
        setLoding(false);
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      Toast.error(error.response.data.responseMessage)
      setLoding(false)
    }
  }

  const resentOTP = async(e) => {
    try {
      e.preventDefault();
      resent(true);
      const OTP = await axios.post(`/resentotp`, {email});
      if(OTP?.error) {
        toast.error(OTP.error)
        setRent(false);
        // console.log(error);
      }
      else {

      }
    } catch (error) {
      setRent(false)
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <h1 className='col-lg-4 offset-lg-4 p-1'>Verify OTP</h1>
      <div className='row'>
        <div className='col-lg-4 offset-lg-4'>
          <form onSubmit={handlSubmit}>
            <input
              type="number" placeholder='Type otp' className='form-control mb-4' required autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="text" placeholder='Type Email' className='form-control mb-4' required autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className='btn col-12 mb-4'>{loading ? "Verifying..." : "Verify OTP"}</button>
          </form>
            <button onClick={resentOTP} className='btn col-12 mb-4'>{resent ? "Verifying..." : "Resent OTP"}</button>
        </div>
      </div>
    </div>
  )
}
