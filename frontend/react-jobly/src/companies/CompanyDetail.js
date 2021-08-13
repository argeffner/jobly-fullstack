import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import JoblyApi from '../api';
import JobCardList from "../jobs/JobCardList";
import Loading from '../multiUse/Loading';

function CompanyDetail() {
  const {handle} = useParams();
//  can only do this after geting handle from useParams
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }
    getCompany()
  }, [handle]);

  if (!company) return <Loading />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
