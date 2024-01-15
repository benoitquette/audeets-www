import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ==============================|| RTK QUERY - PROJECTS ||============================== //

export const projectsApi = createApi({
  reducerPath: 'projects',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL_API_PROJECTS}/api/projects/` }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ''
    }),
    getProject: builder.query({
      query: (id) => `${id}`
    }),
    getScores: builder.query({
      query: (id) => `${id}/latestscore`
    }),
    getRollingWeek: builder.query({
      query: (id) => `${id}/rollingweek`
    }),
    getRollingMonth: builder.query({
      query: (id) => `${id}/rollingmonth`
    })
  })
});

export const { useGetProjectsQuery, useGetProjectQuery, useGetScoresQuery, useGetRollingWeekQuery, useGetRollingMonthQuery } = projectsApi;
