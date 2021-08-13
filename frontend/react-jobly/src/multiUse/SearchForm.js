import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({searching}) {
  console.debug("searchForm", 'searching=', typeof searching);
  const [searchItem, setSearchItem] = useState('');

  const SubmitData = e => {
    e.preventDefault();
    // use .trim to get rid of extra spaces 
    searching(searchItem.trim() || undefined);
    setSearchItem(searchItem.trim())
  }

  const handleChange = e => {
    setSearchItem(e.target.value);
  }

  return (
    <div className="SearchForm mb-4">
      <form className="form-inline" onSubmit={SubmitData}>
        <input 
            className="form-control form-control-lg flex-grow-1"
            name='searchItem'
            value={searchItem}
            placeholder='Enter search Item here'
            onChange={handleChange}
        />
        <button type='submit' className='btn btn-lg btn-primary'>
           Submit Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;