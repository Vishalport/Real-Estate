import React from 'react'
import { useSearcch } from '../search/Search'
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACE_API_KEY, Property_API } from "../../config/config";
import { sellPrices, rentPrices } from "../../helpers/placeList";
import queryString from "query-string";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';


export default function SearchForm() {
    // search context...
    const [search, setSearch] = useSearcch()

    const Navigate = useNavigate();


    const handleSubmit = async() => {
        setSearch({...search , loading : false })
        try {
            const{results, price, ...rest}  = search
            const query = queryString.stringify(rest);
            console.log(query); 

            const {data} = await axios.get(`${Property_API}/searchProperty?${query}`);
            console.log("---------------------testing API hit---", data.result);
            setSearch((prev)=> ({
                ...prev,
                results : data.result,
                loading : false
            }));
            // Navigate(`/search?${query}`) 


        } catch (error) {
            console.log(error);
            setSearch({...search , loading : false })
        }
    }
    return (
        <div>
            <div className='container mt-5 mb-5'>
                <div className='row'>
                    <div className="col-lg-12 form control">
                        <GooglePlacesAutocomplete
                            apiKey={GOOGLE_PLACE_API_KEY}
                            apiOptions={{ region: "au" }}
                            selectProps={{
                                defaultInputValue: search?.address,
                                placeholder: "Search for address..",
                                onChange: ({ value }) => {
                                    setSearch({ ...search, address: value.address });
                                },
                            }}
                        />
                        <div className='d-flex mt-3'>
                            <button onClick={() => setSearch({ ...search, action: "SELL", price: "" })}
                                className='btn btn-info col-lg-2 square'>
                                {search.action === "SELL" ? "✅ Sell" : "Sell"}
                            </button>
                            <button onClick={() => setSearch({ ...search, action: "RENT", price: "" })}
                                className='btn btn-info col-lg-2 square'>
                                {search.action === "RENT" ? "✅ Rent" : "Rent"}
                            </button>
                            <button onClick={() => setSearch({ ...search, type: "HOME", price: "" })}
                                className='btn btn-info col-lg-2 square'>
                                {search.type === "HOME" ? "✅ Home" : "Home"}
                            </button>
                            <button onClick={() => setSearch({ ...search, type: "LAND", price: "" })}
                                className='btn btn-info col-lg-2 square'>
                                {search.type === "LAND" ? "✅ Land" : "Land"}
                            </button>
                            <div className="btn-group ">
                                <div className="btn-group" role="group">
                                    <button id="btnGroupDrop3" type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown">{search?.name ? search.name : "Price"}</button>
                                    <ul className='dropdown-menu'>
                                        {search?.action === "BUYER" ? (
                                            <>
                                                {(rentPrices.map((Item) => (
                                                    <li key={Item._id}>
                                                        <a 
                                                        onClick={() => {
                                                            setSearch({ ...search, price: Item.name, priceRange: Item.array })
                                                        }}
                                                        className='dropdown-item'>{Item.name}</a>
                                                    </li>
                                                )))}
                                            </>
                                        ) : (
                                            <>
                                                {(sellPrices.map((Item) => (
                                                    <li key={Item._id}>
                                                        <a
                                                        onClick={() => {
                                                            setSearch({ ...search, price: Item.name, price: Item.array })
                                                        }}
                                                        className='dropdown-item'>{Item.name}</a>
                                                    </li>
                                                )))}
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <button onClick={handleSubmit} className='btn btn-success col-lg-2 square'>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-5 mb-5'>
                <div className='row'>
                </div>
            </div>
            {/* {JSON.stringify(search)}  */}
        </div>
    )
}
