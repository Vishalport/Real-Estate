import React, { useEffect, useState } from "react";
import SideBar from "../components/navBar/SideBar";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Property_API } from "../config/config";
import MyCard from "../components/cards/MyCard";
import { floatButtonPrefixCls } from "antd/es/float-button/FloatButton";

const Dashboard = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [totalcount, setTotalcount] = useState();
  const [myCard, setMyCard] = useState([]);

  const admin = auth.userResult?.userType?.includes("ADMIN");
  const seller = auth.userResult?.userType?.includes("SELLER");
  const buyer = auth.userResult?.userType?.includes("BUYER");

  // const [page, setPage] = useState(1);
  // const [loding, setLoding] = useState(false);

  useEffect(() => {
    totalCount();
    totalPropertyList();
  }, []);

  // useEffect(()=>{
  //   if(page==1) return;
  //   const lodadmore = async () => {
  //     try {
  //       setLoding(true);
  //       const {data} = await axios.get(`${Property_API}/totalProperty/${page}`)
  //       setMyCard
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //  },[page])
  const totalCount = async (e) => {
    // e.preventDefault(); 
    try {
      const { data } = await axios.get(`${Property_API}/totalProperty`, {
        headers: {
          token: auth.token,
        },
      });
      if (data.result !== undefined) {
        setTotalcount(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalPropertyList = async (e) => {
    // e.preventDefault(); 
    try {
      const { data } = await axios.get(`${Property_API}/PropertyList`, {
        headers: {
          token: auth.token
        }
      })
      console.log("data testing------------", data.result);
      if (data.result !== undefined) {
        setMyCard(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="contaienr-fluid mt-2">
      <SideBar />

      {admin ? (
        <div className="d-flax justify-content-center align-item-center">
          <h2>Hyy {auth.userResult.userType}, Welcome to Dashboard</h2>
        </div>
      ) : seller ? (
        <div className="d-flax justify-content-center align-item-center">
          <h2>
            Hyy{" "}
            {auth.userResult?.firstName ? auth.userResult.firstName : "SLEER"},
            Welcome to Dashboard
          </h2>

          <br />
          <h1>Total Posted Property : {totalcount}</h1>
          <div className="container">
            <div className="row ">
              {myCard.map(card => <MyCard card={card} />)}
            </div>
          </div>
        </div>
      ) : buyer ? (
        <div className="d-flax justify-content-center align-item-center">
          <h2>
            Hyy{" "}
            {auth.userResult?.firstName ? auth.userResult.firstName : "BUYER"},
            Welcome to Dashboard
          </h2>
        </div>
      ) : (
        <div className="d-flax justify-content-center align-item-center">
          <h2>
            Hyy{" "}
            {auth.userResult?.firstName ? auth.userResult.firstName : "USER"},
            Welcome to Dashboard
          </h2>
        </div>
      )}
      <hr />
      <pre>{JSON.stringify(auth, null, 4)}</pre> 
    </div>
  );
};

export default Dashboard;
