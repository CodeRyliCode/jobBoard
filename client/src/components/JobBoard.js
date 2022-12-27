import JobList from './JobList';
import { getJobs } from '../graphql/queries';
import { useState, useEffect} from 'react';


function JobBoard() {
  /*We need some initial value so that the component can be rendered without errors
  even though it will display an empty list.*/
  const [jobs, setJobs] = useState([]);
  /*Next step is to call the server, but we need to do this only once, after this
  component has been "mounted", which means the first time it's displayed on the page.*/
  useEffect(() => {
getJobs().then(setJobs);
  }, []);

  console.log('[JobBoard] jobs', jobs);
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
