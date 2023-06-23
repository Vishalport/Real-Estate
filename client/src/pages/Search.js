import React from 'react'
import SearchForm from '../components/Forms/SearchForm'
import { useSearcch } from '../components/search/Search'
import AdCards from '../components/cards/AdCards'
export default function Search() {

    const[search, setSearch] = useSearcch();

    console.log("testing result---",search.results); 
  return (
    <div>
      <h2 className="display-1 bg-primary text-light p-1">Search@here</h2>
      <SearchForm/>
      <hr/>

      <div className='container'>
        <div className='row'>
            {search.results?.length > 0 ? (
                <div className='col-mb-5 text-center p-5'>
                    <h5>Totel {search?.results.length} Property Found </h5>
                </div>
            ) : (
                <div>
                    <h1>No Property Found..</h1>
                </div>
            )}
        </div>
        <div className='row'>
            {search.results.map((item) => (
                <AdCards card={item}/>
            ))}
        </div>
      </div>
    </div>
  )
}
