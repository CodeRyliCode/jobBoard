import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateJob } from '../graphql/hooks';

function JobForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [mutate, { loading}] = useMutation(CREATE_JOB_MUTATION);
  const { createJob, loading} = useCreateJob();

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const job = await createJob(title, description);
  //  const {data: { job }} = await mutate({ 
  //   variables: { input: { title, description }},
  //   context: {
  //     headers: { 'Authorization': 'Bearer ' + getAccessToken() },
  //   },
  //   update: (cache, {data: {job} }) => {
  //     cache.writeQuery ({
  //       query: JOB_QUERY, 
  //       variables: { id: job.id },
  //       // This is the actual data object we want to write - jobs
  //       data: { job },
  //     }) 
  //    },
      
  //   });
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" disabled={loading} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
