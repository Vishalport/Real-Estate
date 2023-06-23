import React from 'react';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { API } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    const Navigate = useNavigate();
  
    useEffect(() => {
      if (auth?.token) getCurrentUser();
    }, [auth?.token]);
  
    const getCurrentUser = async () => {
      try {
        console.log("=============================", auth.token);
        const { data } = await axios.get(`/getProfile`, {
          headers: {
            token: auth.token
          }
        });
        setOk(true);
        console.log("Private router------------------------------",data);
      } catch (err) {
        setOk(false);
        console.log(err)
      }
    };
  
    return ok ? <Outlet /> : Navigate("/Login");
}

export default PrivateRoutes