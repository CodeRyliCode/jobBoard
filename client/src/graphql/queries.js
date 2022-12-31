import { ApolloClient, gql, InMemoryCache} from '@apollo/client';

const GRAPHQL_URL = "http://localhost:9000/graphql";

export const client = new ApolloClient({
  uri:  GRAPHQL_URL,
  cache: new InMemoryCache(),
})

const JOB_DETAIL_FRAGMENT = gql`
   fragment JobDetail on Job {
       id
        title
        company {
          id
          name
        }
        description
      }
`;

export const JOB_QUERY = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
 ...JobDetail
      }
    }
    ${JOB_DETAIL_FRAGMENT}
  `;

export const JOBS_QUERY = gql`
    query JobsQuery {
      jobs {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;

export const COMPANY_QUERY = gql`
    query CompanyQuery($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;

export const CREATE_JOB_MUTATION = gql`
mutation createJobMutation($input: CreateJobInput!) {
  job: createJob(input: $input) {
# Let's request all the same fields we get in the JobQuery, since the createJobMutation
# also returns a result of type Job. This way whenever we execute the mutation, we'll
# get all the job data we need to display on the next screen.
...JobDetail
  }
}
${JOB_DETAIL_FRAGMENT}
`;




