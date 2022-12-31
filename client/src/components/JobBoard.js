import JobList from './JobList';
import { useJobs } from '../graphql/hooks';

/*Let's see how we can make a query starting from JobBoard, that's our home page.JobBoard.
Instead of calling useState to keep the data, and useEffect to call our "getJob" function,
we can now call the "useQuery" hook, imported from the "@apollo/client" module.*/


function JobBoard() {
  const { jobs, loading, error} = useJobs();

  // const { data, loading, error} = useQuery(JOBS_QUERY, {
  //   fetchPolicy: 'network-only',
  // });
  /*We need some initial value so that the component can be rendered without errors
  even though it will display an empty list.*/
  // const [jobs, setJobs] = useState([]);
  // const [error, setError] = useState(false)
  /*Next step is to call the server, but we need to do this only once, after this
  component has been "mounted", which means the first time it's displayed on the page.*/
//   useEffect(() => {
// getJobs().then(setJobs)
// .catch((err) => {
//   console.error(err);
//    setError(true);
// });
//   }, []);

  console.log('[JobBoard]', {jobs, loading, error});
  if(loading) {
    return<p>Loading...</p>
  }
  if(error) {
    return (
    <p>Sorry, something went wrong.</p>
    )
  }
  // const { jobs } = data;
  
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
