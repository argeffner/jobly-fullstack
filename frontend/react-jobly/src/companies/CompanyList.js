import React, {useState, useEffect} from "react";
import JoblyApi from '../api';
import SearchForm from "../multiUse/SearchForm";
import CompanyCard from "./CompanyCard";
import Loading from '../multiUse/Loading';

function CompanyList() {
  console.debug("companyList");
  const [companies, setCompanies] = useState(null)

  async function search(name) {
      let companies = await JoblyApi.getCompanies(name);
      setCompanies(companies);
  }
//   don't forget that for this useEffect you need to add array
  useEffect(() => {
      console.debug("useEffect for CompanyList");
      search()
  }, [])
  
  if (!companies) return <Loading />;

  return (
    <div className='CompanyList col-md-8 offset-md-2'>
      <SearchForm searching={search} />
      {companies.length ? (
          <div className='CompanyList-list'>
            {companies.map(company => (
                <CompanyCard
                  key={company.handle}
                  handle={company.handle}
                  name={company.name}
                  description={company.description}
                  logoUrl={company.logoUrl}
                />
            ))}
          </div>
      ) : ( <p>Companies not found</p> )
      }
    </div>
  )
}

export default CompanyList;