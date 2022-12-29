import JobList from './JobList';
import { getJobs } from '../graphql/queries';
import { useState, useEffect} from 'react';


function JobBoard() {
  /*We need some initial value so that the component can be rendered without errors
  even though it will display an empty list.*/
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false)
  /*Next step is to call the server, but we need to do this only once, after this
  component has been "mounted", which means the first time it's displayed on the page.*/
  useEffect(() => {
getJobs().then(setJobs)
.catch((err) => setError(true));
  }, []);

  console.log('[JobBoard] jobs', jobs);
  if(error) {
    return (
<p>Sorry, something went wrong.</p>
    )
  }
  
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
