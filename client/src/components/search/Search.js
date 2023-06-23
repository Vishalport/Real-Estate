import React, {useState, createContext, useContext} from 'react'


const SearchContext = createContext();

const defaultState = {
    address : "",
    action : "BUYER",
    type : "HOUSE",
    price : "",
    priceRange : [0, 100000000000],
    results : [],
    page : "",
    loading : false,
}
const SearchProveider = ({children}) => {
    const [search, setSearch] = useState(defaultState);


  return (
    <SearchContext.Provider value={[search, setSearch, defaultState]}>
        {children}
    </SearchContext.Provider>
  )
}


const useSearcch = () => useContext(SearchContext);

export{ useSearcch, SearchProveider}