import { Company, Job } from "./db.js";

function rejectIf(condition) {
  if(condition) {
    throw new Error("Unauthorized");
  }
}

export const resolvers = {
  //Query is the root(parent) in this resolver.
  Query: {
    /* We need a new resolver function for the "job" field in the Query type. This
    function should return a Job Object.*/
    job: (_root, { id }) => Job.findById(id),
    company: (_root, { id }) => Company.findById(id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: (_root, { input }, { user }) => {
      rejectIf(!user);
      return Job.create({ ...input, companyId: user.companyId });
    },
    /* This extracts the job "id" from the arguments, and calls
     "Job.delete" passing that "id". The "Job.delete" method returns the deleted object.*/
    deleteJob: async (_root, { id }, { user }) =>  {
      rejectIf(!user);
     const job = await Job.findById(id);
     rejectIf(job.companyId !== user.companyId);
      //check user is authenticated and job belongs to their company
     return Job.delete(id);
    },
    updateJob: async (_root, { input }, { user }) => 
    { 
      rejectIf(!user);
      const job = await Job.findById(input.id);
      rejectIf(job.companyId !== user.companyId);
      returnJob.update({...input, companyId: user.companyId});

    }
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },

  Job: {
    /*Each resolver function automatically receives a few arguments, passed by the graphql
    framework. The first is the parent object. */
    company: (job) => Company.findById(job.companyId),
  },
};
