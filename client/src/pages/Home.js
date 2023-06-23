import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/auth';
import axios from "axios";
import AdCards from '../components/cards/AdCards';
import { Property_API } from '../config/config';
import SearchForm from '../components/Forms/SearchForm';


export default function Home() {
  const [auth, setAuth] = useAuth();

  const [sellCard, setSellCard] = useState([]);
  const [rentCard, setRentCard] = useState([])

  useEffect(() => {
    fetchRentCard();
    fetchSellCard()
  }, []);

  const fetchRentCard = async () => {
    try {
      const { data } = await axios.get(`${Property_API}/ListRentProperty`);
      console.log("------------------------", data.result[0]);
      setRentCard(data.result);
    } catch (err) { 
      console.log(err);
    }
  };

  const fetchSellCard = async () => {
    try {
      const { data } = await axios.get(`${Property_API}/ListSellProperty`);
      setSellCard(data.result);
    } catch (err) { 
      console.log(err);
    }
  };

  return (
    <div>
      {/* <SearchForm/>  */}
      <h2 className="display-1 bg-primary text-light p-1">For Sell</h2>
      <div className="container">
        <div className="row">
          {sellCard?.map((card) => (
            <AdCards card={card} key={card._id} />
          ))}
        </div>
      </div>

      <h2 className="display-1 bg-primary text-light p-3">For Rent</h2>
      <div className="container">
        <div className="row">
          {rentCard?.map((card) => (
            <AdCards card={card} key={card._id} />
          ))}
        </div>
      </div>
    </div>
  )
}
