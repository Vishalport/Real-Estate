import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACE_API_KEY } from "../../config/config";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Property_API } from "../../config/config";
import { UploadFile_API } from "../../config/config";
import { provideToken, useAuth } from "../../context/auth";

export default function AdForm({ property_action, property_type }) {
  // const [profilePic, setProfilePic] = useState(""); 
  const [auth, setAuth] = useAuth();
  const [ad, setAd] = useState({
    name: "",
    images: "",
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    size: "",
    type: "",
    floor: "",
    action: "",
  });

  const navigate = useNavigate();

  const uploadSingleFile = async (event) => {
    event.preventDefault();
    const photoObj = event.target.files;
    try {
      const CloudImg = await axios.post(`${UploadFile_API}/uploadSingleFiles`, event.target.files);
      console.log("-------------", CloudImg);
      setAd({ ...ad, images: CloudImg.data.result });
      toast.success("Image Uploded Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went Worng.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${Property_API}/addNewProperty`, ad, {
        headers: {
          token: auth.token
        }
      });
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad });
      } else {
        toast.success("property created successfully");
        navigate("/dashboard");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad });
    }
  };
  return (
    <>
      <div className="mb-3 form control">
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_PLACE_API_KEY}
          apiOptions={{ region: "au" }}
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: "Search for address..",
            onChange: ({ value }) => {
              setAd({ ...ad, address: value.description });
            },
          }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          placeholder="profile Picture"
          className="form-control mb-4"
          onChange={uploadSingleFile}
        />

        {/* <label className="btn btn-secondary"> Upload Image <input type="file" hidden value={ad.images} onChange={uploadSingleFile} />  </label>  */}
        <CurrencyInput
          placeholder="Enter price"
          defaultValue={ad.price}
          className="form-control mb-3"
          onValueChange={(value) => setAd({ ...ad, price: value })}
        />
        <input
          type="text"
          min="0"
          className="form-control mb-3"
          placeholder="Enter property Name"
          value={ad.name}
          onChange={(e) => setAd({ ...ad, name: e.target.value })}
        />

        <input
          type="text"
          min="0"
          className="form-control mb-3"
          placeholder="RENT / SELL"
          value={ad.action}
          onChange={(e) => setAd({ ...ad, action: e.target.value })}
        />

        <input
          type="text"
          min="0"
          className="form-control mb-3"
          placeholder="HOME / LAND"
          value={ad.type}
          onChange={(e) => setAd({ ...ad, type: e.target.value })}
        />
        {/* --------------------------------------------------------------------------------------------------------------------------- */}
        <input
          type="text"
          min="0"
          className="form-control mb-3"
          placeholder="Enter floor"
          value={ad.floor}
          onChange={(e) => setAd({ ...ad, floor: e.target.value })}
        />

        <input
          type="text"
          min="0"
          className="form-control mb-3"
          placeholder="Enter how many bedrooms"
          value={ad.bedrooms}
          onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
        />

        <input
          type="text"
          min="0"
          className="form-control mb-3"
          placeholder="Enter how many bathrooms"
          value={ad.toilets}
          onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
          required
        />

        <input
          type="text"
          min="0"
          className="form-control mb-3"
          placeholder="Enter how many car parks"
          value={ad.carpark}
          onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
        />
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Size In BHK"
          value={ad.size}
          onChange={(e) => setAd({ ...ad, size: e.target.value })}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="address"
          value={ad.address}
          onChange={(e) => setAd({ ...ad, address: e.target.value })}
        />

        <button disabled={ad.loading} className="btn btn-primary">
          {ad.loading ? "Saving..." : "Submit"}
        </button>
      </form>
      <pre>{JSON.stringify(ad, null, 4)}</pre>
    </>
  );
}
