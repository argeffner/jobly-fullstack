import React, {useState, useEffect} from "react";
import JoblyApi from '../api';
import SearchForm from "../multiUse/SearchForm";
import JobCardList from "./JobCardList";
import Loading from '../multiUse/Loading';

function JobList() {
  console.debug("JobList");

  const [jobs, setJobs] = useState(null);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  useEffect(() => {
    console.debug("JobList useEffect");
    search()
  }, [])

  if (!jobs) return <Loading />;

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm searching={search} />
      {jobs.length
          ? <JobCardList jobs={jobs} />
          : <p className="lead">Sorry, no results were found!</p>
      }
    </div>
  );
}

export default JobList;