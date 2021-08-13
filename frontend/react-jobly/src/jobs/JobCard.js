import React, { useContext, useState, useEffect } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

function JobCard({id, title, salary, equity, companyName}) {
  console.debug("JobCard");

  const { alreadyAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  async function handleApply(e) {
    if (alreadyAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  useEffect(() => {
    console.debug("JobCard useEffect", "id=", id);
    setApplied(alreadyAppliedToJob(id));
  }, [id, alreadyAppliedToJob]);
 
  return (
    <div className="JobCard card"> 
      {applied}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p>{companyName}</p>
          {salary && <div><small> Salary: {formatSalary(salary)} </small></div>}
          {equity !== undefined && <div><small> Equity: {equity} </small></div>}
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
  )

//   shorter vresion of my addComma function
  function formatSalary(salary) {
    const salaryStr = salary.toString();
    let newish = salary.toString().split('')

    for (let i=3; i < salaryStr.length; i+=3) {
      let place = salaryStr.length - i;
      newish.splice(place, 0, ',');
    }
    let final = newish.join('')
  
    return final;
  }

}

export default JobCard;