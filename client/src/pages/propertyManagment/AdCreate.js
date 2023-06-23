import SideBar from "../../components/navBar/SideBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdCreate() {
  // state
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSell = () => {
    setSell(true);
    setRent(false);
  };

  const handleRent = () => {
    setRent(true);
    setSell(false);
  };

  return (
    <div className="contaienr-fluid mt-2">
      <SideBar />
      <div>
        <h2>Wellcome to Property Managment</h2>
      </div> <hr/>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-7%" }}
      >
        <div className="col-lg-6">
          <button onClick={handleSell} className="btn btn-secondary p-5 col-12">
            <span className="h2">Sell</span>
          </button>
          {/* on Sell click show options */}
          {sell && (
            <div className="my-1">
              <button
                onClick={() => navigate(`/propertyManagment/sell/House`)}
                className="btn btn-secondary p-5 col-6"
              >
                House
              </button>
              <button
                onClick={() => navigate(`/propertyManagment/sell/Land`)}
                className="btn btn-secondary p-5 col-6"
              >
                Land
              </button>
            </div>
          )}
        </div>

        <div className="col-lg-6">
          <button onClick={handleRent} className="btn btn-secondary p-5 col-12">
            <span className="h2">Rent</span>
          </button>
          {/* on Rent click show options */}
          {rent && (
            <div className="my-1">
              <button
                onClick={() => navigate(`/propertyManagment/rent/House`)}
                className="btn btn-secondary p-5 col-6"
              >
                House
              </button>
              <button
                onClick={() => navigate(`/propertyManagment/rent/Land`)}
                className="btn btn-secondary p-5 col-6"
              >
                Land
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}